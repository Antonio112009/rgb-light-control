import { LitElement, html } from 'lit';
import { ScopedRegistryHost } from '@lit-labs/scoped-registry-mixin';

import style from './style';
import defaultConfig from './defaults';
import LightEntityCardEditor from './index-editor';
import buildElementDefinitions from './buildElementDefinitions';
import globalElementLoader from './globalElementLoader';

// ── Constants ──────────────────────────────────────────────────────────────────

const BRIGHTNESS_MIN = 1;
const BRIGHTNESS_MAX = 255;
const SLIDER_PERCENT_MAX = 254;
const MIRED_KELVIN_FACTOR = 1000000;
const DEFAULT_RGB = [255, 255, 255];
const SERVICE_DEBOUNCE_MS = 100;

const PRESET_COLORS = [
  { name: 'Red', hs: [0, 100], color: '#ff0000' },
  { name: 'Orange', hs: [30, 100], color: '#ff8000' },
  { name: 'Yellow', hs: [60, 100], color: '#ffff00' },
  { name: 'Green', hs: [120, 100], color: '#00ff00' },
  { name: 'Cyan', hs: [180, 100], color: '#00ffff' },
  { name: 'Blue', hs: [240, 100], color: '#0000ff' },
  { name: 'Purple', hs: [270, 100], color: '#8000ff' },
  { name: 'Pink', hs: [320, 100], color: '#ff00aa' },
];

const RGB_COLOR_MODES = ['hs', 'rgb', 'rgbw', 'rgbww', 'xy'];
const WHITE_COLOR_MODES = ['color_temp', 'white'];
const BRIGHTNESS_MODES = ['hs', 'rgb', 'rgbw', 'rgbww', 'white', 'brightness', 'color_temp', 'xy'];

// Feature bitmask values (deprecated HA API, kept for backward compat)
const FEATURE_BRIGHTNESS = 1;
const FEATURE_COLOR_TEMP = 2;
const FEATURE_EFFECT_LIST = 4;
const FEATURE_COLOR = 16;
const FEATURE_WHITE_VALUE = 128;

const CMD_ON = 'turn_on';
const CMD_OFF = 'turn_off';

const ENTITY_CARD_SIZE = { light: 10, switch: 1 };

const editorName = 'rgb-light-controller-editor';
customElements.define(editorName, LightEntityCardEditor);

// ── Component ──────────────────────────────────────────────────────────────────

class LightEntityCard extends ScopedRegistryHost(LitElement) {
  static get elementDefinitions() {
    return buildElementDefinitions(
      [
        globalElementLoader('ha-card'),
        globalElementLoader('more-info-light'),
        globalElementLoader('ha-switch'),
        globalElementLoader('ha-icon'),
        globalElementLoader('state-badge'),
        globalElementLoader('ha-slider'),
        globalElementLoader('ha-hs-color-picker'),
        globalElementLoader('ha-select'),
        globalElementLoader('mwc-list-item'),
      ],
      LightEntityCard,
    );
  }

  static get properties() {
    return {
      hass: {},
      config: {},
      _colorPickerValues: { state: true },
      _colorMode: { state: true },
      _rgbView: { state: true },
    };
  }

  static get styles() {
    return style;
  }

  // ── Lifecycle ──────────────────────────────────────────────────────────────

  async firstUpdated() {
    this._firstUpdate = true;

    // ha-hs-color-picker is lazy-loaded by HA. Wait for it to be defined
    // and re-render once available.
    const needsColorPicker =
      this.config.color_picker !== false && this.config.entity.startsWith('light.');

    if (needsColorPicker && !customElements.get('ha-hs-color-picker')) {
      try {
        await Promise.race([
          customElements.whenDefined('ha-hs-color-picker'),
          new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 5000)),
        ]);
      } catch {
        // Timed out  — element will appear when user opens a more-info dialog
      }
      this.requestUpdate();
    }
  }

  setConfig(config) {
    if (!config.entity) throw Error('entity required.');

    this.config = { ...defaultConfig, ...config };

    if (this._colorMode === undefined) this._colorMode = null;
    if (this._rgbView === undefined) this._rgbView = 'dots';
  }

  static async getConfigElement() {
    return document.createElement(editorName);
  }

  // ── Card sizing ────────────────────────────────────────────────────────────

  getCardSize() {
    if (!this.config || !this.hass || !this.hass.states[this.config.entity]) return 1;

    const entity = this.hass.states[this.config.entity];
    let size = 0;

    if (Array.isArray(entity.attributes.entity_id)) {
      entity.attributes.entity_id.forEach(id => {
        size += this._entityCardSize(id);
      });
    } else {
      size += this._entityCardSize(entity.attributes.entity_id);
    }

    if (this.config.group) size *= 0.8;
    return Math.floor(size);
  }

  _entityCardSize(entityId) {
    if (!entityId) return 0;
    const domain = entityId.split('.')[0];
    return ENTITY_CARD_SIZE[domain] || 0;
  }

  // ── Helpers ────────────────────────────────────────────────────────────────

  isEntityOn(stateObj) {
    return stateObj.state === 'on';
  }

  /** Returns supported_color_modes array, cached per stateObj reference */
  _colorModes(stateObj) {
    return stateObj.attributes.supported_color_modes || [];
  }

  _supportsRgb(stateObj) {
    return this._colorModes(stateObj).some(m => RGB_COLOR_MODES.includes(m));
  }

  _supportsWhite(stateObj) {
    return this._colorModes(stateObj).some(m => WHITE_COLOR_MODES.includes(m));
  }

  _isFixedWhite() {
    return this.config.fixed_white === true;
  }

  _detectColorMode(stateObj) {
    const current = stateObj.attributes.color_mode;
    return WHITE_COLOR_MODES.includes(current) ? 'white' : 'rgb';
  }

  /**
   * Checks whether a feature should be displayed.
   * @return {boolean} true if the feature should be shown
   */
  shouldShowFeature(featureName, stateObj) {
    if (this.config.force_features) return true;

    // WLED custom attributes
    if (featureName === 'speed' && 'speed' in stateObj.attributes) return true;
    if (featureName === 'intensity' && 'intensity' in stateObj.attributes) return true;

    const colorModes = this._colorModes(stateObj);
    const legacyFlags = stateObj.attributes.supported_features || 0;

    let supported;
    switch (featureName) {
      case 'brightness':
        supported = !!(FEATURE_BRIGHTNESS & legacyFlags)
          || 'brightness' in stateObj.attributes
          || colorModes.some(m => BRIGHTNESS_MODES.includes(m));
        break;
      case 'colorTemp':
        supported = !!(FEATURE_COLOR_TEMP & legacyFlags)
          || colorModes.includes('color_temp');
        break;
      case 'effectList':
        supported = !!(FEATURE_EFFECT_LIST & legacyFlags)
          || (stateObj.attributes.effect_list && stateObj.attributes.effect_list.length > 0);
        break;
      case 'color':
        supported = !!(FEATURE_COLOR & legacyFlags)
          || colorModes.some(m => RGB_COLOR_MODES.includes(m));
        break;
      case 'whiteValue':
        supported = !!(FEATURE_WHITE_VALUE & legacyFlags)
          || 'white_value' in stateObj.attributes
          || colorModes.some(m => ['rgbw', 'rgbww'].includes(m));
        break;
      case 'warmWhiteValue':
        supported = colorModes.includes('rgbww');
        break;
      default:
        return false;
    }

    if (!supported) return false;
    if (!this.config.persist_features && !this.isEntityOn(stateObj)) return false;
    return true;
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  render() {
    const entity = this.hass.states[this.config.entity];
    if (!entity) {
      return html`<ha-card> Invalid entity: ${this.config.entity} </ha-card>`;
    }

    const stateObjects = this._getEntitiesToShow(entity);
    const shown = this.config.consolidate_entities ? [entity] : stateObjects;

    const templates = shown.map(s => this._createEntityTemplate(s));

    const cardClass = [
      'light-entity-card',
      this.config.shorten_cards ? 'group' : '',
      this.config.child_card ? 'light-entity-child-card' : '',
    ].filter(Boolean).join(' ');

    return html`
      <ha-card class="${cardClass}">
        ${templates}
      </ha-card>
    `;
  }

  _getEntitiesToShow(entity) {
    if (entity.attributes.entity_id && Array.isArray(entity.attributes.entity_id)) {
      return entity.attributes.entity_id
        .map(id => this.hass.states[id])
        .filter(Boolean);
    }
    return [entity];
  }

  _createEntityTemplate(stateObj) {
    if (!stateObj || !stateObj.attributes) return html``;

    const sliderClass = this.config.full_width_sliders ? 'ha-slider-full-width' : '';
    const supportsRgb = this._supportsRgb(stateObj);
    const supportsWhite = this._supportsWhite(stateObj);
    const showModeToggle = supportsRgb && supportsWhite;

    // Auto-detect color mode on first render
    if (this._colorMode === null) {
      this._colorMode = showModeToggle
        ? this._detectColorMode(stateObj)
        : (supportsRgb ? 'rgb' : 'white');
    }

    const isRgb = !showModeToggle || this._colorMode === 'rgb';
    const isWhite = showModeToggle && this._colorMode === 'white';
    const isFixed = this._isFixedWhite();

    return html`
      ${this._createHeader(stateObj)}
      ${showModeToggle ? this._createModeToggle(stateObj) : ''}
      <div class="light-entity-card-sliders ${sliderClass}">
        ${this._createSlider(stateObj, 'brightness', this.config.brightness_icon, BRIGHTNESS_MIN, BRIGHTNESS_MAX, 'brightness')}
        ${this._createSlider(stateObj, 'speed', this.config.speed_icon, 1, 255)}
        ${this._createSlider(stateObj, 'intensity', this.config.intensity_icon, 1, 255)}
        ${isWhite && !isFixed ? this._createColorTemperature(stateObj) : ''}
        ${isWhite ? this._createWhiteSlider(stateObj, 'white') : ''}
        ${isWhite && !isFixed ? this._createWhiteSlider(stateObj, 'warmWhite') : ''}
        ${isRgb ? this._createSaturationSlider(stateObj) : ''}
      </div>
      ${isRgb ? this._createRgbViewSwitch() : ''}
      ${isRgb && this._rgbView === 'dots' ? this._createColorDots(stateObj) : ''}
      ${isRgb && this._rgbView === 'wheel' ? this._createColorPicker(stateObj) : ''}
      ${this._createEffectList(stateObj)}
    `;
  }

  // ── Header ─────────────────────────────────────────────────────────────────

  _createHeader(stateObj) {
    if (this.config.hide_header) return html``;
    const title = this.config.header || stateObj.attributes.friendly_name || stateObj.entity_id;

    return html`
      <div class="light-entity-card__header">
        ${this.config.show_header_icon
          ? html`<div class="icon-container"><state-badge .stateObj=${stateObj}></state-badge></div>`
          : ''}
        <div class="light-entity-card__title">${title}</div>
        <div class="light-entity-card-toggle">
          <ha-switch
            .checked=${this.isEntityOn(stateObj)}
            @change=${e => this._setToggle(e, stateObj)}
            aria-label="Toggle ${title}"
          ></ha-switch>
        </div>
      </div>
    `;
  }

  // ── Mode Toggle ────────────────────────────────────────────────────────────

  _createModeToggle(stateObj) {
    return html`
      <div class="light-entity-card__mode-toggle">
        <button
          class="light-entity-card__mode-btn ${this._colorMode === 'rgb' ? 'light-entity-card__mode-btn--active' : ''}"
          @click=${() => this._switchColorMode('rgb', stateObj)}
        >RGB</button>
        <button
          class="light-entity-card__mode-btn ${this._colorMode === 'white' ? 'light-entity-card__mode-btn--active' : ''}"
          @click=${() => this._switchColorMode('white', stateObj)}
        >White</button>
      </div>
    `;
  }

  _switchColorMode(mode, stateObj) {
    if (this._colorMode === mode) return;
    this._colorMode = mode;

    if (!this.isEntityOn(stateObj)) return;

    if (mode === 'rgb') {
      const hs = stateObj.attributes.hs_color || [0, 100];
      this._callService({ hs_color: hs }, stateObj);
      return;
    }

    // White mode
    if (this._isFixedWhite()) {
      const whiteValue = this._getWhiteValue(stateObj, 3) || 255;
      const modes = this._colorModes(stateObj);
      if (modes.includes('white')) {
        this._callService({ white: whiteValue }, stateObj);
      } else if (modes.includes('rgbw')) {
        this._callService({ rgbw_color: [255, 255, 255, whiteValue] }, stateObj);
      } else {
        this._callService({ color_temp_kelvin: 4000 }, stateObj);
      }
    } else {
      const range = this._getColorTempRange(stateObj);
      if (range) {
        const kelvin = range.kelvin ?? Math.round((range.minK + range.maxK) / 2);
        const payload = range.usesKelvin
          ? { color_temp_kelvin: kelvin }
          : { color_temp: Math.round(MIRED_KELVIN_FACTOR / kelvin) };
        this._callService(payload, stateObj);
      }
    }
  }

  // ── RGB View Switch ────────────────────────────────────────────────────────

  _createRgbViewSwitch() {
    const isDots = this._rgbView === 'dots';
    return html`
      <div class="light-entity-card__rgb-view-switch">
        <span class="light-entity-card__rgb-view-label">Fixed colours</span>
        <ha-switch
          .checked=${isDots}
          @change=${() => { this._rgbView = isDots ? 'wheel' : 'dots'; }}
          aria-label="Toggle fixed colours"
        ></ha-switch>
      </div>
    `;
  }

  // ── Color Dots ─────────────────────────────────────────────────────────────

  _createColorDots(stateObj) {
    const currentHs = stateObj.attributes.hs_color || [0, 0];
    const colors = this.config.preset_colors || PRESET_COLORS;

    return html`
      <div class="light-entity-card__color-dots">
        ${colors.map(c => {
          const isSelected = Math.abs(currentHs[0] - c.hs[0]) < 15 && currentHs[1] > 50;
          return html`
            <button
              class="light-entity-card__color-dot ${isSelected ? 'light-entity-card__color-dot--selected' : ''}"
              style="background: ${c.color};"
              title="${c.name}"
              @click=${() => this._callService({ hs_color: c.hs }, stateObj)}
            ></button>
          `;
        })}
      </div>
    `;
  }

  // ── Shared Slider ──────────────────────────────────────────────────────────

  /**
   * Creates a generic slider row (icon + slider + optional percent).
   * Handles config toggle, feature detection, and value change.
   * @param {Object} stateObj  - HA entity state
   * @param {string} attr      - attribute name (brightness, speed, intensity)
   * @param {string} icon      - MDI icon name
   * @param {number} min       - slider min
   * @param {number} max       - slider max
   * @param {string} [percentType] - optional type key for showPercent overrides
   */
  _createSlider(stateObj, attr, icon, min, max, percentType) {
    if (this.config[attr] === false) return html``;
    if (!this.shouldShowFeature(attr, stateObj)) return html``;

    const value = stateObj.attributes[attr] ?? 0;
    const title = attr.charAt(0).toUpperCase() + attr.slice(1);

    return html`
      <div class="control light-entity-card-center">
        <div class="icon-container" title="${title}">
          <ha-icon icon="hass:${icon}"></ha-icon>
        </div>
        <ha-slider
          .value="${value}"
          @change="${e => this._setAttrValue(e, stateObj, attr)}"
          min="${min}"
          max="${max}"
          aria-label="${title}"
        ></ha-slider>
        ${this._showPercent(value, 0, SLIDER_PERCENT_MAX, percentType)}
      </div>
    `;
  }

  // ── Saturation Slider ──────────────────────────────────────────────────────

  _createSaturationSlider(stateObj) {
    if (!this.shouldShowFeature('color', stateObj)) return html``;
    const hs = stateObj.attributes.hs_color || [0, 0];
    const saturation = Math.round(hs[1]);

    return html`
      <div class="control light-entity-card-center">
        <div class="icon-container" title="Saturation">
          <ha-icon icon="hass:palette"></ha-icon>
        </div>
        <ha-slider
          .value="${saturation}"
          @change="${e => this._setSaturation(e, stateObj)}"
          min="0"
          max="100"
          aria-label="Saturation"
        ></ha-slider>
        ${this._showPercent(saturation, 0, 100)}
      </div>
    `;
  }

  _setSaturation(event, stateObj) {
    const newSat = parseInt(event.target.value, 10);
    if (isNaN(newSat)) return;
    const hs = stateObj.attributes.hs_color || [0, 0];
    if (Math.round(hs[1]) === newSat) return;
    this._callService({ hs_color: [hs[0], newSat] }, stateObj);
  }

  // ── Percent Label ──────────────────────────────────────────────────────────

  _showPercent(value, min, max, sliderType) {
    // Check per-slider visibility overrides
    if (sliderType === 'brightness' && this.config.show_brightness_percent !== undefined) {
      if (!this.config.show_brightness_percent) return html``;
    } else if (sliderType === 'color_temp' && this.config.show_color_temp_percent !== undefined) {
      if (!this.config.show_color_temp_percent) return html``;
    } else if (sliderType === 'color_temp' && this.config.color_temp_in_kelvin) {
      // kelvin display implies showing the value
    } else if (!this.config.show_slider_percent) {
      return html``;
    }

    if (sliderType === 'color_temp' && this.config.color_temp_in_kelvin) {
      return html`<div class="percent-slider">${value}K</div>`;
    }

    const percent = max !== min ? Math.round(((value - min) * 100) / (max - min)) : 0;
    return html`<div class="percent-slider">${isNaN(percent) ? 0 : percent}%</div>`;
  }

  // ── Color Temperature ──────────────────────────────────────────────────────

  _getColorTempRange(stateObj) {
    const attrs = stateObj.attributes;
    const usesKelvin = attrs.min_color_temp_kelvin !== undefined;

    let kelvin, minK, maxK, minMired, maxMired;

    if (usesKelvin) {
      kelvin = attrs.color_temp_kelvin;
      minK = attrs.min_color_temp_kelvin;
      maxK = attrs.max_color_temp_kelvin;
      if (!minK || !maxK) return null;
      minMired = Math.round(MIRED_KELVIN_FACTOR / maxK);
      maxMired = Math.round(MIRED_KELVIN_FACTOR / minK);
    } else {
      minMired = attrs.min_mireds;
      maxMired = attrs.max_mireds;
      if (!minMired || !maxMired) return null;
      kelvin = attrs.color_temp ? Math.round(MIRED_KELVIN_FACTOR / attrs.color_temp) : null;
      minK = Math.round(MIRED_KELVIN_FACTOR / maxMired);
      maxK = Math.round(MIRED_KELVIN_FACTOR / minMired);
    }

    const validKelvin = typeof kelvin === 'number' && Number.isFinite(kelvin) && kelvin > 0
      ? kelvin
      : null;

    return { usesKelvin, kelvin: validKelvin, minK, maxK, minMired, maxMired };
  }

  _createColorTemperature(stateObj) {
    if (this.config.color_temp === false) return html``;
    if (!this.shouldShowFeature('colorTemp', stateObj)) return html``;

    const range = this._getColorTempRange(stateObj);
    if (!range) return html``;

    const { usesKelvin, kelvin, minK, maxK, minMired, maxMired } = range;
    const showInKelvin = this.config.color_temp_in_kelvin;

    let sliderMin, sliderMax, sliderValue, sliderClass, changeHandler;

    if (showInKelvin) {
      sliderMin = minK;
      sliderMax = maxK;
      sliderValue = kelvin ?? Math.round((minK + maxK) / 2);
      sliderClass = 'light-entity-card-color_temp light-entity-card-color_temp--kelvin';
      changeHandler = e => this._setColorTemp(e, stateObj, usesKelvin, true);
    } else {
      const miredRange = maxMired - minMired;
      const currentMired = kelvin ? Math.round(MIRED_KELVIN_FACTOR / kelvin) : null;
      sliderMin = 0;
      sliderMax = 100;
      sliderValue = miredRange > 0 && currentMired !== null
        ? Math.round(((currentMired - minMired) / miredRange) * 100)
        : 50;
      sliderClass = 'light-entity-card-color_temp';
      changeHandler = e => this._setColorTemp(e, stateObj, usesKelvin, false, minMired, maxMired);
    }

    return html`
      <div class="control light-entity-card-center">
        <div class="icon-container" title="Color Temperature">
          <ha-icon icon="hass:${this.config.temperature_icon}"></ha-icon>
        </div>
        <ha-slider
          class="${sliderClass}"
          min="${sliderMin}"
          max="${sliderMax}"
          .value=${sliderValue}
          @change="${changeHandler}"
          aria-label="Color temperature"
        ></ha-slider>
        ${this._showPercent(sliderValue, sliderMin, sliderMax, 'color_temp')}
      </div>
    `;
  }

  // ── White Value ────────────────────────────────────────────────────────────

  _getWhiteValue(stateObj, index = 3) {
    const { rgbw_color, rgbww_color, white_value } = stateObj.attributes;

    if (rgbw_color && index === 3) return rgbw_color[3] ?? 0;
    if (rgbww_color && index < rgbww_color.length) return rgbww_color[index] ?? 0;
    if (index === 3 && white_value !== undefined) return white_value ?? 0;
    return 0;
  }

  /**
   * Creates a white channel slider (white or warm white).
   * @param {Object} stateObj
   * @param {'white'|'warmWhite'} channel
   */
  _createWhiteSlider(stateObj, channel) {
    const isWarm = channel === 'warmWhite';
    const configKey = isWarm ? 'warm_white_value' : 'white_value';
    const featureName = isWarm ? 'warmWhiteValue' : 'whiteValue';
    const icon = isWarm ? this.config.warm_white_icon : this.config.white_icon;
    const title = isWarm ? 'Warm White' : 'White';
    const index = isWarm ? 4 : 3;

    if (this.config[configKey] === false) return html``;
    if (!this.shouldShowFeature(featureName, stateObj)) return html``;

    const value = this._getWhiteValue(stateObj, index);

    return html`
      <div class="control light-entity-card-center">
        <div class="icon-container" title="${title}">
          <ha-icon icon="hass:${icon}"></ha-icon>
        </div>
        <ha-slider
          max="255"
          .value="${value}"
          @change="${e => this._setWhiteValue(e, stateObj, index)}"
          aria-label="${title} value"
        ></ha-slider>
        ${this._showPercent(value, 0, SLIDER_PERCENT_MAX)}
      </div>
    `;
  }

  // ── Effect List ────────────────────────────────────────────────────────────

  _createEffectList(stateObj) {
    if (this.config.effects_list === false) return html``;
    if (!this.config.persist_features && !this.isEntityOn(stateObj)) return html``;

    let effectList = stateObj.attributes.effect_list || [];

    if (this.config.effects_list && Array.isArray(this.config.effects_list)) {
      effectList = this.config.effects_list;
    } else if (this.config.effects_list && this.hass.states[this.config.effects_list]) {
      const inputSelect = this.hass.states[this.config.effects_list];
      effectList = (inputSelect.attributes && inputSelect.attributes.options) || [];
    } else if (!this.shouldShowFeature('effectList', stateObj)) {
      return html``;
    }

    const caption = this.hass.localize('ui.card.light.effect') || 'Effect';

    return html`
      <div class="control light-entity-card-center light-entity-card-effectlist">
        <ha-select
          @closed="${e => e.stopPropagation()}"
          @selected=${e => this._setEffect(e, stateObj)}
          label="${caption}"
        >
          ${effectList.map(effect => html`
            <mwc-list-item value="${effect}" ?selected=${effect === stateObj.attributes.effect}>
              ${effect}
            </mwc-list-item>
          `)}
        </ha-select>
      </div>
    `;
  }

  // ── Color Picker ───────────────────────────────────────────────────────────

  _createColorPicker(stateObj) {
    if (this.config.color_picker === false) return html``;
    if (!this.shouldShowFeature('color', stateObj)) return html``;

    const haHs = stateObj.attributes.hs_color || [0, 0];
    const pickerValue =
      (this._colorPickerValues && this._colorPickerValues[stateObj.entity_id])
      || [haHs[0], haHs[1] / 100];

    return html`
      <div class="light-entity-card__color-picker">
        <ha-hs-color-picker
          .value=${pickerValue}
          @cursor-moved=${e => {
            this._colorPickerValues = {
              ...this._colorPickerValues,
              [stateObj.entity_id]: e.detail.value,
            };
          }}
          @value-changed=${e => this._onColorPickerChanged(e.detail.value, stateObj)}
        ></ha-hs-color-picker>
      </div>
    `;
  }

  _onColorPickerChanged(value, stateObj) {
    if (this._colorPickerValues) {
      const { [stateObj.entity_id]: _, ...rest } = this._colorPickerValues;
      this._colorPickerValues = rest;
    }
    if (!value) return;
    this._callService({ hs_color: [value[0], value[1] * 100] }, stateObj);
  }

  // ── Service Calls ──────────────────────────────────────────────────────────

  _setAttrValue(event, stateObj, attrName) {
    const newValue = parseInt(event.target.value, 10);
    if (isNaN(newValue) || parseInt(stateObj.attributes[attrName], 10) === newValue) return;
    this._callService({ [attrName]: newValue }, stateObj);
  }

  _setColorTemp(event, stateObj, usesKelvin, sliderInKelvin, minMired, maxMired) {
    const raw = parseInt(event.target.value, 10);
    if (isNaN(raw)) return;

    if (sliderInKelvin) {
      if (usesKelvin) {
        if (raw === parseInt(stateObj.attributes.color_temp_kelvin, 10)) return;
        this._callService({ color_temp_kelvin: raw }, stateObj);
      } else {
        const mired = Math.round(MIRED_KELVIN_FACTOR / raw);
        if (mired === parseInt(stateObj.attributes.color_temp, 10)) return;
        this._callService({ color_temp: mired }, stateObj);
      }
    } else {
      if (!Number.isFinite(minMired) || !Number.isFinite(maxMired) || maxMired <= minMired) return;
      const mired = Math.round(minMired + (raw / 100) * (maxMired - minMired));
      if (usesKelvin) {
        const kelvin = Math.round(MIRED_KELVIN_FACTOR / mired);
        if (kelvin === parseInt(stateObj.attributes.color_temp_kelvin, 10)) return;
        this._callService({ color_temp_kelvin: kelvin }, stateObj);
      } else {
        if (mired === parseInt(stateObj.attributes.color_temp, 10)) return;
        this._callService({ color_temp: mired }, stateObj);
      }
    }
  }

  _setWhiteValue(event, stateObj, index) {
    const newValue = parseInt(event.target.value, 10);
    if (isNaN(newValue)) return;

    const colorModes = this._colorModes(stateObj);
    const { rgbw_color, rgbww_color, rgb_color } = stateObj.attributes;

    if (colorModes.includes('rgbw') && index === 3) {
      const rgb = rgbw_color ? rgbw_color.slice(0, 3) : (rgb_color || DEFAULT_RGB);
      this._callService({ rgbw_color: [rgb[0], rgb[1], rgb[2], newValue] }, stateObj);
    } else if (colorModes.includes('rgbww')) {
      let base;
      if (rgbww_color) base = rgbww_color;
      else if (rgbw_color) base = [rgbw_color[0], rgbw_color[1], rgbw_color[2], rgbw_color[3], 0];
      else {
        const rgb = rgb_color || DEFAULT_RGB;
        base = [rgb[0], rgb[1], rgb[2], 0, 0];
      }
      const color = [...base];
      color[index] = newValue;
      this._callService({ rgbww_color: color }, stateObj);
    } else {
      this._callService({ white_value: newValue }, stateObj);
    }
  }

  _setToggle(event, stateObj) {
    const newState = this.isEntityOn(stateObj) ? CMD_OFF : CMD_ON;
    this._callService({}, stateObj, newState);
  }

  _setEffect(event, stateObj) {
    if (!event.target.value) return;
    this._callService({ effect: event.target.value }, stateObj);
  }

  /**
   * Debounced service call to prevent overwhelming lights during rapid slider changes.
   */
  _callService(payload, stateObj, state) {
    if (!this._firstUpdate) return;

    // Clear any pending debounce for the same entity
    const entityId = stateObj.entity_id;
    if (this._debounceTimers && this._debounceTimers[entityId]) {
      clearTimeout(this._debounceTimers[entityId]);
    }

    // Toggle and effect commands execute immediately (no debounce)
    if (state || payload.effect) {
      this._executeService(payload, stateObj, state);
      return;
    }

    // Debounce slider value changes
    if (!this._debounceTimers) this._debounceTimers = {};
    this._debounceTimers[entityId] = setTimeout(() => {
      this._executeService(payload, stateObj, state);
      delete this._debounceTimers[entityId];
    }, SERVICE_DEBOUNCE_MS);
  }

  _executeService(payload, stateObj, state) {
    let entityType = stateObj.entity_id.split('.')[0];
    if (entityType === 'group') entityType = 'homeassistant';

    const transition = parseFloat(this.config.transition) || 0;
    if (transition > 0 && entityType === 'light') {
      payload = { ...payload, transition };
    }

    this.hass.callService(entityType, state || CMD_ON, {
      entity_id: stateObj.entity_id,
      ...payload,
    });
  }
}

// ── Registration ─────────────────────────────────────────────────────────────

customElements.define('rgb-light-controller', LightEntityCard);
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'rgb-light-controller',
  name: 'RGB Light Controller',
  description: 'Control lights and switches',
});
