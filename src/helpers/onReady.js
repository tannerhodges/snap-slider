/**
 * Wait to run a function on DOMContentLoaded, or fire immediately if the
 * event has already fired.
 * @param  {Function} fn
 * @return {void}
 */
export default function onReady(fn) {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}
