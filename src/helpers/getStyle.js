import hasOwnProperty from './hasOwnProperty';

/**
 * Get a computed style for some element.
 * @param  {Element}  el
 * @param  {String}   prop
 * @return {String}
 */
export default function getStyle(el, prop) {
  const style = window.getComputedStyle(el);

  // Ignore mmissing elements or props
  if (!style || !hasOwnProperty(style, prop)) {
    return '';
  }

  return style[prop];
}
