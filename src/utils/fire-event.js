/**
 * Dispatches a custom event.
 *
 * @param {HTMLElement} node Target element.
 * @param {string} type Event name.
 * @param {*} [detail={}] Event detail payload.
 * @param {{ bubbles?: boolean, cancelable?: boolean, composed?: boolean }} [options={}]
 * @return {Event}
 */
export const fireEvent = (node, type, detail = {}, options = {}) => {
  const event = new Event(type, {
    bubbles: options.bubbles !== undefined ? options.bubbles : true,
    cancelable: Boolean(options.cancelable),
    composed: options.composed !== undefined ? options.composed : true,
  });

  event.detail = detail;
  node.dispatchEvent(event);
  return event;
};
