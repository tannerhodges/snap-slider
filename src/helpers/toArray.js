/**
 * Convert a value to an array.
 * @param  {mixed}   val
 * @return {Array}
 */
export default function toArray(val) {
  return Array.prototype.slice.call(val);
}
