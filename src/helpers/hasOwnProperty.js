/**
 * Check whether an object actually has a property.
 * @param  {Object} obj
 * @param  {String} prop
 * @return {Boolean}
 */
export default function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}
