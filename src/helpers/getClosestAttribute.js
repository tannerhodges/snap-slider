/**
 * Get an attribute for the closest element with it.
 * @param  {Element}  el
 * @param  {String}  attr
 * @return {String}
 */
export default function getClosestAttribute(el, attr) {
  // Ignore missing elements
  if (!el) {
    return '';
  }

  // Find the closest element with a mattring attribute
  el = el.closest(`[${attr}]`);

  // If we found a match, return the attribute, otherwise
  // return an empty string.
  return el ? el.getAttribute(attr) : '';
}
