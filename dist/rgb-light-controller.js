/*! For license information please see rgb-light-controller.js.LICENSE.txt */
(()=>{"use strict";const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;class r{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}}const o=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new r(s,t,i)},n=(i,s)=>{if(e)i.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of s){const s=document.createElement("style"),r=t.litNonce;void 0!==r&&s.setAttribute("nonce",r),s.textContent=e.cssText,i.appendChild(s)}},c=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:h,defineProperty:a,getOwnPropertyDescriptor:l,getOwnPropertyNames:d,getOwnPropertySymbols:g,getPrototypeOf:f}=Object,u=globalThis,_=u.trustedTypes,p=_?_.emptyScript:"",m=u.reactiveElementPolyfillSupport,b=(t,e)=>t,$={toAttribute(t,e){switch(e){case Boolean:t=t?p:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>!h(t,e),y={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:v};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;class w extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&a(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:r}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);r?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const t=f(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const t=this.properties,e=[...d(t),...g(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(c(t))}else void 0!==t&&e.push(c(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return n(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:$).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=s;const o=r.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i,s=!1,r){if(void 0!==t){const o=this.constructor;if(!1===s&&(r=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??v)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==r||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}}w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[b("elementProperties")]=new Map,w[b("finalized")]=new Map,m?.({ReactiveElement:w}),(u.reactiveElementVersions??=[]).push("2.1.2");const x=globalThis,k=t=>t,C=x.trustedTypes,A=C?C.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+S,M=`<${P}>`,T=document,O=()=>T.createComment(""),U=t=>null===t||"object"!=typeof t&&"function"!=typeof t,N=Array.isArray,R="[ \t\n\f\r]",V=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,W=/>/g,I=RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,j=/"/g,B=/^(?:script|style|textarea|title)$/i,D=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),F=D(1),z=(D(2),D(3),Symbol.for("lit-noChange")),K=Symbol.for("lit-nothing"),q=new WeakMap,G=T.createTreeWalker(T,129);function J(t,e){if(!N(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(e):e}const Z=(t,e)=>{const i=t.length-1,s=[];let r,o=2===e?"<svg>":3===e?"<math>":"",n=V;for(let e=0;e<i;e++){const i=t[e];let c,h,a=-1,l=0;for(;l<i.length&&(n.lastIndex=l,h=n.exec(i),null!==h);)l=n.lastIndex,n===V?"!--"===h[1]?n=H:void 0!==h[1]?n=W:void 0!==h[2]?(B.test(h[2])&&(r=RegExp("</"+h[2],"g")),n=I):void 0!==h[3]&&(n=I):n===I?">"===h[0]?(n=r??V,a=-1):void 0===h[1]?a=-2:(a=n.lastIndex-h[2].length,c=h[1],n=void 0===h[3]?I:'"'===h[3]?j:L):n===j||n===L?n=I:n===H||n===W?n=V:(n=I,r=void 0);const d=n===I&&t[e+1].startsWith("/>")?" ":"";o+=n===V?i+M:a>=0?(s.push(c),i.slice(0,a)+E+i.slice(a)+S+d):i+S+(-2===a?e:d)}return[J(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class Q{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,o=0;const n=t.length-1,c=this.parts,[h,a]=Z(t,e);if(this.el=Q.createElement(h,i),G.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=G.nextNode())&&c.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(E)){const e=a[o++],i=s.getAttribute(t).split(S),n=/([.?@])?(.*)/.exec(e);c.push({type:1,index:r,name:n[2],strings:i,ctor:"."===n[1]?it:"?"===n[1]?st:"@"===n[1]?rt:et}),s.removeAttribute(t)}else t.startsWith(S)&&(c.push({type:6,index:r}),s.removeAttribute(t));if(B.test(s.tagName)){const t=s.textContent.split(S),e=t.length-1;if(e>0){s.textContent=C?C.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],O()),G.nextNode(),c.push({type:2,index:++r});s.append(t[e],O())}}}else if(8===s.nodeType)if(s.data===P)c.push({type:2,index:r});else{let t=-1;for(;-1!==(t=s.data.indexOf(S,t+1));)c.push({type:7,index:r}),t+=S.length-1}r++}}static createElement(t,e){const i=T.createElement("template");return i.innerHTML=t,i}}function X(t,e,i=t,s){if(e===z)return e;let r=void 0!==s?i._$Co?.[s]:i._$Cl;const o=U(e)?void 0:e._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(t),r._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=r:i._$Cl=r),void 0!==r&&(e=X(t,r._$AS(t,e.values),r,s)),e}class Y{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??T).importNode(e,!0);G.currentNode=s;let r=G.nextNode(),o=0,n=0,c=i[0];for(;void 0!==c;){if(o===c.index){let e;2===c.type?e=new tt(r,r.nextSibling,this,t):1===c.type?e=new c.ctor(r,c.name,c.strings,this,t):6===c.type&&(e=new ot(r,this,t)),this._$AV.push(e),c=i[++n]}o!==c?.index&&(r=G.nextNode(),o++)}return G.currentNode=T,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class tt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=K,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),U(t)?t===K||null==t||""===t?(this._$AH!==K&&this._$AR(),this._$AH=K):t!==this._$AH&&t!==z&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>N(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==K&&U(this._$AH)?this._$AA.nextSibling.data=t:this.T(T.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Q.createElement(J(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Y(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=q.get(t.strings);return void 0===e&&q.set(t.strings,e=new Q(t)),e}k(t){N(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const r of t)s===e.length?e.push(i=new tt(this.O(O()),this.O(O()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=k(t).nextSibling;k(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class et{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=K,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=K}_$AI(t,e=this,i,s){const r=this.strings;let o=!1;if(void 0===r)t=X(this,t,e,0),o=!U(t)||t!==this._$AH&&t!==z,o&&(this._$AH=t);else{const s=t;let n,c;for(t=r[0],n=0;n<r.length-1;n++)c=X(this,s[i+n],e,n),c===z&&(c=this._$AH[n]),o||=!U(c)||c!==this._$AH[n],c===K?t=K:t!==K&&(t+=(c??"")+r[n+1]),this._$AH[n]=c}o&&!s&&this.j(t)}j(t){t===K?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class it extends et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===K?void 0:t}}class st extends et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==K)}}class rt extends et{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=X(this,t,e,0)??K)===z)return;const i=this._$AH,s=t===K&&i!==K||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==K&&(i===K||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}}const nt=x.litHtmlPolyfillSupport;nt?.(Q,tt),(x.litHtmlVersions??=[]).push("3.3.2");const ct=globalThis;class ht extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let r=s._$litPart$;if(void 0===r){const t=i?.renderBefore??null;s._$litPart$=r=new tt(e.insertBefore(O(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return z}}ht._$litElement$=!0,ht.finalized=!0,ct.litElementHydrateSupport?.({LitElement:ht});const at=ct.litElementPolyfillSupport;function lt(t){return class extends t{createRenderRoot(){const t=this.constructor,{registry:e,elementDefinitions:i,shadowRootOptions:s}=t;i&&!e&&(t.registry=new CustomElementRegistry,Object.entries(i).forEach(([e,i])=>t.registry.define(e,i)));const r=this.renderOptions.creationScope=this.attachShadow({...s,customElements:t.registry});return n(r,this.constructor.elementStyles),r}}}at?.({LitElement:ht}),(ct.litElementVersions??=[]).push("4.2.2");const dt=o`
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
    width: 100%;
  }

  .percent-slider {
    color: var(--primary-text-color);
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 8px;
    min-width: 40px;
    text-align: right;
  }

  .light-entity-card__header {
    display: flex;
    justify-content: space-between;
    @apply --paper-font-headline;
    line-height: 40px;
    color: var(--primary-text-color);
  }

  .light-entity-card-sliders > div {
    margin-top: 10px;
  }

  .group .light-entity-card-sliders > div {
    margin-top: 0px;
  }

  .light-entity-card__toggle {
    display: flex;
    cursor: pointer;
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

  .hidden {
    display: none;
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
    gap: 0;
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

`,gt={shorten_cards:!1,consolidate_entities:!1,child_card:!1,hide_header:!1,show_header_icon:!1,header:"",persist_features:!1,brightness:!0,color_temp:!0,white_value:!0,warm_white_value:!0,color_picker:!0,effects_list:!0,speed:!0,intensity:!0,white_mode:"auto",force_features:!1,show_slider_percent:!1,full_width_sliders:!1,color_temp_in_kelvin:!1,transition:0,brightness_icon:"weather-sunny",white_icon:"file-word-box",warm_white_icon:"weather-sunset",temperature_icon:"thermometer",speed_icon:"speedometer",intensity_icon:"transit-connection-horizontal"},ft=o`
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
  
  mwc-select {
    width: 100%;
  }

  .checkbox-options ha-formfield,
  .entities mwc-switch,
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
`,ut=(t,e)=>t.reduce((t,i)=>(i.defineId?t[i.defineId]=i:i.promise.then(t=>{void 0===e.registry.get(i.name)&&e.registry.define(i.name,t)}),t),{}),_t=t=>({name:t,promise:customElements.whenDefined(t).then(()=>customElements.get(t))}),pt=(t,e,i={},s={})=>{const r=new Event(e,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});return r.detail=i,t.dispatchEvent(r),r};class mt extends(lt(ht)){static get elementDefinitions(){return ut([_t("ha-checkbox"),_t("ha-formfield"),_t("ha-form-string"),_t("ha-select"),_t("mwc-list-item")],mt)}static get styles(){return ft}static get properties(){return{hass:{},_config:{}}}setConfig(t){this._config={...gt,...t}}get entityOptions(){const t=Object.keys(this.hass.states).filter(t=>["switch","light","group"].includes(t.split(".")[0]));return t.sort(),t}firstUpdated(){this._firstRendered=!0}render(){if(!this.hass||!this._config)return F``;let{header:t}=this._config;if(!t&&this._config.entity){let e=this._config.entity.split(".")[1]||"";e&&(e=e.charAt(0).toUpperCase()+e.slice(1),t=e)}const e=this.entityOptions.map(t=>F`<mwc-list-item value="${t}" ?selected=${t===this._config.entity}>${t}</mwc-list-item>`);return F`
      <div class="card-config">

        <div class='overall-config'>
          <ha-form-string
            .schema=${{name:"header",type:"string"}}
            label="Header"
            .data="${t}"
            .configValue="${"header"}"
            @changed="${this.configChanged}"
          ></ha-form-string>
        </div>

        <div class='entities'>
          <ha-select
            label="Entity"
            @selected="${this.configChanged}" 
            @closed="${t=>t.stopPropagation()}" 
            .configValue="${"entity"}"
          >
            ${e}
          </ha-select>
          <ha-form-string
            .schema=${{name:"brightness_icon",type:"string"}}
            label="Brightness Icon"
            .data="${this._config.brightness_icon}"
            .configValue="${"brightness_icon"}"
            @changed="${this.configChanged}"
          ></ha-form-string>
        </div>

        <div class='entities'>
         <ha-form-string
           .schema=${{name:"white_icon",type:"string"}}
           label="White Icon"
            .data="${this._config.white_icon}"
            .configValue="${"white_icon"}"
            @changed="${this.configChanged}"
          ></ha-form-string>
          <ha-form-string
            .schema=${{name:"warm_white_icon",type:"string"}}
            label="Warm White Icon"
            .data="${this._config.warm_white_icon}"
            .configValue="${"warm_white_icon"}"
            @changed="${this.configChanged}"
          ></ha-form-string>
        </div>

        <div class='entities'>
          <ha-form-string
            .schema=${{name:"temperature_icon",type:"string"}}
            label="Temperature Icon"
            .data="${this._config.temperature_icon}"
            .configValue="${"temperature_icon"}"
            @changed="${this.configChanged}"
          ></ha-form-string>
          <ha-form-string
            .schema=${{name:"transition",type:"string"}}
            label="Transition (seconds)"
            .data="${String(this._config.transition||"")}"
            .configValue="${"transition"}"
            @changed="${this.configChanged}"
          ></ha-form-string>
        </div>

        <div class='overall-config'>
          <div class='checkbox-options'>
            <ha-formfield label="Shorten Cards">
              <ha-checkbox
                @change="${this.checkboxConfigChanged}"
                .checked=${this._config.shorten_cards}
                .value="${"shorten_cards"}"
              ></ha-checkbox>
            </ha-formfield>
            </div>

            <div class='checkbox-options'>
              <ha-formfield label="Persist Features">
                <ha-checkbox
                  @change="${this.checkboxConfigChanged}"
                  .checked=${this._config.persist_features}
                  .value="${"persist_features"}"
                ></ha-checkbox>
              </ha-formfield>
              <ha-formfield label="Show Brightness">
                <ha-checkbox
                  @change="${this.checkboxConfigChanged}"
                  .checked=${this._config.brightness}
                  .value="${"brightness"}"
                ></ha-checkbox>
              </ha-formfield>
            </div>

            <div class='checkbox-options'>
              <ha-formfield label="Show Color Temp">
                <ha-checkbox
                  @change="${this.checkboxConfigChanged}"
                  .checked=${this._config.color_temp}
                  .value="${"color_temp"}"
                ></ha-checkbox>
              </ha-formfield>
              <ha-formfield label="Color Temp in Kelvin">
                <ha-checkbox
                  @change="${this.checkboxConfigChanged}"
                  .checked=${this._config.color_temp_in_kelvin}
                  .value="${"color_temp_in_kelvin"}"
                ></ha-checkbox>
              </ha-formfield>
            </div>

            <div class='checkbox-options'>
              <ha-formfield label="Show White Channel">
                <ha-checkbox
                  @change="${this.checkboxConfigChanged}"
                  .checked=${this._config.white_value}
                  .value="${"white_value"}"
                ></ha-checkbox>
              </ha-formfield>
            </div>

            <div class='checkbox-options'>
              <ha-formfield label="Show Warm White">
                <ha-checkbox
                  @change="${this.checkboxConfigChanged}"
                  .checked=${this._config.warm_white_value}
                  .value="${"warm_white_value"}"
                ></ha-checkbox>
              </ha-formfield>
            </div>

            <div class='checkbox-options'>
              <ha-formfield label="Show Speed">
                <ha-checkbox
                  @change="${this.checkboxConfigChanged}"
                  .checked=${this._config.speed}
                  .value="${"speed"}"
                ></ha-checkbox>
              </ha-formfield>
              <ha-formfield label="Show Intensity">
                <ha-checkbox
                  @change="${this.checkboxConfigChanged}"
                  .checked=${this._config.intensity}
                  .value="${"intensity"}"
                ></ha-checkbox>
              </ha-formfield>
            </div>

            <div class='checkbox-options'>
              <ha-formfield label="Show Color Picker">
                <ha-checkbox
                  @change="${this.checkboxConfigChanged}"
                  .checked=${this._config.color_picker}
                  .value="${"color_picker"}"
                ></ha-checkbox>
              </ha-formfield>
              <ha-formfield label="Show Effects List">
                <ha-checkbox
                  @change="${this.checkboxConfigChanged}"
                  .checked=${this._config.effects_list}
                  .value="${"effects_list"}"
                ></ha-checkbox>
              </ha-formfield>
            </div>

            <div class='checkbox-options'>
              <ha-formfield label="Full Width Sliders">
                <ha-checkbox
                  @change="${this.checkboxConfigChanged}"
                  .checked=${this._config.full_width_sliders}
                  .value="${"full_width_sliders"}"
                ></ha-checkbox>
              </ha-formfield>
              <ha-formfield label="Show Slider Percent">
                <ha-checkbox
                  @change="${this.checkboxConfigChanged}"
                  .checked=${this._config.show_slider_percent}
                  .value="${"show_slider_percent"}"
                ></ha-checkbox>
              </ha-formfield>
            </div>

            <div class='checkbox-options'>
              <ha-formfield label="Show Brightness %">
                <ha-checkbox
                  @change="${this.checkboxConfigChanged}"
                  .checked=${this._config.show_brightness_percent}
                  .value="${"show_brightness_percent"}"
                ></ha-checkbox>
              </ha-formfield>
              <ha-formfield label="Show Color Temp %">
                <ha-checkbox
                  @change="${this.checkboxConfigChanged}"
                  .checked=${this._config.show_color_temp_percent}
                  .value="${"show_color_temp_percent"}"
                ></ha-checkbox>
              </ha-formfield>
            </div>

            <div class='checkbox-options'>
              <ha-formfield label="Hide Header">
                <ha-checkbox
                  @change="${this.checkboxConfigChanged}"
                  .checked=${this._config.hide_header}
                  .value="${"hide_header"}"
                ></ha-checkbox>
              </ha-formfield>
              <ha-formfield label="Show Header Icon">
                <ha-checkbox
                  @change="${this.checkboxConfigChanged}"
                  .checked=${this._config.show_header_icon}
                  .value="${"show_header_icon"}"
                ></ha-checkbox>
              </ha-formfield>
              <ha-formfield label="Child Card">
                <ha-checkbox
                  @change="${this.checkboxConfigChanged}"
                  .checked=${this._config.child_card}
                  .value="${"child_card"}"
                ></ha-checkbox>
              </ha-formfield>
            </div>

            <div class='checkbox-options'>
              <ha-formfield label="Force Features">
                <ha-checkbox
                  @change="${this.checkboxConfigChanged}"
                  .checked=${this._config.force_features}
                  .value="${"force_features"}"
                ></ha-checkbox>
              </ha-formfield>
            </div>

            <div class='checkbox-options'>
            <ha-formfield label="Consolidate Entities">
              <ha-checkbox
                @change="${this.checkboxConfigChanged}"
                .checked=${this._config.consolidate_entities}
                .value="${"consolidate_entities"}"
              ></ha-checkbox>
            </ha-formfield>
          </div>
          </div>

          <div class='entities'>
            <ha-select
              label="White Mode"
              @selected="${this.selectConfigChanged}"
              @closed="${t=>t.stopPropagation()}"
              .configValue="${"white_mode"}"
              .value="${this._config.white_mode||"auto"}"
            >
              <mwc-list-item value="auto">Auto (detect from entity)</mwc-list-item>
              <mwc-list-item value="range">Range (warm/cool slider)</mwc-list-item>
              <mwc-list-item value="fixed">Fixed (plain white)</mwc-list-item>
            </ha-select>
          </div>
      </div>
    `}configChanged(t){if(!this._config||!this.hass||!this._firstRendered)return;const{target:{configValue:e,value:i},detail:{value:s}}=t;this._config=null!=s?{...this._config,[e]:s}:{...this._config,[e]:i},pt(this,"config-changed",{config:this._config})}checkboxConfigChanged(t){if(!this._config||!this.hass||!this._firstRendered)return;const{target:{value:e,checked:i}}=t;this._config={...this._config,[e]:i},pt(this,"config-changed",{config:this._config})}selectConfigChanged(t){if(!this._config||!this.hass||!this._firstRendered)return;const{configValue:e}=t.target,i=t.target.value;e&&i&&(this._config={...this._config,[e]:i},pt(this,"config-changed",{config:this._config}))}}const bt=254,$t=1e6,vt=[255,255,255],yt="rgb-light-controller-editor";customElements.define(yt,mt);class wt extends(lt(ht)){static get elementDefinitions(){return ut([_t("ha-card"),_t("more-info-light"),_t("ha-switch"),_t("ha-icon"),_t("state-badge"),_t("ha-slider"),_t("ha-hs-color-picker"),_t("ha-select"),_t("mwc-list-item")],wt)}static get properties(){return{hass:{},config:{},_colorPickerValues:{state:!0},_colorMode:{state:!0}}}async firstUpdated(){if(this._firstUpdate=!0,!1!==this.config.color_picker&&this.config.entity.startsWith("light.")&&!customElements.get("ha-hs-color-picker")){try{await Promise.race([customElements.whenDefined("ha-hs-color-picker"),new Promise((t,e)=>setTimeout(()=>e(new Error("timeout")),5e3))])}catch{}this.requestUpdate()}}setConfig(t){if(!t.entity)throw Error("entity required.");this.config={...gt,...t},void 0===this._colorMode&&(this._colorMode=null)}static async getConfigElement(){return document.createElement(yt)}static get featureNames(){return{brightness:1,colorTemp:2,effectList:4,color:16,whiteValue:128}}static get cmdToggle(){return{on:"turn_on",off:"turn_off"}}static get entityLength(){return{light:10,switch:1}}getCardSize(){if(!this.config||!this.hass||!this.hass.states[this.config.entity])return 1;let t=0;const e=this.hass.states[this.config.entity];return Array.isArray(e.attributes.entity_id)?e.attributes.entity_id.forEach(e=>t+=this.getEntityLength(e)):t+=this.getEntityLength(e.attributes.entity_id),this.config.group&&(t*=.8),parseInt(t,10)}getEntityLength(t){return/^light\./.test(t)?wt.entityLength.light:/^switch\./.test(t)?wt.entityLength.switch:0}static get styles(){return dt}isEntityOn(t){return"on"===t.state}render(){const t=this.hass.states[this.config.entity];if(!t)return F`
        <ha-card> ${`Invalid entity: ${this.config.entity}`} </ha-card>
      `;this._stateObjects=this.getEntitiesToShow(t),this.config.consolidate_entities?this._shownStateObjects=[t]:this._shownStateObjects=[...this._stateObjects];const e=this._shownStateObjects.reduce((t,e)=>F`${t}${this.createEntityTemplate(e)}`,""),i=`light-entity-card ${this.config.shorten_cards?" group":""} ${this.config.child_card?" light-entity-child-card":""}`;return F`
      <ha-card class="${i}">
        ${e}
      </ha-card>
    `}getEntitiesToShow(t){return t.attributes.entity_id&&Array.isArray(t.attributes.entity_id)?t.attributes.entity_id.map(t=>this.hass.states[t]).filter(Boolean):[t]}createEntityTemplate(t){if(!t||!t.attributes)return F``;const e=this.config.full_width_sliders?"ha-slider-full-width":"",i=this._supportsRgb(t),s=this._supportsWhite(t),r=i&&s;null===this._colorMode&&r?this._colorMode=this._detectColorMode(t):null===this._colorMode&&(this._colorMode=i?"rgb":"white");const o=!r||"rgb"===this._colorMode,n=!r||"white"===this._colorMode,c=this._isFixedWhite(t);return F`
      ${this.createHeader(t)}
      ${r?this._createModeToggle(t):""}
      <div class="light-entity-card-sliders ${e}">
        ${this.createBrightnessSlider(t)}
        ${this.createSpeedSlider(t)}
        ${this.createIntensitySlider(t)}
        ${n&&!c?this.createColorTemperature(t):""}
        ${n?this.createWhiteValue(t):""}
        ${n&&!c?this.createWarmWhiteValue(t):""}
      </div>
      ${o?this.createColorPicker(t):""}
      ${this.createEffectList(t)}
    `}_detectColorMode(t){const e=t.attributes.color_mode;return["color_temp","white"].includes(e)?"white":"rgb"}_supportsRgb(t){return(t.attributes.supported_color_modes||[]).some(t=>["hs","rgb","rgbw","rgbww","xy"].includes(t))}_supportsWhite(t){return(t.attributes.supported_color_modes||[]).some(t=>["color_temp","white"].includes(t))}_isFixedWhite(t){const e=this.config.white_mode;if("fixed"===e)return!0;if("range"===e)return!1;const i=t.attributes.supported_color_modes||[],s=i.includes("color_temp"),r=i.includes("rgbww");if(!s&&!r)return!0;const o=t.attributes.min_color_temp_kelvin,n=t.attributes.max_color_temp_kelvin;return!!(s&&o&&n&&Math.abs(n-o)<100)}_switchColorMode(t,e){if(this._colorMode!==t&&(this._colorMode=t,this.isEntityOn(e)))if("white"===t)if(this._isFixedWhite(e)){const t=this.getWhiteValue(e,3)||255,i=e.attributes.supported_color_modes||[];i.includes("white")?this.callEntityService({white:t},e):i.includes("rgbw")?this.callEntityService({rgbw_color:[255,255,255,t]},e):this.callEntityService({color_temp_kelvin:4e3},e)}else{const t=this._getColorTempRange(e);if(t){const i=t.kelvin??Math.round((t.minK+t.maxK)/2);t.usesKelvin?this.callEntityService({color_temp_kelvin:i},e):this.callEntityService({color_temp:Math.round($t/i)},e)}}else{const t=e.attributes.hs_color||[0,100];this.callEntityService({hs_color:t},e)}}_createModeToggle(t){return F`
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
    `}createHeader(t){if(this.config.hide_header)return F``;const e=this.config.header||t.attributes.friendly_name||t.entity_id;return F`
      <div class="light-entity-card__header">
        ${this.showHeaderIcon(t)}
        <div class="light-entity-card__title">${e}</div>
        <div class="light-entity-card-toggle">
          <ha-switch
            .checked=${this.isEntityOn(t)}
            @change=${e=>this.setToggle(e,t)}
            aria-label="Toggle ${e}"
          ></ha-switch>
        </div>
      </div>
    `}showHeaderIcon(t){return this.config.show_header_icon?F`
      <div class="icon-container">
        <state-badge .stateObj=${t}></state-badge>
      </div>
    `:F``}createBrightnessSlider(t){return!1===this.config.brightness||this.dontShowFeature("brightness",t)?F``:F`
      <div class="control light-entity-card-center">
        <div class="icon-container" title="Brightness">
          <ha-icon icon="hass:${this.config.brightness_icon}"></ha-icon>
        </div>
        <ha-slider
          .value="${t.attributes.brightness??0}"
          @change="${e=>this._setValue(e,t,"brightness")}"
          min="${1}"
          max="${255}"
          aria-label="Brightness"
        ></ha-slider>
        ${this.showPercent(t.attributes.brightness,0,254,"brightness")}
      </div>
    `}createSpeedSlider(t){return!1===this.config.speed||this.dontShowFeature("speed",t)?F``:F`
      <div class="control light-entity-card-center">
        <div class="icon-container" title="Speed">
          <ha-icon icon="hass:${this.config.speed_icon}"></ha-icon>
        </div>
        <ha-slider
          .value="${t.attributes.speed??0}"
          @change="${e=>this._setValue(e,t,"speed")}"
          min="${1}"
          max="${255}"
          aria-label="Speed"
        ></ha-slider>
        ${this.showPercent(t.attributes.speed,0,bt)}
      </div>
    `}createIntensitySlider(t){return!1===this.config.intensity||this.dontShowFeature("intensity",t)?F``:F`
      <div class="control light-entity-card-center">
        <div class="icon-container" title="Intensity">
          <ha-icon icon="hass:${this.config.intensity_icon}"></ha-icon>
        </div>
        <ha-slider
          .value="${t.attributes.intensity??0}"
          @change="${e=>this._setValue(e,t,"intensity")}"
          min="${1}"
          max="${255}"
          aria-label="Intensity"
        ></ha-slider>
        ${this.showPercent(t.attributes.intensity,0,bt)}
      </div>
    `}showPercent(t,e,i,s){if("brightness"===s&&void 0!==this.config.show_brightness_percent){if(!this.config.show_brightness_percent)return F``}else if("color_temp"===s&&void 0!==this.config.show_color_temp_percent){if(!this.config.show_color_temp_percent)return F``}else if("color_temp"===s&&this.config.color_temp_in_kelvin);else if(!this.config.show_slider_percent)return F``;if("color_temp"===s&&this.config.color_temp_in_kelvin)return F` <div class="percent-slider">${t}K</div> `;let r=parseInt(100*(t-e)/(i-e),10);return isNaN(r)&&(r=0),F` <div class="percent-slider">${r}%</div> `}_getColorTempRange(t){const e=void 0!==t.attributes.min_color_temp_kelvin;let i,s,r,o,n;if(e){if(i=t.attributes.color_temp_kelvin,s=t.attributes.min_color_temp_kelvin,r=t.attributes.max_color_temp_kelvin,!s||!r)return null;o=Math.round($t/r),n=Math.round($t/s)}else{if(o=t.attributes.min_mireds,n=t.attributes.max_mireds,!o||!n)return null;i=t.attributes.color_temp?Math.round($t/t.attributes.color_temp):null,s=Math.round($t/n),r=Math.round($t/o)}return{usesKelvin:e,kelvin:"number"==typeof i&&Number.isFinite(i)&&i>0?i:null,minK:s,maxK:r,minMired:o,maxMired:n}}createColorTemperature(t){if(!1===this.config.color_temp)return F``;if(this.dontShowFeature("colorTemp",t))return F``;const e=this._getColorTempRange(t);if(!e)return F``;const{usesKelvin:i,kelvin:s,minK:r,maxK:o,minMired:n,maxMired:c}=e;let h,a,l,d,g;if(this.config.color_temp_in_kelvin)h=r,a=o,l=s??Math.round((r+o)/2),d="light-entity-card-color_temp light-entity-card-color_temp--kelvin",g=e=>this._setColorTemp(e,t,i,!0);else{const e=c-n,r=s?Math.round($t/s):null;h=0,a=100,l=e>0&&null!==r?Math.round((r-n)/e*100):50,d="light-entity-card-color_temp",g=e=>this._setColorTemp(e,t,i,!1,n,c)}const f=this.showPercent(l,h,a,"color_temp");return F`
      <div class="control light-entity-card-center">
        <div class="icon-container" title="Color Temperature">
          <ha-icon icon="hass:${this.config.temperature_icon}"></ha-icon>
        </div>
        <ha-slider
          class="${d}"
          min="${h}"
          max="${a}"
          .value=${l}
          @change="${g}"
          aria-label="Color temperature"
        >
        </ha-slider>
        ${f}
      </div>
    `}getWhiteValue(t,e=3){const i=t.attributes.rgbw_color,s=t.attributes.rgbww_color;return i&&3===e?i[3]??0:s&&e<s.length?s[e]??0:3===e&&void 0!==t.attributes.white_value?t.attributes.white_value??0:0}createWhiteValue(t){if(!1===this.config.white_value)return F``;if(this.dontShowFeature("whiteValue",t))return F``;const e=this.getWhiteValue(t,3);return F`
      <div class="control light-entity-card-center">
        <div class="icon-container" title="White">
          <ha-icon icon="hass:${this.config.white_icon}"></ha-icon>
        </div>
        <ha-slider
          max="255"
          .value="${e}"
          @change="${e=>this._setWhiteValue(e,t,3)}"
          aria-label="White value"
        >
        </ha-slider>
        ${this.showPercent(e,0,bt)}
      </div>
    `}createWarmWhiteValue(t){if(!1===this.config.warm_white_value)return F``;if(this.dontShowFeature("warmWhiteValue",t))return F``;const e=this.getWhiteValue(t,4);return F`
      <div class="control light-entity-card-center">
        <div class="icon-container" title="Warm White">
          <ha-icon icon="hass:${this.config.warm_white_icon}"></ha-icon>
        </div>
        <ha-slider
          max="255"
          .value="${e}"
          @change="${e=>this._setWhiteValue(e,t,4)}"
          aria-label="Warm white value"
        >
        </ha-slider>
        ${this.showPercent(e,0,bt)}
      </div>
    `}_setWhiteValue(t,e,i){const s=parseInt(t.target.value,10);if(isNaN(s))return;const r=e.attributes.supported_color_modes||[],o=e.attributes.rgbw_color,n=e.attributes.rgbww_color;if(r.includes("rgbw")&&3===i){const t=o?o.slice(0,3):e.attributes.rgb_color||vt;this.callEntityService({rgbw_color:[t[0],t[1],t[2],s]},e)}else if(r.includes("rgbww")){let t;if(n)t=n;else if(o)t=[o[0],o[1],o[2],o[3],0];else{const i=e.attributes.rgb_color||vt;t=[i[0],i[1],i[2],0,0]}const r=[...t];r[i]=s,this.callEntityService({rgbww_color:r},e)}else this.callEntityService({white_value:s},e)}createEffectList(t){if(!1===this.config.effects_list)return F``;if(!this.config.persist_features&&!this.isEntityOn(t))return F``;let e=t.attributes.effect_list||[];if(this.config.effects_list&&Array.isArray(this.config.effects_list))e=this.config.effects_list;else if(this.config.effects_list&&this.hass.states[this.config.effects_list]){const t=this.hass.states[this.config.effects_list];e=t.attributes&&t.attributes.options||[]}else if(this.dontShowFeature("effectList",t))return F``;const i=e.map(e=>this.createListItem(t,e)),s=this.hass.localize("ui.card.light.effect")||"Effect";return F`
      <div class="control light-entity-card-center light-entity-card-effectlist">
        <ha-select 
          @closed="${t=>t.stopPropagation()}" 
          @selected=${e=>this.setEffect(e,t)} 
          label="${s}" 
        >
          ${i}
        </ha-select>
      </div>
    `}createListItem(t,e){return F`<mwc-list-item value="${e}" ?selected=${e===t.attributes.effect}
      >${e}</mwc-list-item
    >`}createColorPicker(t){if(!1===this.config.color_picker)return F``;if(this.config.force_features);else{const e=t.attributes.supported_color_modes||[];if(!(wt.featureNames.color&t.attributes.supported_features||e.some(t=>["hs","rgb","rgbw","rgbww","xy"].includes(t))))return F``}const e=t.attributes.hs_color||[0,0],i=this._colorPickerValues&&this._colorPickerValues[t.entity_id]||[e[0],e[1]/100];return F`
      <div class="light-entity-card__color-picker">
        <ha-hs-color-picker
          .value=${i}
          @cursor-moved=${e=>{this._colorPickerValues={...this._colorPickerValues,[t.entity_id]:e.detail.value}}}
          @value-changed=${e=>this._onColorPickerChanged(e.detail.value,t)}
        ></ha-hs-color-picker>
      </div>
    `}dontShowFeature(t,e){if(this.config.force_features)return!1;if("speed"===t&&"speed"in e.attributes)return!1;if("intensity"===t&&"intensity"in e.attributes)return!1;let i=wt.featureNames[t]&e.attributes.supported_features;const s=e.attributes.supported_color_modes||[];if(!i)switch(t){case"brightness":i="brightness"in e.attributes||s.some(t=>["hs","rgb","rgbw","rgbww","white","brightness","color_temp","xy"].includes(t));break;case"colorTemp":i=s.some(t=>"color_temp"===t);break;case"effectList":i=e.attributes.effect_list&&e.attributes.effect_list.length>0;break;case"color":i=s.some(t=>["hs","rgb","rgbw","rgbww","xy"].includes(t));break;case"whiteValue":i="white_value"in e.attributes||s.some(t=>["rgbw","rgbww"].includes(t));break;case"warmWhiteValue":i=s.some(t=>"rgbww"===t);break;default:i=!1}return!i||!this.config.persist_features&&!this.isEntityOn(e)}_onColorPickerChanged(t,e){if(this._colorPickerValues){const{[e.entity_id]:t,...i}=this._colorPickerValues;this._colorPickerValues=i}this.setColorPicker(t,e)}setColorPicker(t,e){t&&this.callEntityService({hs_color:[t[0],100*t[1]]},e)}_setValue(t,e,i){const s=parseInt(t.target.value,10);isNaN(s)||parseInt(e.attributes[i],10)===s||this.callEntityService({[i]:s},e)}_setColorTemp(t,e,i,s,r,o){const n=parseInt(t.target.value,10);if(!isNaN(n))if(s)if(i){if(n===parseInt(e.attributes.color_temp_kelvin,10))return;this.callEntityService({color_temp_kelvin:n},e)}else{const t=Math.round($t/n);if(t===parseInt(e.attributes.color_temp,10))return;this.callEntityService({color_temp:t},e)}else{if(!Number.isFinite(r)||!Number.isFinite(o)||o<=r)return;const t=Math.round(r+n/100*(o-r));if(i){const i=Math.round($t/t);if(i===parseInt(e.attributes.color_temp_kelvin,10))return;this.callEntityService({color_temp_kelvin:i},e)}else{if(t===parseInt(e.attributes.color_temp,10))return;this.callEntityService({color_temp:t},e)}}}setToggle(t,e){const i=this.isEntityOn(e)?wt.cmdToggle.off:wt.cmdToggle.on;this.callEntityService({},e,i)}setEffect(t,e){t.target.value&&this.callEntityService({effect:t.target.value},e)}callEntityService(t,e,i){if(!this._firstUpdate)return;let s=e.entity_id.split(".")[0];"group"===s&&(s="homeassistant");const r=parseFloat(this.config.transition)||0;r>0&&"light"===s&&(t={...t,transition:r}),this.hass.callService(s,i||wt.cmdToggle.on,{entity_id:e.entity_id,...t})}}customElements.define("rgb-light-controller",wt),window.customCards=window.customCards||[],window.customCards.push({type:"rgb-light-controller",name:"RGB Light Controller",description:"Control lights and switches"})})();