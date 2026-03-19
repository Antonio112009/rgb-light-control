(()=>{"use strict";
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;class r{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}}const o=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new r(s,t,i)},n=(i,s)=>{if(e)i.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of s){const s=document.createElement("style"),r=t.litNonce;void 0!==r&&s.setAttribute("nonce",r),s.textContent=e.cssText,i.appendChild(s)}},a=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:c,defineProperty:l,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:_,getPrototypeOf:u}=Object,p=globalThis,g=p.trustedTypes,f=g?g.emptyScript:"",m=p.reactiveElementPolyfillSupport,b=(t,e)=>t,$={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>!c(t,e),v={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),p.litPropertyMetadata??=new WeakMap;class w extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=v){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&l(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:r}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);r?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??v}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const t=this.properties,e=[...d(t),..._(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return n(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:$).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=s;const o=r.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i,s=!1,r){if(void 0!==t){const o=this.constructor;if(!1===s&&(r=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??y)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==r||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}}w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[b("elementProperties")]=new Map,w[b("finalized")]=new Map,m?.({ReactiveElement:w}),(p.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x=globalThis,S=t=>t,A=x.trustedTypes,k=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,M="?"+C,P=`<${M}>`,T=document,O=()=>T.createComment(""),U=t=>null===t||"object"!=typeof t&&"function"!=typeof t,R=Array.isArray,N=t=>R(t)||"function"==typeof t?.[Symbol.iterator],H="[ \t\n\f\r]",V=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,W=/-->/g,I=/>/g,j=RegExp(`>|${H}(?:([^\\s"'>=/]+)(${H}*=${H}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),F=/'/g,D=/"/g,z=/^(?:script|style|textarea|title)$/i,B=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),L=B(1),K=(B(2),B(3),Symbol.for("lit-noChange")),q=Symbol.for("lit-nothing"),G=new WeakMap,J=T.createTreeWalker(T,129);function Z(t,e){if(!R(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==k?k.createHTML(e):e}const Y=(t,e)=>{const i=t.length-1,s=[];let r,o=2===e?"<svg>":3===e?"<math>":"",n=V;for(let e=0;e<i;e++){const i=t[e];let a,c,l=-1,h=0;for(;h<i.length&&(n.lastIndex=h,c=n.exec(i),null!==c);)h=n.lastIndex,n===V?"!--"===c[1]?n=W:void 0!==c[1]?n=I:void 0!==c[2]?(z.test(c[2])&&(r=RegExp("</"+c[2],"g")),n=j):void 0!==c[3]&&(n=j):n===j?">"===c[0]?(n=r??V,l=-1):void 0===c[1]?l=-2:(l=n.lastIndex-c[2].length,a=c[1],n=void 0===c[3]?j:'"'===c[3]?D:F):n===D||n===F?n=j:n===W||n===I?n=V:(n=j,r=void 0);const d=n===j&&t[e+1].startsWith("/>")?" ":"";o+=n===V?i+P:l>=0?(s.push(a),i.slice(0,l)+E+i.slice(l)+C+d):i+C+(-2===l?e:d)}return[Z(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class Q{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,o=0;const n=t.length-1,a=this.parts,[c,l]=Y(t,e);if(this.el=Q.createElement(c,i),J.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=J.nextNode())&&a.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(E)){const e=l[o++],i=s.getAttribute(t).split(C),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:n[2],strings:i,ctor:"."===n[1]?st:"?"===n[1]?rt:"@"===n[1]?ot:it}),s.removeAttribute(t)}else t.startsWith(C)&&(a.push({type:6,index:r}),s.removeAttribute(t));if(z.test(s.tagName)){const t=s.textContent.split(C),e=t.length-1;if(e>0){s.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],O()),J.nextNode(),a.push({type:2,index:++r});s.append(t[e],O())}}}else if(8===s.nodeType)if(s.data===M)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=s.data.indexOf(C,t+1));)a.push({type:7,index:r}),t+=C.length-1}r++}}static createElement(t,e){const i=T.createElement("template");return i.innerHTML=t,i}}function X(t,e,i=t,s){if(e===K)return e;let r=void 0!==s?i._$Co?.[s]:i._$Cl;const o=U(e)?void 0:e._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(t),r._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=r:i._$Cl=r),void 0!==r&&(e=X(t,r._$AS(t,e.values),r,s)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??T).importNode(e,!0);J.currentNode=s;let r=J.nextNode(),o=0,n=0,a=i[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new et(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new nt(r,this,t)),this._$AV.push(e),a=i[++n]}o!==a?.index&&(r=J.nextNode(),o++)}return J.currentNode=T,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),U(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==K&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):N(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&U(this._$AH)?this._$AA.nextSibling.data=t:this.T(T.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Q.createElement(Z(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new tt(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=G.get(t.strings);return void 0===e&&G.set(t.strings,e=new Q(t)),e}k(t){R(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const r of t)s===e.length?e.push(i=new et(this.O(O()),this.O(O()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=S(t).nextSibling;S(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=q}_$AI(t,e=this,i,s){const r=this.strings;let o=!1;if(void 0===r)t=X(this,t,e,0),o=!U(t)||t!==this._$AH&&t!==K,o&&(this._$AH=t);else{const s=t;let n,a;for(t=r[0],n=0;n<r.length-1;n++)a=X(this,s[i+n],e,n),a===K&&(a=this._$AH[n]),o||=!U(a)||a!==this._$AH[n],a===q?t=q:t!==q&&(t+=(a??"")+r[n+1]),this._$AH[n]=a}o&&!s&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class st extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class rt extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class ot extends it{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=X(this,t,e,0)??q)===K)return;const i=this._$AH,s=t===q&&i!==q||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==q&&(i===q||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}}const at=x.litHtmlPolyfillSupport;at?.(Q,et),(x.litHtmlVersions??=[]).push("3.3.2");const ct=globalThis;class lt extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let r=s._$litPart$;if(void 0===r){const t=i?.renderBefore??null;s._$litPart$=r=new et(e.insertBefore(O(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return K}}lt._$litElement$=!0,lt.finalized=!0,ct.litElementHydrateSupport?.({LitElement:lt});const ht=ct.litElementPolyfillSupport;ht?.({LitElement:lt});
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function dt(t){return class extends t{createRenderRoot(){const t=this.constructor,{registry:e,elementDefinitions:i,shadowRootOptions:s}=t;i&&!e&&(t.registry=new CustomElementRegistry,Object.entries(i).forEach(([e,i])=>t.registry.define(e,i)));const r=this.renderOptions.creationScope=this.attachShadow({...s,customElements:t.registry});return n(r,this.constructor.elementStyles),r}}}(ct.litElementVersions??=[]).push("4.2.2");const _t=o`
  .light-entity-card {
    padding: 16px;
  }

  .light-entity-child-card {
    box-shadow: none !important;
    padding: 0 !important;
  }

  .light-entity-card.group {
    padding-bottom: 5px;
    padding-top: 0;
  }

  .ha-slider-full-width ha-slider {
    flex: 1;
    min-width: 0;
  }

  .percent-slider {
    color: var(--primary-text-color);
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 8px;
    min-width: 40px;
  }

  .light-entity-card__header {
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    color: var(--primary-text-color);
  }

  .light-entity-card-sliders > div {
    margin-top: 14px;
  }

  .group .light-entity-card-sliders > div {
    margin-top: 0;
  }

  .light-entity-card__color-picker {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
  }

  .light-entity-card__color-picker ha-hs-color-picker {
    max-width: 300px;
    width: 100%;
  }

  .light-entity-card-color_temp {
    background-image: var(--ha-slider-background, linear-gradient(to right, #a6d1ff, #ffb74d));
    border-radius: 4px;
  }

  .light-entity-card-color_temp--kelvin {
    background-image: var(--ha-slider-background, linear-gradient(to right, #ffb74d, #a6d1ff));
  }

  .light-entity-card-effectlist {
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .group .light-entity-card-effectlist {
    padding-bottom: 20px;
  }

  .light-entity-card-center {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .icon-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 8px;
  }

  .light-entity-card__mode-toggle {
    display: flex;
    justify-content: center;
    margin: 10px 0 4px;
  }

  .light-entity-card__mode-btn {
    padding: 6px 20px;
    border: 1px solid var(--divider-color, #e0e0e0);
    background: transparent;
    color: var(--primary-text-color, #212121);
    cursor: pointer;
    font-size: 13px;
    font-weight: 500;
    transition: background 0.2s, color 0.2s;
    outline: none;
  }

  .light-entity-card__mode-btn:first-child {
    border-radius: 16px 0 0 16px;
  }

  .light-entity-card__mode-btn:last-child {
    border-radius: 0 16px 16px 0;
  }

  .light-entity-card__mode-btn + .light-entity-card__mode-btn {
    border-left: none;
  }

  .light-entity-card__mode-btn--active {
    background: var(--primary-color, #03a9f4);
    color: white;
    border-color: var(--primary-color, #03a9f4);
  }

  .light-entity-card__mode-btn:hover:not(.light-entity-card__mode-btn--active) {
    background: rgba(0, 0, 0, 0.05);
  }

  .light-entity-card__color-dots {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
    margin: 12px 8px 6px;
    padding: 4px;
  }

  .light-entity-card__color-dot {
    width: 38px;
    min-width: 28px;
    height: 38px;
    border-radius: 50%;
    border: 3px solid transparent;
    cursor: pointer;
    transition: transform 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
    outline: none;
    padding: 0;
  }

  .light-entity-card__color-dot:hover {
    transform: scale(1.15);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  }

  .light-entity-card__color-dot--selected {
    border-color: white;
    transform: scale(1.2);
    box-shadow: 0 0 12px rgba(255, 255, 255, 0.6), 0 2px 8px rgba(0, 0, 0, 0.4);
  }

  .light-entity-card__rgb-view-switch {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin: 16px 0 8px;
  }

  .light-entity-card__rgb-view-label {
    font-size: 13px;
    color: var(--secondary-text-color, #727272);
  }
`,ut={shorten_cards:!1,consolidate_entities:!1,child_card:!1,hide_header:!1,show_header_icon:!1,header:"",persist_features:!1,brightness:!0,color_temp:!0,white_value:!0,warm_white_value:!0,color_picker:!0,effects_list:!0,speed:!0,intensity:!0,fixed_white:!1,force_features:!1,show_slider_percent:!1,full_width_sliders:!1,color_temp_in_kelvin:!1,transition:0,brightness_icon:"weather-sunny",white_icon:"file-word-box",warm_white_icon:"weather-sunset",temperature_icon:"thermometer",speed_icon:"speedometer",intensity_icon:"transit-connection-horizontal"},pt=o`
  .entities {
    padding-top: 10px;
    padding-bottom: 10px;
    display: flex;
  }

  .entities ha-formfield {
    display: block;
    margin-bottom: 10px;
    margin-left: 10px;
  }

  .checkbox-options {
    display: flex;
  }

  ha-select {
    width: 100%;
  }

  .checkbox-options ha-formfield,
  .entities ha-form-string {
    padding-right: 2%;
    width: 48%;
  }

  .checkbox-options ha-formfield {
    margin-top: 10px;
  }

  .overall-config {
    margin-bottom: 20px;
  }
`,gt=(t,e)=>t.reduce((t,i)=>(i.defineId?t[i.defineId]=i:i.promise.then(t=>{void 0===e.registry.get(i.name)&&e.registry.define(i.name,t)}),t),{}),ft=t=>({name:t,promise:customElements.whenDefined(t).then(()=>customElements.get(t))}),mt=(t,e,i={},s={})=>{const r=new Event(e,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});return r.detail=i,t.dispatchEvent(r),r},bt=[[{label:"Shorten Cards",key:"shorten_cards"}],[{label:"Persist Features",key:"persist_features"},{label:"Show Brightness",key:"brightness"}],[{label:"Show Color Temp",key:"color_temp"},{label:"Color Temp in Kelvin",key:"color_temp_in_kelvin"}],[{label:"Show White Channel",key:"white_value"}],[{label:"Show Warm White",key:"warm_white_value"}],[{label:"Show Speed",key:"speed"},{label:"Show Intensity",key:"intensity"}],[{label:"Show Color Picker",key:"color_picker"},{label:"Show Effects List",key:"effects_list"}],[{label:"Full Width Sliders",key:"full_width_sliders"},{label:"Show Slider Percent",key:"show_slider_percent"}],[{label:"Show Brightness %",key:"show_brightness_percent"},{label:"Show Color Temp %",key:"show_color_temp_percent"}],[{label:"Hide Header",key:"hide_header"},{label:"Show Header Icon",key:"show_header_icon"},{label:"Child Card",key:"child_card"}],[{label:"Force Features",key:"force_features"}],[{label:"Consolidate Entities",key:"consolidate_entities"}],[{label:"Fixed White",key:"fixed_white"}]],$t=[{name:"brightness_icon",label:"Brightness Icon"},{name:"white_icon",label:"White Icon"},{name:"warm_white_icon",label:"Warm White Icon"},{name:"temperature_icon",label:"Temperature Icon"}];class yt extends(dt(lt)){static get elementDefinitions(){return gt([ft("ha-checkbox"),ft("ha-formfield"),ft("ha-form-string"),ft("ha-select"),ft("mwc-list-item")],yt)}static get styles(){return pt}static get properties(){return{hass:{},_config:{}}}setConfig(t){this._config={...ut,...t}}firstUpdated(){this._firstRendered=!0}get entityOptions(){return Object.keys(this.hass.states).filter(t=>["switch","light","group"].includes(t.split(".")[0])).sort()}render(){if(!this.hass||!this._config)return L``;let{header:t}=this._config;if(!t&&this._config.entity){const e=this._config.entity.split(".")[1]||"";e&&(t=e.charAt(0).toUpperCase()+e.slice(1))}const e=this.entityOptions.map(t=>L`<mwc-list-item value="${t}" ?selected=${t===this._config.entity}>${t}</mwc-list-item>`);return L`
      <div class="card-config">
        <div class="overall-config">
          <ha-form-string
            .schema=${{name:"header",type:"string"}}
            label="Header"
            .data="${t}"
            .configValue="${"header"}"
            @changed="${this._onConfigChanged}"
          ></ha-form-string>
        </div>

        <div class="entities">
          <ha-select
            label="Entity"
            @selected="${this._onConfigChanged}"
            @closed="${t=>t.stopPropagation()}"
            .configValue="${"entity"}"
          >
            ${e}
          </ha-select>
        </div>

        <div class="entities">
          ${this._renderIconFields($t.slice(0,2))}
        </div>
        <div class="entities">
          ${this._renderIconFields($t.slice(2))}
          <ha-form-string
            .schema=${{name:"transition",type:"string"}}
            label="Transition (seconds)"
            .data="${String(this._config.transition||"")}"
            .configValue="${"transition"}"
            @changed="${this._onConfigChanged}"
          ></ha-form-string>
        </div>

        <div class="overall-config">
          ${bt.map(t=>L`
            <div class="checkbox-options">
              ${t.map(({label:t,key:e})=>L`
                <ha-formfield label="${t}">
                  <ha-checkbox
                    @change="${this._onCheckboxChanged}"
                    .checked=${this._config[e]}
                    .value="${e}"
                  ></ha-checkbox>
                </ha-formfield>
              `)}
            </div>
          `)}
        </div>
      </div>
    `}_renderIconFields(t){return t.map(({name:t,label:e})=>L`
      <ha-form-string
        .schema=${{name:t,type:"string"}}
        label="${e}"
        .data="${this._config[t]}"
        .configValue="${t}"
        @changed="${this._onConfigChanged}"
      ></ha-form-string>
    `)}_onConfigChanged(t){if(!this._config||!this.hass||!this._firstRendered)return;const{target:{configValue:e,value:i},detail:s}=t,r=s&&void 0!==s.value&&null!==s.value?s.value:i;this._config={...this._config,[e]:r},mt(this,"config-changed",{config:this._config})}_onCheckboxChanged(t){if(!this._config||!this.hass||!this._firstRendered)return;const{target:{value:e,checked:i}}=t;this._config={...this._config,[e]:i},mt(this,"config-changed",{config:this._config})}}const vt=1e6,wt=[255,255,255],xt=[{name:"Red",hs:[0,100],color:"#ff0000"},{name:"Orange",hs:[30,100],color:"#ff8000"},{name:"Yellow",hs:[60,100],color:"#ffff00"},{name:"Green",hs:[120,100],color:"#00ff00"},{name:"Cyan",hs:[180,100],color:"#00ffff"},{name:"Blue",hs:[240,100],color:"#0000ff"},{name:"Purple",hs:[270,100],color:"#8000ff"},{name:"Pink",hs:[320,100],color:"#ff00aa"}],St=["hs","rgb","rgbw","rgbww","xy"],At=["color_temp","white"],kt=["hs","rgb","rgbw","rgbww","white","brightness","color_temp","xy"],Et="turn_on",Ct={light:10,switch:1},Mt="rgb-light-controller-editor";customElements.define(Mt,yt);class Pt extends(dt(lt)){static get elementDefinitions(){return gt([ft("ha-card"),ft("more-info-light"),ft("ha-switch"),ft("ha-icon"),ft("state-badge"),ft("ha-slider"),ft("ha-hs-color-picker"),ft("ha-select"),ft("mwc-list-item")],Pt)}static get properties(){return{hass:{},config:{},_colorPickerValues:{state:!0},_colorMode:{state:!0},_rgbView:{state:!0}}}static get styles(){return _t}async firstUpdated(){this._firstUpdate=!0;if(!1!==this.config.color_picker&&this.config.entity.startsWith("light.")&&!customElements.get("ha-hs-color-picker")){try{await Promise.race([customElements.whenDefined("ha-hs-color-picker"),new Promise((t,e)=>setTimeout(()=>e(new Error("timeout")),5e3))])}catch{}this.requestUpdate()}}setConfig(t){if(!t.entity)throw Error("entity required.");this.config={...ut,...t},void 0===this._colorMode&&(this._colorMode=null),void 0===this._rgbView&&(this._rgbView="dots")}static async getConfigElement(){return document.createElement(Mt)}getCardSize(){if(!this.config||!this.hass||!this.hass.states[this.config.entity])return 1;const t=this.hass.states[this.config.entity];let e=0;return Array.isArray(t.attributes.entity_id)?t.attributes.entity_id.forEach(t=>{e+=this._entityCardSize(t)}):e+=this._entityCardSize(t.attributes.entity_id),this.config.group&&(e*=.8),Math.floor(e)}_entityCardSize(t){if(!t)return 0;const e=t.split(".")[0];return Ct[e]||0}isEntityOn(t){return"on"===t.state}_colorModes(t){return t.attributes.supported_color_modes||[]}_supportsRgb(t){return this._colorModes(t).some(t=>St.includes(t))}_supportsWhite(t){return this._colorModes(t).some(t=>At.includes(t))}_isFixedWhite(){return!0===this.config.fixed_white}_detectColorMode(t){const e=t.attributes.color_mode;return At.includes(e)?"white":"rgb"}shouldShowFeature(t,e){if(this.config.force_features)return!0;if("speed"===t&&"speed"in e.attributes)return!0;if("intensity"===t&&"intensity"in e.attributes)return!0;const i=this._colorModes(e),s=e.attributes.supported_features||0;let r;switch(t){case"brightness":r=!!(1&s)||"brightness"in e.attributes||i.some(t=>kt.includes(t));break;case"colorTemp":r=!!(2&s)||i.includes("color_temp");break;case"effectList":r=!!(4&s)||e.attributes.effect_list&&e.attributes.effect_list.length>0;break;case"color":r=!!(16&s)||i.some(t=>St.includes(t));break;case"whiteValue":r=!!(128&s)||"white_value"in e.attributes||i.some(t=>["rgbw","rgbww"].includes(t));break;case"warmWhiteValue":r=i.includes("rgbww");break;default:return!1}return!!r&&!(!this.config.persist_features&&!this.isEntityOn(e))}render(){const t=this.hass.states[this.config.entity];if(!t)return L`<ha-card> Invalid entity: ${this.config.entity} </ha-card>`;const e=this._getEntitiesToShow(t),i=(this.config.consolidate_entities?[t]:e).map(t=>this._createEntityTemplate(t)),s=["light-entity-card",this.config.shorten_cards?"group":"",this.config.child_card?"light-entity-child-card":""].filter(Boolean).join(" ");return L`
      <ha-card class="${s}">
        ${i}
      </ha-card>
    `}_getEntitiesToShow(t){return t.attributes.entity_id&&Array.isArray(t.attributes.entity_id)?t.attributes.entity_id.map(t=>this.hass.states[t]).filter(Boolean):[t]}_createEntityTemplate(t){if(!t||!t.attributes)return L``;const e=this.config.full_width_sliders?"ha-slider-full-width":"",i=this._supportsRgb(t),s=this._supportsWhite(t),r=i&&s;null===this._colorMode&&(this._colorMode=r?this._detectColorMode(t):i?"rgb":"white");const o=!r||"rgb"===this._colorMode,n=r&&"white"===this._colorMode,a=this._isFixedWhite();return L`
      ${this._createHeader(t)}
      ${r?this._createModeToggle(t):""}
      <div class="light-entity-card-sliders ${e}">
        ${this._createSlider(t,"brightness",this.config.brightness_icon,1,255,"brightness")}
        ${this._createSlider(t,"speed",this.config.speed_icon,1,255)}
        ${this._createSlider(t,"intensity",this.config.intensity_icon,1,255)}
        ${n&&!a?this._createColorTemperature(t):""}
        ${n?this._createWhiteSlider(t,"white"):""}
        ${n&&!a?this._createWhiteSlider(t,"warmWhite"):""}
        ${o?this._createSaturationSlider(t):""}
      </div>
      ${o?this._createRgbViewSwitch():""}
      ${o&&"dots"===this._rgbView?this._createColorDots(t):""}
      ${o&&"wheel"===this._rgbView?this._createColorPicker(t):""}
      ${this._createEffectList(t)}
    `}_createHeader(t){if(this.config.hide_header)return L``;const e=this.config.header||t.attributes.friendly_name||t.entity_id;return L`
      <div class="light-entity-card__header">
        ${this.config.show_header_icon?L`<div class="icon-container"><state-badge .stateObj=${t}></state-badge></div>`:""}
        <div class="light-entity-card__title">${e}</div>
        <div class="light-entity-card-toggle">
          <ha-switch
            .checked=${this.isEntityOn(t)}
            @change=${e=>this._setToggle(e,t)}
            aria-label="Toggle ${e}"
          ></ha-switch>
        </div>
      </div>
    `}_createModeToggle(t){return L`
      <div class="light-entity-card__mode-toggle">
        <button
          class="light-entity-card__mode-btn ${"rgb"===this._colorMode?"light-entity-card__mode-btn--active":""}"
          @click=${()=>this._switchColorMode("rgb",t)}
        >RGB</button>
        <button
          class="light-entity-card__mode-btn ${"white"===this._colorMode?"light-entity-card__mode-btn--active":""}"
          @click=${()=>this._switchColorMode("white",t)}
        >White</button>
      </div>
    `}_switchColorMode(t,e){if(this._colorMode!==t&&(this._colorMode=t,this.isEntityOn(e))){if("rgb"===t){const t=e.attributes.hs_color||[0,100];return void this._callService({hs_color:t},e)}if(this._isFixedWhite()){const t=this._getWhiteValue(e,3)||255,i=this._colorModes(e);i.includes("white")?this._callService({white:t},e):i.includes("rgbw")?this._callService({rgbw_color:[255,255,255,t]},e):this._callService({color_temp_kelvin:4e3},e)}else{const t=this._getColorTempRange(e);if(t){const i=t.kelvin??Math.round((t.minK+t.maxK)/2),s=t.usesKelvin?{color_temp_kelvin:i}:{color_temp:Math.round(vt/i)};this._callService(s,e)}}}}_createRgbViewSwitch(){const t="dots"===this._rgbView;return L`
      <div class="light-entity-card__rgb-view-switch">
        <span class="light-entity-card__rgb-view-label">Fixed colours</span>
        <ha-switch
          .checked=${t}
          @change=${()=>{this._rgbView=t?"wheel":"dots"}}
          aria-label="Toggle fixed colours"
        ></ha-switch>
      </div>
    `}_createColorDots(t){const e=t.attributes.hs_color||[0,0],i=this.config.preset_colors||xt;return L`
      <div class="light-entity-card__color-dots">
        ${i.map(i=>{const s=Math.abs(e[0]-i.hs[0])<15&&e[1]>50;return L`
            <button
              class="light-entity-card__color-dot ${s?"light-entity-card__color-dot--selected":""}"
              style="background: ${i.color};"
              title="${i.name}"
              @click=${()=>this._callService({hs_color:i.hs},t)}
            ></button>
          `})}
      </div>
    `}_createSlider(t,e,i,s,r,o){if(!1===this.config[e])return L``;if(!this.shouldShowFeature(e,t))return L``;const n=t.attributes[e]??0,a=e.charAt(0).toUpperCase()+e.slice(1);return L`
      <div class="control light-entity-card-center">
        <div class="icon-container" title="${a}">
          <ha-icon icon="hass:${i}"></ha-icon>
        </div>
        <ha-slider
          .value="${n}"
          @change="${i=>this._setAttrValue(i,t,e)}"
          min="${s}"
          max="${r}"
          aria-label="${a}"
        ></ha-slider>
        ${this._showPercent(n,0,254,o)}
      </div>
    `}_createSaturationSlider(t){if(!this.shouldShowFeature("color",t))return L``;const e=t.attributes.hs_color||[0,0],i=Math.round(e[1]);return L`
      <div class="control light-entity-card-center">
        <div class="icon-container" title="Saturation">
          <ha-icon icon="hass:palette"></ha-icon>
        </div>
        <ha-slider
          .value="${i}"
          @change="${e=>this._setSaturation(e,t)}"
          min="0"
          max="100"
          aria-label="Saturation"
        ></ha-slider>
        ${this._showPercent(i,0,100)}
      </div>
    `}_setSaturation(t,e){const i=parseInt(t.target.value,10);if(isNaN(i))return;const s=e.attributes.hs_color||[0,0];Math.round(s[1])!==i&&this._callService({hs_color:[s[0],i]},e)}_showPercent(t,e,i,s){if("brightness"===s&&void 0!==this.config.show_brightness_percent){if(!this.config.show_brightness_percent)return L``}else if("color_temp"===s&&void 0!==this.config.show_color_temp_percent){if(!this.config.show_color_temp_percent)return L``}else if("color_temp"===s&&this.config.color_temp_in_kelvin);else if(!this.config.show_slider_percent)return L``;if("color_temp"===s&&this.config.color_temp_in_kelvin)return L`<div class="percent-slider">${t}K</div>`;const r=i!==e?Math.round(100*(t-e)/(i-e)):0;return L`<div class="percent-slider">${isNaN(r)?0:r}%</div>`}_getColorTempRange(t){const e=t.attributes,i=void 0!==e.min_color_temp_kelvin;let s,r,o,n,a;if(i){if(s=e.color_temp_kelvin,r=e.min_color_temp_kelvin,o=e.max_color_temp_kelvin,!r||!o)return null;n=Math.round(vt/o),a=Math.round(vt/r)}else{if(n=e.min_mireds,a=e.max_mireds,!n||!a)return null;s=e.color_temp?Math.round(vt/e.color_temp):null,r=Math.round(vt/a),o=Math.round(vt/n)}return{usesKelvin:i,kelvin:"number"==typeof s&&Number.isFinite(s)&&s>0?s:null,minK:r,maxK:o,minMired:n,maxMired:a}}_createColorTemperature(t){if(!1===this.config.color_temp)return L``;if(!this.shouldShowFeature("colorTemp",t))return L``;const e=this._getColorTempRange(t);if(!e)return L``;const{usesKelvin:i,kelvin:s,minK:r,maxK:o,minMired:n,maxMired:a}=e;let c,l,h,d,_;if(this.config.color_temp_in_kelvin)c=r,l=o,h=s??Math.round((r+o)/2),d="light-entity-card-color_temp light-entity-card-color_temp--kelvin",_=e=>this._setColorTemp(e,t,i,!0);else{const e=a-n,r=s?Math.round(vt/s):null;c=0,l=100,h=e>0&&null!==r?Math.round((r-n)/e*100):50,d="light-entity-card-color_temp",_=e=>this._setColorTemp(e,t,i,!1,n,a)}return L`
      <div class="control light-entity-card-center">
        <div class="icon-container" title="Color Temperature">
          <ha-icon icon="hass:${this.config.temperature_icon}"></ha-icon>
        </div>
        <ha-slider
          class="${d}"
          min="${c}"
          max="${l}"
          .value=${h}
          @change="${_}"
          aria-label="Color temperature"
        ></ha-slider>
        ${this._showPercent(h,c,l,"color_temp")}
      </div>
    `}_getWhiteValue(t,e=3){const{rgbw_color:i,rgbww_color:s,white_value:r}=t.attributes;return i&&3===e?i[3]??0:s&&e<s.length?s[e]??0:3===e&&void 0!==r?r??0:0}_createWhiteSlider(t,e){const i="warmWhite"===e,s=i?"warm_white_value":"white_value",r=i?"warmWhiteValue":"whiteValue",o=i?this.config.warm_white_icon:this.config.white_icon,n=i?"Warm White":"White",a=i?4:3;if(!1===this.config[s])return L``;if(!this.shouldShowFeature(r,t))return L``;const c=this._getWhiteValue(t,a);return L`
      <div class="control light-entity-card-center">
        <div class="icon-container" title="${n}">
          <ha-icon icon="hass:${o}"></ha-icon>
        </div>
        <ha-slider
          max="255"
          .value="${c}"
          @change="${e=>this._setWhiteValue(e,t,a)}"
          aria-label="${n} value"
        ></ha-slider>
        ${this._showPercent(c,0,254)}
      </div>
    `}_createEffectList(t){if(!1===this.config.effects_list)return L``;if(!this.config.persist_features&&!this.isEntityOn(t))return L``;let e=t.attributes.effect_list||[];if(this.config.effects_list&&Array.isArray(this.config.effects_list))e=this.config.effects_list;else if(this.config.effects_list&&this.hass.states[this.config.effects_list]){const t=this.hass.states[this.config.effects_list];e=t.attributes&&t.attributes.options||[]}else if(!this.shouldShowFeature("effectList",t))return L``;const i=this.hass.localize("ui.card.light.effect")||"Effect";return L`
      <div class="control light-entity-card-center light-entity-card-effectlist">
        <ha-select
          @closed="${t=>t.stopPropagation()}"
          @selected=${e=>this._setEffect(e,t)}
          label="${i}"
        >
          ${e.map(e=>L`
            <mwc-list-item value="${e}" ?selected=${e===t.attributes.effect}>
              ${e}
            </mwc-list-item>
          `)}
        </ha-select>
      </div>
    `}_createColorPicker(t){if(!1===this.config.color_picker)return L``;if(!this.shouldShowFeature("color",t))return L``;const e=t.attributes.hs_color||[0,0],i=this._colorPickerValues&&this._colorPickerValues[t.entity_id]||[e[0],e[1]/100];return L`
      <div class="light-entity-card__color-picker">
        <ha-hs-color-picker
          .value=${i}
          @cursor-moved=${e=>{this._colorPickerValues={...this._colorPickerValues,[t.entity_id]:e.detail.value}}}
          @value-changed=${e=>this._onColorPickerChanged(e.detail.value,t)}
        ></ha-hs-color-picker>
      </div>
    `}_onColorPickerChanged(t,e){if(this._colorPickerValues){const{[e.entity_id]:t,...i}=this._colorPickerValues;this._colorPickerValues=i}t&&this._callService({hs_color:[t[0],100*t[1]]},e)}_setAttrValue(t,e,i){const s=parseInt(t.target.value,10);isNaN(s)||parseInt(e.attributes[i],10)===s||this._callService({[i]:s},e)}_setColorTemp(t,e,i,s,r,o){const n=parseInt(t.target.value,10);if(!isNaN(n))if(s)if(i){if(n===parseInt(e.attributes.color_temp_kelvin,10))return;this._callService({color_temp_kelvin:n},e)}else{const t=Math.round(vt/n);if(t===parseInt(e.attributes.color_temp,10))return;this._callService({color_temp:t},e)}else{if(!Number.isFinite(r)||!Number.isFinite(o)||o<=r)return;const t=Math.round(r+n/100*(o-r));if(i){const i=Math.round(vt/t);if(i===parseInt(e.attributes.color_temp_kelvin,10))return;this._callService({color_temp_kelvin:i},e)}else{if(t===parseInt(e.attributes.color_temp,10))return;this._callService({color_temp:t},e)}}}_setWhiteValue(t,e,i){const s=parseInt(t.target.value,10);if(isNaN(s))return;const r=this._colorModes(e),{rgbw_color:o,rgbww_color:n,rgb_color:a}=e.attributes;if(r.includes("rgbw")&&3===i){const t=o?o.slice(0,3):a||wt;this._callService({rgbw_color:[t[0],t[1],t[2],s]},e)}else if(r.includes("rgbww")){let t;if(n)t=n;else if(o)t=[o[0],o[1],o[2],o[3],0];else{const e=a||wt;t=[e[0],e[1],e[2],0,0]}const r=[...t];r[i]=s,this._callService({rgbww_color:r},e)}else this._callService({white_value:s},e)}_setToggle(t,e){const i=this.isEntityOn(e)?"turn_off":Et;this._callService({},e,i)}_setEffect(t,e){t.target.value&&this._callService({effect:t.target.value},e)}_callService(t,e,i){if(!this._firstUpdate)return;const s=e.entity_id;this._debounceTimers&&this._debounceTimers[s]&&clearTimeout(this._debounceTimers[s]),i||t.effect?this._executeService(t,e,i):(this._debounceTimers||(this._debounceTimers={}),this._debounceTimers[s]=setTimeout(()=>{this._executeService(t,e,i),delete this._debounceTimers[s]},100))}_executeService(t,e,i){let s=e.entity_id.split(".")[0];"group"===s&&(s="homeassistant");const r=parseFloat(this.config.transition)||0;r>0&&"light"===s&&(t={...t,transition:r}),this.hass.callService(s,i||Et,{entity_id:e.entity_id,...t})}}customElements.define("rgb-light-controller",Pt),window.customCards=window.customCards||[],window.customCards.push({type:"rgb-light-controller",name:"RGB Light Controller",description:"Control lights and switches"})})();