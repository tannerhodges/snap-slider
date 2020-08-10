/* eslint-disable no-restricted-syntax, no-var, vars-on-top */

import hasOwnProperty from './hasOwnProperty';

/**
 * Helper that does the same thing as `Object.values()`. Works in IE!
 * @param  {Object}  obj
 * @return {Array}
 */
function values(obj) {
  var arr = [];

  for (var prop in obj) {
    if (hasOwnProperty(obj, prop)) {
      arr.push(obj[prop]);
    }
  }

  return arr;
}

// Use native code if supported, else return polyfill.
// eslint-disable-next-line no-confusing-arrow
const fn = (() => typeof Object.values === 'function' ? Object.values : values)();

export default fn;
