(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["SnapSlider"] = factory();
	else
		root["SnapSlider"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(2),
    now = __webpack_require__(3),
    toNumber = __webpack_require__(6);

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

module.exports = debounce;


/***/ }),
/* 2 */
/***/ ((module) => {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),
/* 3 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var root = __webpack_require__(4);

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

module.exports = now;


/***/ }),
/* 4 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var freeGlobal = __webpack_require__(5);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),
/* 5 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;

module.exports = freeGlobal;


/***/ }),
/* 6 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseTrim = __webpack_require__(7),
    isObject = __webpack_require__(2),
    isSymbol = __webpack_require__(9);

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;


/***/ }),
/* 7 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var trimmedEndIndex = __webpack_require__(8);

/** Used to match leading whitespace. */
var reTrimStart = /^\s+/;

/**
 * The base implementation of `_.trim`.
 *
 * @private
 * @param {string} string The string to trim.
 * @returns {string} Returns the trimmed string.
 */
function baseTrim(string) {
  return string
    ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '')
    : string;
}

module.exports = baseTrim;


/***/ }),
/* 8 */
/***/ ((module) => {

/** Used to match a single whitespace character. */
var reWhitespace = /\s/;

/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
 * character of `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the index of the last non-whitespace character.
 */
function trimmedEndIndex(string) {
  var index = string.length;

  while (index-- && reWhitespace.test(string.charAt(index))) {}
  return index;
}

module.exports = trimmedEndIndex;


/***/ }),
/* 9 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(10),
    isObjectLike = __webpack_require__(14);

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ }),
/* 10 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(11),
    getRawTag = __webpack_require__(12),
    objectToString = __webpack_require__(13);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),
/* 11 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var root = __webpack_require__(4);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),
/* 12 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(11);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),
/* 13 */
/***/ ((module) => {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),
/* 14 */
/***/ ((module) => {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getElements)
/* harmony export */ });
/* harmony import */ var _qsa__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(16);

/**
 * Get an array of elements from a mixed-value parameter.
 * Accepts Strings, Elements, and Array-like values.
 * @param  {String|Element|Array}  elements
 * @param  {Element}  context
 * @return {Array}
 */

function getElements(elements, context) {
  // 1. If value is a String, query the DOM
  if (typeof elements === 'string') {
    return (0,_qsa__WEBPACK_IMPORTED_MODULE_0__["default"])(elements, context);
  } // 2. Put single element in an Array


  if (elements instanceof Element) {
    return [elements];
  } // 3. Assume everything can be treated like an Array


  if (elements) {
    return Array.prototype.slice.call(elements);
  } // 4. Otherwise, fallback to an empty array


  return [];
}

/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ qsa)
/* harmony export */ });
/* harmony import */ var _toArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(17);

/**
 * QSA = "Query Selector All" that returns an Array instead of a NodeList.
 * @param  {String}   selector
 * @param  {Element}  context
 * @return {Array}
 */

function qsa(selector, context) {
  return selector ? (0,_toArray__WEBPACK_IMPORTED_MODULE_0__["default"])((context || document).querySelectorAll(selector)) : [];
}

/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toArray)
/* harmony export */ });
/**
 * Convert a value to an array.
 * @param  {mixed}   val
 * @return {Array}
 */
function toArray(val) {
  return Array.prototype.slice.call(val);
}

/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getStyle)
/* harmony export */ });
/* harmony import */ var _hasOwnProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);

/**
 * Get a computed style for some element.
 * @param  {Element}  el
 * @param  {String}   prop
 * @return {String}
 */

function getStyle(el, prop) {
  var style = window.getComputedStyle(el); // Ignore mmissing elements or props

  if (!style || !(0,_hasOwnProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(style, prop)) {
    return '';
  }

  return style[prop];
}

/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ hasOwnProperty)
/* harmony export */ });
/**
 * Check whether an object actually has a property.
 * @param  {Object} obj
 * @param  {String} prop
 * @return {Boolean}
 */
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ minmax)
/* harmony export */ });
/**
 * Keep a value within some minimum and maximum values.
 * @param  {Number}  value
 * @param  {Number}  min
 * @param  {Number}  max
 * @return {Number}
 */
function minmax(value, min, max) {
  value = Math.min(max, value);
  value = Math.max(min, value);
  return value;
}

/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ on)
/* harmony export */ });
/* eslint-disable consistent-return, func-names, no-var, prefer-arrow-callback, vars-on-top */

/**
 * Plain JavaScript event delegation. Add a handler for whenever an element's
 * children trigger a specified event.
 * @see https://bdadam.com/blog/plain-javascript-event-delegation.html
 * @param  {String}    parentSelector
 * @param  {String}    eventName
 * @param  {String}    childSelector
 * @param  {Function}  fn
 * @return {Boolean}
 */
function on(parentSelector, eventName, childSelector, fn) {
  var parent = document.querySelector(parentSelector);

  if (!parent) {
    return false;
  }

  parent.addEventListener(eventName, function (event) {
    var possibleTargets = parent.querySelectorAll(childSelector);
    var target = event.target;

    for (var i = 0, l = possibleTargets.length; i < l; i += 1) {
      var el = target;
      var p = possibleTargets[i];

      while (el && el !== parent) {
        if (el === p) {
          return fn.call(p, event);
        }

        el = el.parentNode;
      }
    }
  });
  return true;
} // Example:
// on('body', 'click', '.product', function(e) {
//   console.log(e.target);
// });

/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ onReady)
/* harmony export */ });
/**
 * Wait to run a function on DOMContentLoaded, or fire immediately if the
 * event has already fired.
 * @param  {Function} fn
 * @return {void}
 */
function onReady(fn) {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _helpers_getElements__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(15);
/* harmony import */ var _helpers_getStyle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18);
/* harmony import */ var _helpers_hasOwnProperty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(19);
/* harmony import */ var _helpers_minmax__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(20);
/* harmony import */ var _helpers_on__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(21);
/* harmony import */ var _helpers_onReady__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(22);
/* harmony import */ var _helpers_qsa__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(16);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// Dependencies
 // Helpers








var nextSliderNumber = 1;
/**
 * Snap Slider.
 * @class
 */

var SnapSlider = /*#__PURE__*/function () {
  /**
   * New Snap Slider.
   *
   * See `init()` for a full breakdown of `options`.
   *
   * @param  {String|Element|Array}  container
   * @param  {Object}                options
   * @constructor
   */
  function SnapSlider(container) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, SnapSlider);

    // Setup internal variables.

    /* eslint-disable quote-props */
    this.callbacks = {
      'load': [],
      'change': []
    };
    /* eslint-enable quote-props */
    // Init.

    this.init(container, options);
  }
  /**
   * Initialize this slider.
   *
   * @param  {String|Element|Array}  container
   * @param  {Object}                options
   * @param  {String}                options.id
   * @param  {String|Element|Array}  options.slides
   * @param  {String|Number}         options.start
   * @param  {String|Element|Array}  options.nav
   * @param  {String|Element|Array}  options.buttons
   * @param  {String|Element|Array}  options.prev
   * @param  {String|Element|Array}  options.next
   * @param  {Boolean}               options.loop
   * @param  {Object}                options.on
   * @return {void}
   */


  _createClass(SnapSlider, [{
    key: "init",
    value: function init(container) {
      var _this = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      // Fill default options.
      this.options = _objectSpread({
        container: container,
        id: '',
        slides: '',
        start: 0,
        nav: '',
        buttons: '',
        prev: '',
        next: '',
        loop: false,
        on: {}
      }, options); // Get container element.

      container = (0,_helpers_getElements__WEBPACK_IMPORTED_MODULE_1__["default"])(container).shift(); // Don't construct sliders with empty containers.

      if (!container) {
        if (true) {
          console.log("\n\uD83D\uDEAB Whoops! Snap Slider can't find a container element matching \"".concat(this.options.container, "\".\n\n\uD83D\uDD0D Please check your selectors for typos. Make sure the element actually exists\n   in the DOM when Snap Slider tries to initialize it.\n\n\uD83D\uDC47 Here's a copy of the options you tried to initialize with for debugging:\n\n"), this.options, '\n\n');
        }

        return;
      } // Great! Now let's start initializing everything.


      this.container = container; // Get selectors from JavaScript or data attributes.

      this.options.buttons = options.buttons || this.container.getAttribute('data-snap-slider-buttons');
      this.options.prev = options.prev || this.container.getAttribute('data-snap-slider-prev');
      this.options.next = options.next || this.container.getAttribute('data-snap-slider-next'); // Set slider ID.

      this.id = this.getMaybeSetID(this.container, this.options.id); // Get slides.

      this.slides = this.getMaybeSetSlides(this.container, this.options.slides); // Get navs.

      this.navs = (0,_helpers_qsa__WEBPACK_IMPORTED_MODULE_7__["default"])(["[data-snap-slider-nav=\"".concat(this.id, "\"]"), this.options.nav].filter(function (selector) {
        return selector;
      }).join(', ')).map(function (nav) {
        return _this.addNav(nav, {
          buttons: _this.options.buttons
        });
      }); // Get buttons.

      var buttonSelector = this.options.buttons || this.container.getAttribute('data-snap-slider-buttons');

      if (buttonSelector) {
        var buttons = (0,_helpers_qsa__WEBPACK_IMPORTED_MODULE_7__["default"])(buttonSelector, this.container);
        this.addGotoButtons(buttons);
      } // Keep track of buttons.


      this.buttons = this.getButtons(); // this.buttonsFirst = this.buttons.filter((button) => this.isRelative(button, 'first'));
      // this.buttonsMiddle = this.buttons.filter((button) => this.isRelative(button, 'middle'));
      // this.buttonsLast = this.buttons.filter((button) => this.isRelative(button, 'last'));

      this.buttonsPrev = this.buttons.filter(function (button) {
        return _this.isRelative(button, 'prev');
      });
      this.buttonsNext = this.buttons.filter(function (button) {
        return _this.isRelative(button, 'next');
      }); // Start.

      var start = this.options.start || this.container.getAttribute('data-snap-slider-start') || 1;
      this.current = this.getIndexNumber(start); // Loop.

      this.loop = this.options.loop || this.container.getAttribute('data-snap-slider-loop') === 'true'; // Callbacks.

      Object.entries(this.options.on).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            eventName = _ref2[0],
            callback = _ref2[1];

        _this.on(eventName, callback);
      }); // Events.

      this.maybeSetCurrentDebounce = lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default()(this.maybeSetCurrent.bind(this), 300); // Intersection Observer.
      // TODO: Make intersection observer configurable.

      this.intersectionObserver = new IntersectionObserver(this.intersectionCallback.bind(this), {
        root: this.container,
        threshold: 0.6
      });
      this.slides.forEach(function (slide) {
        return _this.intersectionObserver.observe(slide);
      }); // Resize Observer.

      this.resizeObserver = new ResizeObserver(this.resizeCallback.bind(this));
      this.resizeObserver.observe(this.container); // References.

      this.container.SnapSlider = this;
      window._SnapSliders[this.id] = this; // Go to the slide we want to start on.

      this.update();
    }
    /**
     * Get and maybe set a slider's ID on the closest container element.
     *
     * If no ID was specified, generates a fallback ID.
     *
     * @param  {Element}  container
     * @param  {String}   id
     * @return {String}
     */

  }, {
    key: "getMaybeSetID",
    value: function getMaybeSetID(container, id) {
      // Either use the ID we were given or the ID already on the container.
      id = id || container.getAttribute('data-snap-slider') || container.id; // If we don't have an ID, make one up and increment our internal
      // counter for the next slider.

      if (!id) {
        id = "slider-".concat(nextSliderNumber);
        nextSliderNumber += 1;
      } // Store value in data attribute.


      container.setAttribute('data-snap-slider', id); // Return the final ID.

      return id;
    }
    /**
     * Get all slide elements for a given container.
     *
     * Defaults to container's children.
     *
     * @param  {Element}  container
     * @param  {String}   selector
     * @return {Array}
     */

  }, {
    key: "getMaybeSetSlides",
    value: function getMaybeSetSlides(container, selector) {
      // Get selector from JavaScript or data attribute.
      selector = selector && typeof selector === 'string' ? selector : container.getAttribute('data-snap-slider-slides'); // Store value in data attribute.

      container.setAttribute('data-snap-slider-slides', selector || ''); // If selector exists, use those elements. Otherwise,
      // assume the container's immediate children are slides.

      var slides = selector ? (0,_helpers_getElements__WEBPACK_IMPORTED_MODULE_1__["default"])(selector, container) : _toConsumableArray(container.children); // Ensure all slides are focusable but not tabbable.

      slides.forEach(function (slide) {
        return slide.setAttribute('tabindex', '-1');
      }); // Return array of slides.

      return slides;
    }
    /**
     * Get a specific slide element. Accepts any valid goto alias.
     *
     * @param  {Number}   index  Starts at 1.
     * @return {Element}
     */

  }, {
    key: "getSlide",
    value: function getSlide(index) {
      // Convert index aliases to numbers.
      index = this.getIndexNumber(index); // Return the slide for that numeric index.
      // NOTE: Subtract 1 because the array is 0-index, but our API is 1-index.

      return this.slides[index - 1];
    }
    /**
     * Get the current slide element.
     *
     * @return {Element}
     */

  }, {
    key: "getCurrentSlide",
    value: function getCurrentSlide() {
      // NOTE: Subtract 1 because the array is 0-index, but our API is 1-index.
      return this.slides[this.current - 1];
    }
    /**
     * Get the slide number for any index.
     *
     * Returns -1 if index is invalid.
     *
     * @param  {String|Number}  index
     * @return {Number}
     */

  }, {
    key: "getIndexNumber",
    value: function getIndexNumber(index) {
      var num;

      if (index === 'first') {
        // Get the first slide.
        num = 1;
      } else if (index === 'middle') {
        // Get the middle slide.
        num = Math.ceil(this.slides.length / 2);
      } else if (index === 'last') {
        // Get the last slide.
        num = this.slides.length;
      } else if (index === 'prev') {
        // Get the previous slide.
        num = this.current - 1;
      } else if (index === 'next') {
        // Get the next slide.
        num = this.current + 1;
      } else {
        // Try to get a number.
        num = parseInt(index, 10) || -1;
      }

      if (this.loop) {
        // If we're looping, send out-of-bounds requests
        // to the other end of the slider.
        if (num < 1) {
          num = this.slides.length;
        }

        if (num > this.slides.length) {
          num = 1;
        }
      } else if (num < 1 || num > this.slides.length) {
        // Otherwise, ignore out-of-range indexes.
        num = -1;
      } // Return numeric index. Or, if something goes wrong,
      // fallback to the first slide.


      return num || 1;
    }
    /**
     * Get the `scroll-snap-align` for a snap slider element.
     *
     * Falls back to `data-snap-slider-align` when no CSS
     * is detected, otherwise defaults to `start`.
     *
     * @param  {Element}  el
     * @return {String}
     */

  }, {
    key: "getSnapAlign",
    value: function getSnapAlign(el) {
      // Get element's CSS align value.
      var style = (0,_helpers_getStyle__WEBPACK_IMPORTED_MODULE_2__["default"])(el, 'scrollSnapAlign'); // If browser supports Scroll Snap and slide
      // has a non-empty value, return it.

      if (style && style.indexOf('none') < 0) {
        return style;
      } // Otherwise, assume "start" for everything.


      return 'start';
    }
    /**
     * Get the offset we should scroll to for a specific slide.
     *
     * @param  {Element}  slide
     * @return {Object}   { top, left }
     */

  }, {
    key: "getScrollOffset",
    value: function getScrollOffset(slide) {
      var container = this.container;
      var align = this.getSnapAlign(slide); // Calculate the 'start' position by default.
      // NOTE: This forces slides with align `none` to still snap into place.

      var top = slide.offsetTop;
      var left = slide.offsetLeft; // NOTE: Because Safari uses the 2-value syntax, we simply check for matching
      // keywords. If this causes incorrect behavior, use the `data-snap-slider-align`
      // attribute to override our automatic CSS detection.

      if (align.indexOf('center') >= 0) {
        // To center a slide, start with its beginning offset (the 'start' position).
        // Then add half the slide's size minus half the container size.
        top = slide.offsetTop + slide.offsetHeight / 2 - container.offsetHeight / 2;
        left = slide.offsetLeft + slide.offsetWidth / 2 - container.offsetWidth / 2;
      } else if (align.indexOf('end') >= 0) {
        // To align the end of a slide, start with its beginning offset (the 'start' position).
        // Then subtract the size of the container, but add back the size of the slide.
        top = slide.offsetTop - container.offsetHeight + slide.offsetHeight;
        left = slide.offsetLeft - container.offsetWidth + slide.offsetWidth;
      } // Keep offsets within the scrollable area.


      top = (0,_helpers_minmax__WEBPACK_IMPORTED_MODULE_4__["default"])(top, 0, container.scrollHeight);
      left = (0,_helpers_minmax__WEBPACK_IMPORTED_MODULE_4__["default"])(left, 0, container.scrollWidth);
      return {
        top: top,
        left: left
      };
    }
    /**
     * Get the index of the first visible slide in the slider.
     *
     * @return {Number}
     */

  }, {
    key: "getFirstVisibleIndex",
    value: function getFirstVisibleIndex() {
      return this.slides.findIndex(function (slide) {
        return slide.classList.contains('is-visible');
      }) + 1;
    }
    /**
     * Is this a prev/next button, or some other relative index?
     *
     * @param  {Element}        button
     * @param  {String|Number}  index
     * @return {Boolean}
     */

  }, {
    key: "isRelative",
    value: function isRelative(button, index) {
      if (index) {
        return button.matches("[data-snap-slider-goto$=\"".concat(index, "\"]"));
      }

      return button.getAttribute('data-snap-slider-goto').matches(/first|middle|last|prev|next/);
    }
    /**
     * Go to a slide.
     *
     * @param  {String|Number}  index              Starts at 1.
     * @param  {Object}         options
     * @param  {Boolean}        options.ignoreCallbacks
     * @param  {Boolean}        options.immediate
     * @return {Boolean}
     */

  }, {
    key: "goto",
    value: function goto(index) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      index = this.getIndexNumber(index);
      var slide = this.slides[index - 1]; // If we can't find a matching slide, abort!

      if (!slide) {
        return false;
      }

      this.setCurrent(index, options.ignoreCallbacks); // TODO: When Safari gets its act together, use the magic of `scrollIntoView()`
      // slide.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      // Until then, settle for basic `scroll()`...

      var scrollOptions = this.getScrollOffset(slide);

      if (!options.immediate) {
        scrollOptions.behavior = 'smooth';
      }

      this.container.scroll(scrollOptions);
      return true;
    }
    /**
     * Handle click events for nav (aka "goto") buttons.
     *
     * By delegating events to the body, we can automatically
     * handle dynamic goto buttons (i.e., without having to
     * reinitialize slider events).
     *
     * @param  {Event}  event
     * @return {void}
     */

  }, {
    key: "addNavs",
    value:
    /**
     * Add multiple nav elements for the current slider.
     * Automatically hook up any buttons inside the nav.
     *
     * @param  {String|Element|Array}  navs
     * @return {Array}
     */
    // TODO: Do we need this helper?
    function addNavs(navs) {
      var _this2 = this;

      return (0,_helpers_getElements__WEBPACK_IMPORTED_MODULE_1__["default"])(navs).map(function (nav) {
        return _this2.addNav(nav);
      });
    }
    /**
     * Add a single nav element for the current slider.
     * Automatically hook up any buttons inside the nav.
     *
     * @param  {String|Element|Array}  nav
     * @return {Element}
     */

  }, {
    key: "addNav",
    value: function addNav(nav) {
      var _this3 = this;

      nav = (0,_helpers_getElements__WEBPACK_IMPORTED_MODULE_1__["default"])(nav).shift(); // Set a data attribute assigning the nav to this slider.

      nav.setAttribute('data-snap-slider-nav', this.id); // Get button selectors from JavaScript, data attributes, or default to 'button'.
      // NOTE: Allow the nav's data attribute to override the parent container's options.

      var buttonSelector = nav.getAttribute('data-snap-slider-buttons') || this.options.buttons || this.container.getAttribute('data-snap-slider-buttons') || 'button';
      var prevSelector = nav.getAttribute('data-snap-slider-prev') || this.options.prev || this.container.getAttribute('data-snap-slider-prev');
      var nextSelector = nav.getAttribute('data-snap-slider-next') || this.options.next || this.container.getAttribute('data-snap-slider-next'); // Get buttons.

      var buttons = (0,_helpers_qsa__WEBPACK_IMPORTED_MODULE_7__["default"])([buttonSelector, prevSelector, nextSelector].filter(function (selector) {
        return selector;
      }).join(', '), nav);
      var buttonCounter = {
        index: 1
      };
      buttons.forEach(function (button) {
        return _this3.addGotoButton(button, buttonCounter);
      });
      return nav;
    }
    /**
     * Get navs for the current slider.
     *
     * @return {Array}
     */
    // TODO: Deprecate in favor of `this.navs`.

  }, {
    key: "getNavs",
    value: function getNavs() {
      return (0,_helpers_qsa__WEBPACK_IMPORTED_MODULE_7__["default"])("[data-snap-slider-nav=\"".concat(this.id, "\"]"));
    }
    /**
     * Add multiple goto buttons for the current slider.
     *
     * @param  {String|Element|Array}  buttons
     * @param  {Object}                counter
     * @param  {Number}                counter.index
     * @return {Array}
     */
    // TODO: How can we get rid of this counter variable?

  }, {
    key: "addGotoButtons",
    value: function addGotoButtons(buttons) {
      var _this4 = this;

      var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        index: 1
      };
      return (0,_helpers_getElements__WEBPACK_IMPORTED_MODULE_1__["default"])(buttons).map(function (button) {
        return _this4.addGotoButton(button, counter);
      });
    }
    /**
     * Add a single goto button for the current slider.
     *
     * @param  {String|Element|Array}  button
     * @param  {Object}                counter
     * @param  {Number}                counter.index
     * @return {Element}
     */
    // TODO: How can we get rid of this counter variable?

  }, {
    key: "addGotoButton",
    value: function addGotoButton(button) {
      var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        index: 1
      };
      button = (0,_helpers_getElements__WEBPACK_IMPORTED_MODULE_1__["default"])(button).shift(); // Skip buttons that already have goto attributes.

      if (button.hasAttribute('data-snap-slider-goto')) {
        return button;
      } // Custom prev/next buttons.


      if (this.options.prev && button.matches(this.options.prev)) {
        button.setAttribute('data-snap-slider-goto', 'prev');
        return button;
      }

      if (this.options.next && button.matches(this.options.next)) {
        button.setAttribute('data-snap-slider-goto', 'next');
        return button;
      } // TODO: Make it possible to configure prev/next terms.


      if (button.textContent.match(/\b(?:first)/i)) {
        // First
        button.setAttribute('data-snap-slider-goto', 'first');
      } else if (button.textContent.match(/\b(?:middle)/i)) {
        // Middle
        button.setAttribute('data-snap-slider-goto', 'middle');
      } else if (button.textContent.match(/\b(?:last)/i)) {
        // Last
        button.setAttribute('data-snap-slider-goto', 'last');
      } else if (button.textContent.match(/\b(?:prev|back|before|left|up)/i)) {
        // Prev
        button.setAttribute('data-snap-slider-goto', 'prev');
      } else if (button.textContent.match(/\b(?:next|forward|after|right|down)/i)) {
        // Next
        button.setAttribute('data-snap-slider-goto', 'next');
      } else {
        // Numeric: Check the text for a number, else fallback to the next index.
        var index = parseInt(button.textContent.replace(/.*\b(\d+)\b.*/, '$1'), 10) || counter.index;
        button.setAttribute('data-snap-slider-goto', index); // Increment next index.

        counter.index = index + 1;
      }

      return button;
    }
    /**
     * Get nav buttons for the current slider.
     *
     * @return {Array}
     */

  }, {
    key: "getButtons",
    value: function getButtons() {
      return (0,_helpers_qsa__WEBPACK_IMPORTED_MODULE_7__["default"])("\n      [data-snap-slider=\"".concat(this.id, "\"] [data-snap-slider-goto]:not([data-snap-slider-goto*=\":\"]),\n      [data-snap-slider-nav=\"").concat(this.id, "\"] [data-snap-slider-goto]:not([data-snap-slider-goto*=\":\"]),\n      [data-snap-slider-goto^=\"").concat(this.id, ":\"]\n    "));
    }
    /**
     * Update the current index, slides, and buttons, then fire a change event.
     *
     * @param  {String|Number}  index
     * @param  {Boolean}        ignoreCallbacks
     * @return {Number}
     */

  }, {
    key: "setCurrent",
    value: function setCurrent(index, ignoreCallbacks) {
      index = this.getIndexNumber(index); // Ignore requests for slides that don't exist.

      if (!this.getSlide(index)) {
        return -1;
      } // Update current index.


      this.current = index; // Update slides.

      this.slides.forEach(function (slide, i) {
        // NOTE: Subtract 1 because the array is 0-index, but our API is 1-index.
        if (i === index - 1) {
          slide.classList.add('is-current');
        } else {
          slide.classList.remove('is-current');
        }
      }); // Update buttons.

      this.buttons.forEach(function (button) {
        if (button.getAttribute('data-snap-slider-goto') === String(index)) {
          button.classList.add('is-current');
        } else {
          button.classList.remove('is-current');
        }
      }); // Callback: `change`.

      if (!ignoreCallbacks) {
        this.callbacks.change.forEach(function (fn) {
          return fn(index);
        });
      }

      return index;
    }
    /**
     * Wait until a change happens from a non-click event, then
     * update the current index and fire a change event.
     *
     * @param  {Number}  index
     * @return {void}
     */

  }, {
    key: "maybeSetCurrent",
    value: function maybeSetCurrent() {
      if (!this.hasClicked) {
        this.setCurrent(this.getFirstVisibleIndex());
      } // Reset click every time scrolling stops.


      this.hasClicked = false;
    }
    /**
     * Handle intersection observer events.
     *
     * Update visible classes and current slide on scroll.
     *
     * @param  {Array}  entries
     * @return {void}
     */

  }, {
    key: "intersectionCallback",
    value: function intersectionCallback(entries) {
      var _this5 = this;

      entries.forEach(function (entry) {
        var slide = entry.target;
        var index = _this5.slides.indexOf(slide) + 1;

        var buttons = _this5.buttons.filter(function (button) {
          return button.getAttribute('data-snap-slider-goto') === String(index);
        });

        if (entry.isIntersecting) {
          slide.classList.add('is-visible');
          buttons.forEach(function (b) {
            return b.classList.add('is-visible');
          });
        } else {
          slide.classList.remove('is-visible');
          buttons.forEach(function (b) {
            return b.classList.remove('is-visible');
          });
        }
      }); // Disable relative goto buttons.

      if (!this.loop) {
        // Prev.
        if (this.slides[0].classList.contains('is-visible')) {
          this.buttonsPrev.forEach(function (button) {
            return button.classList.add('is-disabled');
          });
        } else {
          this.buttonsPrev.forEach(function (button) {
            return button.classList.remove('is-disabled');
          });
        } // Next.


        if (this.slides[this.slides.length - 1].classList.contains('is-visible')) {
          this.buttonsNext.forEach(function (button) {
            return button.classList.add('is-disabled');
          });
        } else {
          this.buttonsNext.forEach(function (button) {
            return button.classList.remove('is-disabled');
          });
        }
      }

      if (this.hasLoaded) {
        this.maybeSetCurrentDebounce();
      } else {
        // Load.
        this.hasLoaded = true;
        this.container.classList.add('has-loaded'); // Callback: `load`.

        this.callbacks.load.forEach(function (fn) {
          return fn();
        });
      }
    }
    /**
     * Handle resize observer events.
     *
     * @param  {Array}  entries
     * @return {void}
     */

  }, {
    key: "resizeCallback",
    value: function resizeCallback() {
      this.update();
    }
    /**
     * Update this slider (e.g., on resize). Basically just repositions the
     * current slide.
     *
     * @return {void}
     */

  }, {
    key: "update",
    value: function update() {
      this["goto"](this.current, {
        ignoreCallbacks: true,
        immediate: true
      });
    }
    /**
     * Add callbacks to fire on specific events.
     *
     * @param  {String}    eventName  Event name.
     * @param  {Function}  callback   Function w/ slider and event params (e.g., `fn(slider, event)`).
     * @return {void}
     */

  }, {
    key: "on",
    value: function on(eventName, callback) {
      // Ignore invalid events.
      if (!(0,_helpers_hasOwnProperty__WEBPACK_IMPORTED_MODULE_3__["default"])(this.callbacks, eventName)) {
        if (true) {
          console.log("\n\uD83D\uDEAB Whoops! Snap Slider can't add events for \"".concat(eventName, "\".\n\n\uD83D\uDCDD Please make sure your event matches one of the ones in this list:\n\n"), Object.keys(this.callbacks), '\n\n');
        }

        return;
      } // Ignore invalid callbacks.


      if (typeof callback !== 'function') {
        if (true) {
          console.log("\n  \uD83D\uDEAB Whoops! Snap Slider can only add functions as callbacks.\n\n  \uD83D\uDC40 It looks like you passed a \"".concat(_typeof(callback), "\" instead.\n\n"), callback, '\n\n');
        }

        return;
      } // Add the callback for our event.


      this.callbacks[eventName].push(callback);
    }
    /**
     * Destroy this slider. Stop any active transitions, remove its event
     * listeners, and delete it from our internal array of slider instances.
     *
     * @return {void}
     */

  }, {
    key: "destroy",
    value: function destroy() {
      // Stop events, observers, etc.
      this.maybeSetCurrentDebounce.cancel();
      this.intersectionObserver.disconnect();
      this.resizeObserver.disconnect(); // Remove references to this slider.

      delete this.container.SnapSlider;
      delete window._SnapSliders[this.id];
    }
    /**
     * Reset this slider (e.g., after adding or removing a slide).
     *
     * See `init()` for a full breakdown of `options`.
     *
     * @param  {Object}  options
     * @return {void}
     */

  }, {
    key: "reset",
    value: function reset() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      // Copy initial options.
      var initialOptions = this.options; // Remove initial callbacks to avoid duplicating them.

      delete initialOptions.on; // Don't let people reset critical options during reset (e.g., slider ID).

      delete options.id; // Destroy the slider, then re-initialize with new options.

      this.destroy();
      this.init(this.container, _objectSpread(_objectSpread({}, initialOptions), options));
    }
    /**
     * Get the `SnapSlider` object for a slider based on its ID.
     *
     * @param  {String}      id
     * @return {SnapSlider}
     */

  }], [{
    key: "handleGoto",
    value: function handleGoto(event) {
      var _button$closest;

      var button = event.target.closest('[data-snap-slider-goto]');

      var _goto = (button === null || button === void 0 ? void 0 : button.getAttribute('data-snap-slider-goto')) || ''; // Parse slide index and slider ID from goto attribute.


      var args = _goto.split(':').map(function (str) {
        return str.trim();
      });

      var index = args.pop();
      var sliderID = args.pop(); // If button doesn't include slider ID, get it from nav.

      if (!sliderID) {
        var nav = button === null || button === void 0 ? void 0 : button.closest('[data-snap-slider-nav]');
        sliderID = nav === null || nav === void 0 ? void 0 : nav.getAttribute('data-snap-slider-nav');
      } // Get slider with matching ID, if it exists.
      // Otherwise, check whether the button is actually inside the slider.


      var slider = window._SnapSliders[sliderID] || (button === null || button === void 0 ? void 0 : (_button$closest = button.closest('[data-snap-slider]')) === null || _button$closest === void 0 ? void 0 : _button$closest.SnapSlider); // If you still can't find a slider, abort!

      if (!slider) {
        return;
      } // Let the rest of the slider know a click has happened.
      // We'll wait to fire another "change" event until
      // the selected slide becomes visible.


      this.hasClicked = true; // Go to slide.

      slider["goto"](index);
    }
  }, {
    key: "get",
    value: function get(id) {
      return window._SnapSliders[id];
    }
  }]);

  return SnapSlider;
}(); // Keep track of all the sliders on the page to reference.


window._SnapSliders = []; // Make the constructor globally accessible.

window.SnapSlider = SnapSlider; // If jQuery exists, integrate.

if (typeof $ !== 'undefined') {
  // eslint-disable-next-line no-undef, func-names
  $.fn.snapSlider = function (options) {
    return new SnapSlider(this, options);
  };
} // Auto-init once the DOM is ready.


(0,_helpers_onReady__WEBPACK_IMPORTED_MODULE_6__["default"])(function () {
  // Initialize all sliders with data attributes.
  (0,_helpers_qsa__WEBPACK_IMPORTED_MODULE_7__["default"])('[data-snap-slider]').forEach(function (el) {
    return new SnapSlider(el);
  }); // Setup click events for *all* nav elements.

  (0,_helpers_on__WEBPACK_IMPORTED_MODULE_5__["default"])('body', 'click', '[data-snap-slider-goto]', SnapSlider.handleGoto);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SnapSlider);
})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});