// Dev entry point: order matters!
// 1. Scoped registry polyfill (patches customElements)
import '@webcomponents/scoped-custom-element-registry';
// 2. Mock HA elements (must register after polyfill)
import './mock-elements';
// 3. The card itself
import '../index';
