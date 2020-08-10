/**
 * Strict check for Objects. Literally checks whether
 * the value's constructor is "Object".
 * @param  {mixed}  val
 * @return {String}
 */
export default function isObject(val) {
  return val && val.constructor.name === 'Object';
}
