import qsa from './qsa';

/**
 * Get an array of elements from a mixed-value parameter.
 * Accepts Strings, Elements, and Array-like values.
 * @param  {String|Element|Array}  elements
 * @param  {Element}  context
 * @return {Array}
 */
export default function getElements(elements, context) {
  // 1. If value is a String, query the DOM
  if (typeof elements === 'string') {
    return qsa(elements, context);
  }

  // 2. Put single element in an Array
  if (elements instanceof Element) {
    return [elements];
  }

  // 3. Assume everything can be treated like an Array
  if (elements) {
    return Array.prototype.slice.call(elements);
  }

  // 4. Otherwise, fallback to an empty array
  return [];
}
