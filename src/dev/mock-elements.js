/**
 * Mock Home Assistant custom elements for standalone dev preview.
 * Must be imported AFTER the scoped-custom-element-registry polyfill
 * and BEFORE the card bundle.
 */

function safeDefine(name, clazz) {
  if (!customElements.get(name)) customElements.define(name, clazz);
}

// -- ha-card --
class MockHaCard extends HTMLElement {
  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.15);
            overflow: hidden;
          }
        </style>
        <slot></slot>
      `;
    }
  }
}
safeDefine('ha-card', MockHaCard);

// -- ha-switch --
class MockHaSwitch extends HTMLElement {
  get checked() { return this._checked; }
  set checked(v) {
    this._checked = Boolean(v);
    if (this._input) this._input.checked = this._checked;
  }
  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <style>
          :host { display: inline-flex; align-items: center; }
          input { width: 40px; height: 20px; cursor: pointer; }
        </style>
        <input type="checkbox">
      `;
      this._input = this.shadowRoot.querySelector('input');
      this._input.checked = this._checked || false;
      this._input.addEventListener('change', () => {
        this._checked = this._input.checked;
        this.dispatchEvent(new Event('change', { bubbles: true }));
      });
    }
  }
}
safeDefine('ha-switch', MockHaSwitch);

// -- ha-icon --
class MockHaIcon extends HTMLElement {
  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <style>:host { display: inline-flex; width: 24px; height: 24px; align-items: center; justify-content: center; color: #757575; }</style>
        <span title="${this.getAttribute('icon') || ''}">&#9728;</span>
      `;
    }
  }
}
safeDefine('ha-icon', MockHaIcon);

// -- ha-slider --
class MockHaSlider extends HTMLElement {
  static get observedAttributes() { return ['min', 'max', 'value']; }
  get value() { return this._input ? this._input.value : (this._value || '0'); }
  set value(v) {
    this._value = v;
    if (this._input) this._input.value = v;
  }
  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <style>
          :host { display: flex; flex: 1; align-items: center; }
          input { width: 100%; cursor: pointer; }
        </style>
        <input type="range" min="${this.getAttribute('min') || 0}" max="${this.getAttribute('max') || 255}">
      `;
      this._input = this.shadowRoot.querySelector('input');
      if (this._value !== undefined) this._input.value = this._value;
      this._input.addEventListener('change', () => {
        this.dispatchEvent(new Event('change', { bubbles: true }));
      });
    }
  }
  attributeChangedCallback(name, _, newVal) {
    if (name === 'value') { this._value = newVal; if (this._input) this._input.value = newVal; }
    if (name === 'min' && this._input) this._input.min = newVal;
    if (name === 'max' && this._input) this._input.max = newVal;
  }
}
safeDefine('ha-slider', MockHaSlider);

// -- ha-hs-color-picker (simplified mock) --
class MockHsColorPicker extends HTMLElement {
  get value() { return this._value || [0, 0]; }
  set value(v) { this._value = v; this._render(); }
  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
      this._render();
    }
  }
  _render() {
    const [h, s] = this._value || [0, 0];
    if (!this.shadowRoot) return;
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }
        .wheel {
          width: 200px; height: 200px; border-radius: 50%;
          background: conic-gradient(red, yellow, lime, aqua, blue, magenta, red);
          position: relative; cursor: crosshair; margin: 0 auto;
        }
        .marker {
          position: absolute; width: 16px; height: 16px;
          border-radius: 50%; border: 2px solid white;
          background: hsl(${h}, ${Math.round(s * 100)}%, 50%);
          box-shadow: 0 1px 4px rgba(0,0,0,0.4);
          transform: translate(-50%, -50%);
          left: ${50 + s * 40 * Math.cos((h - 90) * Math.PI / 180)}%;
          top: ${50 + s * 40 * Math.sin((h - 90) * Math.PI / 180)}%;
        }
        .label { text-align: center; font-size: 12px; color: #999; margin-top: 4px; }
      </style>
      <div class="wheel"><div class="marker"></div></div>
      <div class="label">H: ${Math.round(h)} S: ${Math.round(s * 100)}%</div>
    `;
  }
}
safeDefine('ha-hs-color-picker', MockHsColorPicker);

// -- ha-select --
class MockHaSelect extends HTMLElement {
  get value() { return this._select ? this._select.value : ''; }
  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <style>
          :host { display: block; }
          select { width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; font-size: 14px; }
          label { font-size: 12px; color: #999; }
        </style>
        <label>${this.getAttribute('label') || ''}</label>
        <select></select>
        <slot style="display:none"></slot>
      `;
      this._select = this.shadowRoot.querySelector('select');
      this._syncSlotItems();
      this._select.addEventListener('change', () => {
        this.dispatchEvent(new CustomEvent('selected', { detail: { index: this._select.selectedIndex }, bubbles: true }));
      });
      // Re-sync when children change
      const observer = new MutationObserver(() => this._syncSlotItems());
      observer.observe(this, { childList: true });
    }
  }
  _syncSlotItems() {
    if (!this._select) return;
    this._select.innerHTML = '';
    this.querySelectorAll('mwc-list-item').forEach(item => {
      const opt = document.createElement('option');
      opt.value = item.getAttribute('value') || item.textContent;
      opt.textContent = item.textContent;
      if (item.hasAttribute('selected')) opt.selected = true;
      this._select.appendChild(opt);
    });
  }
}
safeDefine('ha-select', MockHaSelect);

// -- mwc-list-item --
class MockMwcListItem extends HTMLElement {
  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = '<slot></slot>';
    }
  }
}
safeDefine('mwc-list-item', MockMwcListItem);

// -- state-badge --
class MockStateBadge extends HTMLElement {
  set stateObj(v) { this._stateObj = v; this._render(); }
  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
      this._render();
    }
  }
  _render() {
    if (!this.shadowRoot) return;
    const on = this._stateObj && this._stateObj.state === 'on';
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: inline-flex; width: 40px; height: 40px; align-items: center; justify-content: center; }
        .badge { width: 32px; height: 32px; border-radius: 50%; background: ${on ? '#fdd835' : '#bdbdbd'}; }
      </style>
      <div class="badge"></div>
    `;
  }
}
safeDefine('state-badge', MockStateBadge);

// -- more-info-light (stub) --
class MockMoreInfoLight extends HTMLElement {}
safeDefine('more-info-light', MockMoreInfoLight);
