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
  constructor() {
    super();
    this.__checked = false;
    Object.defineProperty(this, 'checked', {
      get: () => this.__checked,
      set: (v) => {
        this.__checked = Boolean(v);
        if (this._input) this._input.checked = this.__checked;
      },
      enumerable: true,
      configurable: true,
    });
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
      this._input.addEventListener('change', () => {
        this.__checked = this._input.checked;
        this.dispatchEvent(new Event('change', { bubbles: true }));
      });
    }
    if (this._input) this._input.checked = this.__checked;
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
// NOTE: Lit's .value= binding sets an own data property on the instance,
// which shadows prototype get/set accessors. We must define accessors in
// the constructor via Object.defineProperty so they live on the instance
// and can't be shadowed by Lit's property assignment.
class MockHaSlider extends HTMLElement {
  static get observedAttributes() { return ['min', 'max', 'value']; }

  constructor() {
    super();
    this.__value = undefined;
    this.__min = undefined;
    this.__max = undefined;

    Object.defineProperty(this, 'value', {
      get: () => this._input ? this._input.value : (this.__value ?? '0'),
      set: (v) => { this.__value = v; this._syncInput(); },
      enumerable: true,
      configurable: true,
    });
    Object.defineProperty(this, 'min', {
      get: () => this.__min ?? this.getAttribute('min') ?? '0',
      set: (v) => { this.__min = v; this._syncInput(); },
      enumerable: true,
      configurable: true,
    });
    Object.defineProperty(this, 'max', {
      get: () => this.__max ?? this.getAttribute('max') ?? '255',
      set: (v) => { this.__max = v; this._syncInput(); },
      enumerable: true,
      configurable: true,
    });
  }

  _syncInput() {
    if (!this._input) return;
    if (this.__min !== undefined) this._input.min = this.__min;
    if (this.__max !== undefined) this._input.max = this.__max;
    if (this.__value !== undefined) this._input.value = this.__value;
  }

  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <style>
          :host { display: flex; flex: 1; align-items: center; }
          input { width: 100%; cursor: pointer; }
        </style>
        <input type="range">
      `;
      this._input = this.shadowRoot.querySelector('input');
      this._input.addEventListener('change', () => {
        this.dispatchEvent(new Event('change', { bubbles: true }));
      });
    }
    this._syncInput();
  }

  attributeChangedCallback(name, _, newVal) {
    if (name === 'value') this.__value = newVal;
    if (name === 'min') this.__min = newVal;
    if (name === 'max') this.__max = newVal;
    this._syncInput();
  }
}
safeDefine('ha-slider', MockHaSlider);

// -- ha-hs-color-picker (simplified mock) --
class MockHsColorPicker extends HTMLElement {
  constructor() {
    super();
    this.__value = [0, 0];
    Object.defineProperty(this, 'value', {
      get: () => this.__value,
      set: (v) => { this.__value = v || [0, 0]; this._render(); },
      enumerable: true,
      configurable: true,
    });
  }
  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
      this._render();
    }
  }
  _render() {
    const [h, s] = this.__value || [0, 0];
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
  constructor() {
    super();
    this.__stateObj = null;
    Object.defineProperty(this, 'stateObj', {
      get: () => this.__stateObj,
      set: (v) => { this.__stateObj = v; this._render(); },
      enumerable: true,
      configurable: true,
    });
  }
  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
      this._render();
    }
  }
  _render() {
    if (!this.shadowRoot) return;
    const on = this.__stateObj && this.__stateObj.state === 'on';
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
