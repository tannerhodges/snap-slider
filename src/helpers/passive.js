/* eslint-disable getter-return */

/**
 * Passive Event Listeners.
 *
 * Pass this value as a 3rd argument to your event listeners
 * to dramatically improve performance.
 *
 * @see https://developers.google.com/web/updates/2016/06/passive-event-listeners
 * @see https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection
 * @type {Boolean}
 */
const passive = (() => {
  let result = false;

  try {
    const opts = Object.defineProperty({}, 'passive', {
      get: function get() {
        result = { passive: true };
      },
    });
    window.addEventListener('testPassive', null, opts);
    window.removeEventListener('testPassive', null, opts);
  } catch (error) {
    // 🤫
  }

  return result;
})();

export default passive;
