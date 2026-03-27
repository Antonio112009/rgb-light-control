import { LitElement, html } from 'lit';
import { ScopedRegistryHost } from '@lit-labs/scoped-registry-mixin';
import style from './style-editor';
import defaultConfig from './defaults';
import buildElementDefinitions from './buildElementDefinitions';
import globalElementLoader from './globalElementLoader';
import { fireEvent } from './utils/fire-event';

// Checkbox options grouped into rows for the editor UI
const CHECKBOX_ROWS = [
  [{ label: 'Shorten Cards', key: 'shorten_cards' }],
  [{ label: 'Persist Features', key: 'persist_features' }, { label: 'Show Brightness', key: 'brightness' }],
  [{ label: 'Show Color Temp', key: 'color_temp' }],
  [{ label: 'Show White Channel', key: 'white_value' }],
  [{ label: 'Show Warm White', key: 'warm_white_value' }],
  [{ label: 'Show Speed', key: 'speed' }, { label: 'Show Intensity', key: 'intensity' }],
  [{ label: 'Show Color Picker', key: 'color_picker' }, { label: 'Show Effects List', key: 'effects_list' }],
  [{ label: 'Full Width Sliders', key: 'full_width_sliders' }, { label: 'Show Slider Percent', key: 'show_slider_percent' }],
  [{ label: 'Show Brightness %', key: 'show_brightness_percent' }],
  [{ label: 'Hide Header', key: 'hide_header' }, { label: 'Show Header Icon', key: 'show_header_icon' }, { label: 'Child Card', key: 'child_card' }],
  [{ label: 'Force Features', key: 'force_features' }],
  [{ label: 'Consolidate Entities', key: 'consolidate_entities' }],
  [{ label: 'Fixed White', key: 'fixed_white' }],
];

// Icon text fields for the editor
const ICON_FIELDS = [
  { name: 'brightness_icon', label: 'Brightness Icon' },
  { name: 'white_icon', label: 'White Icon' },
  { name: 'warm_white_icon', label: 'Warm White Icon' },
  { name: 'temperature_icon', label: 'Temperature Icon' },
];

const COLOR_TEMP_FIELDS = [
  { name: 'min_color_temp_kelvin', label: 'Minimum K' },
  { name: 'max_color_temp_kelvin', label: 'Maximum K' },
];

export default class LightEntityCardEditor extends ScopedRegistryHost(LitElement) {
  static get elementDefinitions() {
    return buildElementDefinitions([
      globalElementLoader('ha-checkbox'),
      globalElementLoader('ha-formfield'),
      globalElementLoader('ha-form-string'),
      globalElementLoader('ha-select'),
      globalElementLoader('mwc-list-item'),
    ], LightEntityCardEditor);
  }

  static get styles() {
    return style;
  }

  static get properties() {
    return { hass: {}, _config: {} };
  }

  setConfig(config) {
    this._config = { ...defaultConfig, ...config };
  }

  firstUpdated() {
    this._firstRendered = true;
  }

  get entityOptions() {
    return Object.keys(this.hass.states)
      .filter(eid => ['switch', 'light', 'group'].includes(eid.split('.')[0]))
      .sort();
  }

  render() {
    if (!this.hass || !this._config) return html``;

    let { header } = this._config;
    if (!header && this._config.entity) {
      const name = this._config.entity.split('.')[1] || '';
      if (name) header = name.charAt(0).toUpperCase() + name.slice(1);
    }

    const entityOptions = this.entityOptions.map(entity =>
      html`<mwc-list-item value="${entity}" ?selected=${entity === this._config.entity}>${entity}</mwc-list-item>`,
    );

    return html`
      <div class="card-config">
        <div class="overall-config">
          <ha-form-string
            .schema=${{ name: 'header', type: 'string' }}
            label="Header"
            .data="${header}"
            .configValue="${'header'}"
            @changed="${this._onConfigChanged}"
          ></ha-form-string>
        </div>

        <div class="entities">
          <ha-select
            label="Entity"
            @selected="${this._onConfigChanged}"
            @closed="${e => e.stopPropagation()}"
            .configValue="${'entity'}"
          >
            ${entityOptions}
          </ha-select>
        </div>

        <div class="entities">
          ${this._renderIconFields(ICON_FIELDS.slice(0, 2))}
        </div>
        <div class="entities">
          ${this._renderIconFields(ICON_FIELDS.slice(2))}
          ${this._renderTextFields(COLOR_TEMP_FIELDS)}
          <ha-form-string
            .schema=${{ name: 'transition', type: 'string' }}
            label="Transition (seconds)"
            .data="${String(this._config.transition || '')}"
            .configValue="${'transition'}"
            @changed="${this._onConfigChanged}"
          ></ha-form-string>
        </div>

        <div class="overall-config">
          ${CHECKBOX_ROWS.map(row => html`
            <div class="checkbox-options">
              ${row.map(({ label, key }) => html`
                <ha-formfield label="${label}">
                  <ha-checkbox
                    @change="${this._onCheckboxChanged}"
                    .checked=${this._config[key]}
                    .value="${key}"
                  ></ha-checkbox>
                </ha-formfield>
              `)}
            </div>
          `)}
        </div>
      </div>
    `;
  }

  _renderIconFields(fields) {
    return this._renderTextFields(fields);
  }

  _renderTextFields(fields) {
    return fields.map(({ name, label }) => html`
      <ha-form-string
        .schema=${{ name, type: 'string' }}
        label="${label}"
        .data="${this._stringValue(name)}"
        .configValue="${name}"
        @changed="${this._onConfigChanged}"
      ></ha-form-string>
    `);
  }

  _stringValue(key) {
    const value = this._config[key];
    return value === null || value === undefined ? '' : String(value);
  }

  _onConfigChanged(ev) {
    if (!this._config || !this.hass || !this._firstRendered) return;
    const { target: { configValue, value }, detail } = ev;
    const rawValue = (detail && detail.value !== undefined && detail.value !== null)
      ? detail.value
      : value;
    const newValue = this._normalizeConfigValue(configValue, rawValue);

    this._config = { ...this._config, [configValue]: newValue };
    fireEvent(this, 'config-changed', { config: this._config });
  }

  _normalizeConfigValue(configValue, value) {
    if (configValue === 'min_color_temp_kelvin' || configValue === 'max_color_temp_kelvin') {
      const trimmed = String(value ?? '').trim();
      return trimmed === '' ? null : trimmed;
    }

    return value;
  }

  _onCheckboxChanged(ev) {
    if (!this._config || !this.hass || !this._firstRendered) return;
    const { target: { value, checked } } = ev;

    this._config = { ...this._config, [value]: checked };
    fireEvent(this, 'config-changed', { config: this._config });
  }
}
