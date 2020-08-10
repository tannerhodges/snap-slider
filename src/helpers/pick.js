/**
 * Pick keys from an object.
 * @param  {Object} obj
 * @param  {Array}  keys
 * @return {Object}
 */
export default function pick(obj, keys) {
  return keys.reduce((result, key) => {
    result[key] = obj[key];

    return result;
  }, {});
}
