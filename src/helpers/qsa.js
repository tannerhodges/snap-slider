import toArray from './toArray';

/**
 * QSA = "Query Selector All" that returns an Array instead of a NodeList.
 * @param  {String}   selector
 * @param  {Element}  context
 * @return {Array}
 */
export default function qsa(selector, context) {
  return selector ? toArray((context || document).querySelectorAll(selector)) : [];
}
