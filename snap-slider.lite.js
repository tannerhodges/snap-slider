(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["SnapSlider"] = factory();
	else
		root["SnapSlider"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var element_closest__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var smoothscroll_polyfill__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var smoothscroll_polyfill__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(smoothscroll_polyfill__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var tabbable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var tabbable__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(tabbable__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lodash_throttle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(17);
/* harmony import */ var lodash_throttle__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash_throttle__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _helpers_getClosestAttribute__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(18);
/* harmony import */ var _helpers_getElements__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(19);
/* harmony import */ var _helpers_getStyle__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(22);
/* harmony import */ var _helpers_hasOwnProperty__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(23);
/* harmony import */ var _helpers_isObject__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(24);
/* harmony import */ var _helpers_minmax__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(25);
/* harmony import */ var _helpers_on__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(26);
/* harmony import */ var _helpers_onReady__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(27);
/* harmony import */ var _helpers_passive__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(28);
/* harmony import */ var _helpers_pick__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(29);
/* harmony import */ var _helpers_qsa__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(20);
/* harmony import */ var _helpers_toArray__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(21);
/* harmony import */ var _helpers_values__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(30);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// Dependencies


 // Helpers















 // Modules

var logger =  false ? undefined : {}; // Internal Variables

var counter = 1;
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
   * @param  {String|Element|Array|Object}  containerOrOptions
   * @param  {Object}                       options
   * @constructor
   */
  function SnapSlider(containerOrOptions) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, SnapSlider);

    // Setup internal variables.
    this.terms = {
      prev: /(prev|back|before|left|up)/,
      next: /(next|forward|after|right|down)/
    };
    /* eslint-disable quote-props */

    this.callbacks = {
      'load': [],
      'change': [],
      'change.click': [],
      'change.scroll': [],
      'change.keydown': [],
      'change.focusin': [],
      'scroll': [],
      'scroll.start': [],
      'scroll.end': []
    };
    /* eslint-enable quote-props */

    this.init(containerOrOptions, options); // Don't construct sliders with empty containers.

    if (!this.container) {
      return;
    }

    this.watchForChanges(); // Keep track of the slider so we can reference & debug it later.

    this.container.SnapSlider = this;
    window._SnapSliders[this.id] = this;
  }
  /**
   * Initialize this slider.
   *
   * @param  {String|Element|Array|Object}  containerOrOptions
   * @param  {Object}                       options
   * @param  {String|Element|Array}         options.container
   * @param  {String}                       options.id
   * @param  {String|Element|Array}         options.slides
   * @param  {String|Number}                options.start
   * @param  {String|Element|Array}         options.nav
   * @param  {String|Element|Array}         options.buttons
   * @param  {String|Element|Array}         options.prev
   * @param  {String|Element|Array}         options.next
   * @return {void}
   */


  _createClass(SnapSlider, [{
    key: "init",
    value: function init(containerOrOptions) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      // Allow people to quickly spin up sliders by just passing a container
      // element, or by passing in a single options object.
      if (Object(_helpers_isObject__WEBPACK_IMPORTED_MODULE_9__["default"])(containerOrOptions)) {
        options = containerOrOptions;
      } // Fill default options.


      this.options = _objectSpread({
        container: containerOrOptions,
        id: '',
        slides: '',
        nav: '',
        buttons: '',
        prev: '',
        next: '',
        start: 0,
        loop: null,
        on: {}
      }, options); // Get single element from params.

      var container = Object(_helpers_getElements__WEBPACK_IMPORTED_MODULE_6__["default"])(this.options.container).shift(); // Don't construct sliders with empty containers.

      if (!container) {
        if (false) {}

        return;
      } // Great! Now let's start initializing everything.


      this.container = container; // Get selectors from JavaScript or data attributes.

      this.options.buttons = options.buttons || this.container.getAttribute('data-snap-slider-buttons');
      this.options.prev = options.prev || this.container.getAttribute('data-snap-slider-prev');
      this.options.next = options.next || this.container.getAttribute('data-snap-slider-next'); // Get and set persistent options in data attributes.

      this.id = this.getMaybeSetID(container, this.options.id);
      this.slides = this.getMaybeSetSlides(container, this.options.slides);
      this.align = this.getMaybeSetAlign(container, this.options.align);
      this.current = this.getMaybeSetStart(container, this.options.start);
      this.loop = this.getMaybeSetLoop(container, this.options.loop); // Reset internal variables.

      this.transition = null;
      this.scrolling = false; // Add custom callbacks.
      // eslint-disable-next-line no-restricted-syntax

      for (var eventName in this.options.on) {
        if (Object(_helpers_hasOwnProperty__WEBPACK_IMPORTED_MODULE_8__["default"])(this.options.on, eventName)) {
          this.on(eventName, this.options.on[eventName]);
        }
      } // Setup navigation.
      // NOTE: If left blank, `addNav()` will handle the fallbacks for button selectors.


      var navOptions = Object(_helpers_pick__WEBPACK_IMPORTED_MODULE_14__["default"])(this.options, ['buttons', 'prev', 'next']); // Init custom goto buttons in the container.
      // NOTE: "Goto" buttons are automatically handled by delegated click
      // events on the `body`. For more details, see `handleGotoClick()`.

      this.addGotoButtons(_objectSpread(_objectSpread({}, navOptions), {}, {
        container: container
      })); // Init standard navs with data attributes.

      this.addNav("[data-snap-slider-nav=\"".concat(this.id, "\"]"), navOptions); // Then init custom navs too.

      if (this.options.nav) {
        this.addNav(this.options.nav, navOptions);
      } // Go to the slide we want to start on.


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
        id = "slider-".concat(counter);
        counter += 1;
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

      var slides = selector ? Object(_helpers_getElements__WEBPACK_IMPORTED_MODULE_6__["default"])(selector, container) : Object(_helpers_toArray__WEBPACK_IMPORTED_MODULE_16__["default"])(container.children); // Ensure all slides are focusable but not tabbable.

      slides.forEach(function (slide) {
        return slide.setAttribute('tabindex', '-1');
      }); // Return array of slides.

      return slides;
    }
    /**
     * Get alignment fallback for a given container.
     *
     * @param  {Element}  container
     * @param  {String}   align
     * @return {String}
     */

  }, {
    key: "getMaybeSetAlign",
    value: function getMaybeSetAlign(container, align) {
      // Get align index from JavaScript, data attribute, or leave blank.
      align = align || container.getAttribute('data-snap-slider-align') || ''; // Store value in data attribute.

      container.setAttribute('data-snap-slider-align', align);
      return align;
    }
    /**
     * Get start index for a given container.
     *
     * Defaults to 1.
     *
     * @param  {Element}  container
     * @param  {String}   start
     * @return {String|Number}
     */

  }, {
    key: "getMaybeSetStart",
    value: function getMaybeSetStart(container, start) {
      // Get start index from JavaScript, data attribute, or default to 1.
      if (!SnapSlider.isValidIndex(start)) {
        start = container.getAttribute('data-snap-slider-start') || 1;
      } // Store value in data attribute.


      container.setAttribute('data-snap-slider-start', start);
      return start;
    }
    /**
     * Get and maybe set a slider's `loop` option on the closest container element.
     *
     * @param  {Element}  container
     * @param  {Boolean}  loop
     * @return {String}
     */

  }, {
    key: "getMaybeSetLoop",
    value: function getMaybeSetLoop(container, loop) {
      // If we were given a Boolean value to set, use that.
      // Else check for an existing data attribute.
      // Defaults to `false`.
      loop = typeof loop === 'boolean' ? loop : container.getAttribute('data-snap-slider-loop') === 'true'; // Store value in data attribute.

      container.setAttribute('data-snap-slider-loop', loop); // Return the final loop value.

      return loop;
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
      var style = Object(_helpers_getStyle__WEBPACK_IMPORTED_MODULE_7__["default"])(el, 'scrollSnapAlign');
      console.log('getSnapAlign', style, Object(_helpers_getClosestAttribute__WEBPACK_IMPORTED_MODULE_5__["default"])(el, 'data-snap-slider-align'), 'start'); // If browser supports Scroll Snap and slide
      // has a non-empty value, return it.

      if (style && style.indexOf('none') < 0) {
        return style;
      } // Otherwise, fallback to the slider's align attribute.
      // Else assume "start" for everything.


      return Object(_helpers_getClosestAttribute__WEBPACK_IMPORTED_MODULE_5__["default"])(el, 'data-snap-slider-align') || 'start';
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
     * Is this a valid index?
     *
     * - first
     * - middle
     * - last
     * - prev
     * - next
     *
     * @param  {String|Number}  index
     * @return {Number}
     */

  }, {
    key: "getIndexNumber",

    /**
     * Get the slide number for any index.
     *
     * Returns -1 if index is invalid.
     *
     * @param  {String|Number}  index
     * @return {Number}
     */
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


      top = Object(_helpers_minmax__WEBPACK_IMPORTED_MODULE_10__["default"])(top, 0, container.scrollHeight);
      left = Object(_helpers_minmax__WEBPACK_IMPORTED_MODULE_10__["default"])(left, 0, container.scrollWidth);
      return {
        top: top,
        left: left
      };
    }
    /**
     * Go to a slide.
     *
     * @param  {String|Number}  index                    Starts at 1.
     * @param  {Object}         options
     * @param  {Boolean}        options.focus
     * @param  {Boolean}        options.force
     * @param  {Boolean}        options.ignoreCallbacks
     * @param  {Boolean}        options.immediate
     * @param  {Event}          event
     * @return {Boolean}
     */

  }, {
    key: "goto",
    value: function goto(index) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var event = arguments.length > 2 ? arguments[2] : undefined;
      // Fill default options.
      options = _objectSpread({
        // By default, focus the slide we're going to.
        focus: true,
        // Force-update the scroll position, even if we're already on the current slide.
        force: false,
        // Ignore custom callbacks for events.
        ignoreCallbacks: false,
        // Immediately update position without smooth scrolling.
        immediate: false
      }, options); // Get the next slide we should go to.

      var next = this.getIndexNumber(index); // If nothing changed, don't do anything (as long as
      // we're not trying to force it).

      if (!options.force && next === this.current) {
        return false;
      } // Get the next slide.


      var slide = this.getSlide(next);

      if (!slide) {
        return false;
      } // Scroll to it!


      var _this$getScrollOffset = this.getScrollOffset(slide),
          top = _this$getScrollOffset.top,
          left = _this$getScrollOffset.left;

      if (options.immediate) {
        // Scroll immediately.
        this.container.scroll({
          top: top,
          left: left
        });
      } else {
        // Let the event handlers know we're coming, then smooth scroll.
        this.startTransition(next);
        this.container.scroll({
          top: top,
          left: left,
          behavior: 'smooth'
        });
      } // Update state.


      this.current = next; // We changed slides!

      this.fireEvent('change', event, options);
      return true;
    }
    /**
     * Build the `goto` attribute for a nav button.
     *
     * @param  {Element|Boolean}  nav
     * @param  {String|Number}    index
     * @return {String}
     */

  }, {
    key: "buildGoto",
    value: function buildGoto(nav) {
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      // Start with an empty string.
      var _goto = ''; // If this button isn't part of a nav, include the slider ID.

      if (!nav) {
        _goto += "".concat(this.id, ":");
      } // Add the index and return.


      return _goto + index;
    }
    /**
     * Set the `goto` attribute for nav buttons.
     *
     * @param  {String|Element|Array}  buttons
     * @param  {String}                index
     * @return {void}
     */

  }, {
    key: "setGoto",
    value: function setGoto(buttons, index) {
      var _this = this;

      buttons = Object(_helpers_getElements__WEBPACK_IMPORTED_MODULE_6__["default"])(buttons); // If we found custom prev/next buttons, set their `goto` attributes
      // before we loop through the rest of the buttons.

      buttons.forEach(function (button) {
        button.setAttribute('data-snap-slider-goto', _this.buildGoto( // Don't assume this button is grouped with the others. It may
        // be somewhere else on the page, so double check for a parent
        // slider or nav container.
        button.closest('[data-snap-slider], [data-snap-slider-nav]'), index));
      });
    }
    /**
     * Get the slider ID and slide index a goto button is targeting.
     *
     * NOTE: This method is static so we can call it in the delegated body
     * click events. For more details, see `handleGotoClick()`.
     *
     * @param  {String|Element|Array}  button
     * @return {Object}                { sliderID, index }
     */

  }, {
    key: "startTransition",

    /**
     * Start transitioning to another slide.
     *
     * This way when you click a nav button, the current slide updates
     * immediately but the scroll listener doesn't override it, or fire
     * extra change events.
     *
     * @param  {Number}  next
     * @return {void}
     */
    value: function startTransition(next) {
      var _this2 = this;

      // Tell the scroll listener which slide we're transitioning to.
      this.transition = {
        from: this.current,
        to: next,
        diff: Math.abs(next - this.current)
      }; // In case someone's fast enough to start scrolling again before our
      // scroll listener resolves the `transition` flag, or if the slide's
      // already visible and nothing actually has to scroll,
      // set a timeout to resolve the transition.

      var stuck = this.transition.to; // If there's already a check waiting, clear it to avoid accidentally
      // reverting to the wrong slide.

      if (this.checkTransition) {
        clearTimeout(this.checkTransition);
      } // Now make sure we don't get stuck!


      this.checkTransition = setTimeout(function () {
        if (_this2.transition.to === stuck) {
          _this2.stopTransition();
        }
      }, 1000);
    }
    /**
     * Stop the transitions! Set things back to normal.
     *
     * @return {void}
     */

  }, {
    key: "stopTransition",
    value: function stopTransition() {
      // Clear transition checks.
      this.transition = null;
      clearTimeout(this.checkTransition);
    }
    /**
     * Is this a "previous" button?
     *
     * @param  {String|Element|Array}  button
     * @return {Boolean}
     */

  }, {
    key: "isPrevButton",
    value: function isPrevButton(button) {
      button = Object(_helpers_getElements__WEBPACK_IMPORTED_MODULE_6__["default"])(button).shift(); // Ignore missing elements.

      if (!button) {
        return false;
      } // Check whether the `goto` attribute is "prev".
      // If not, check the text & class for common "prev" terms.


      return (button.getAttribute('data-snap-slider-goto') || '').match(/\bprev$/) || button.textContent.toLowerCase().match(this.terms.prev) || button.className.toLowerCase().match(this.terms.prev);
    }
    /**
     * Is this a "next" button?
     *
     * @param  {String|Element|Array}  button
     * @return {Boolean}
     */

  }, {
    key: "isNextButton",
    value: function isNextButton(button) {
      button = Object(_helpers_getElements__WEBPACK_IMPORTED_MODULE_6__["default"])(button).shift(); // Ignore missing elements.

      if (!button) {
        return false;
      } // Check whether the `goto` attribute is "next".
      // If not, check the text & class for common "next" terms.


      return (button.getAttribute('data-snap-slider-goto') || '').match(/\bnext$/) || button.textContent.toLowerCase().match(this.terms.next) || button.className.toLowerCase().match(this.terms.next);
    }
    /**
     * Is this index a relative term? I.e., is it `prev` or `next`?
     *
     * @param  {String|Number}  index
     * @return {Boolean}
     */

  }, {
    key: "isCurrent",

    /**
     * Does an index match the current slide?
     *
     * @param  {String|Number}  index
     * @return {Boolean}
     */
    value: function isCurrent(index) {
      // Ignore relative indexes (i.e., `prev` and `next`) since they
      // always refer to one more or less than the current index.
      if (SnapSlider.isRelative(index)) {
        return false;
      } // Does this numeric index match the current slide?


      return this.getIndexNumber(index) === this.current;
    }
    /**
     * Add goto buttons for the current slider.
     *
     * @param  {String|Element|Array|Object}  buttonsOrOptions
     * @param  {Object}                       options
     * @param  {String|Element|Array}         options.container
     * @param  {String|Element|Array}         options.buttons
     * @param  {String|Element|Array}         options.prev
     * @param  {String|Element|Array}         options.next
     * @return {Boolean}
     */

  }, {
    key: "addGotoButtons",
    value: function addGotoButtons(buttonsOrOptions) {
      var _this3 = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      // Allow people to quickly add nav buttons by just passing the
      // selector, or by passing in a single options object.
      if (Object(_helpers_isObject__WEBPACK_IMPORTED_MODULE_9__["default"])(buttonsOrOptions)) {
        options = buttonsOrOptions;
      } // Fill default options.


      options = _objectSpread({
        container: '',
        buttons: buttonsOrOptions,
        prev: '',
        next: ''
      }, options); // Get button elements.
      // NOTE: If someone passes an overly-generic selector (e.g., `button`)
      // this will query the entire document. In general, you should either
      // specify a container element, use specific selectors, or pass
      // the elements directly.

      var buttons = Object(_helpers_getElements__WEBPACK_IMPORTED_MODULE_6__["default"])(options.buttons, options.container);
      var prev = Object(_helpers_getElements__WEBPACK_IMPORTED_MODULE_6__["default"])(options.prev, options.container);
      var next = Object(_helpers_getElements__WEBPACK_IMPORTED_MODULE_6__["default"])(options.next, options.container); // If we found custom prev/next buttons, set their `goto` attributes
      // before we loop through the rest of the buttons.

      prev.forEach(function (b) {
        return b.hasAttribute('data-snap-slider-goto') || _this3.setGoto(prev, 'prev');
      });
      next.forEach(function (b) {
        return b.hasAttribute('data-snap-slider-goto') || _this3.setGoto(next, 'next');
      }); // Keep track of the index outside of the loop so we can
      // skip prev/next buttons but still go in order.

      var nextIndex = 1; // Loop through the buttons and set each one's `goto` attribute.

      buttons.forEach(function (button) {
        // Ignore buttons that already have a `goto` attribute.
        if (button.hasAttribute('data-snap-slider-goto')) {
          return null;
        } // Previous


        if (_this3.isPrevButton(button)) {
          return _this3.setGoto(button, 'prev');
        } // Next


        if (_this3.isNextButton(button)) {
          return _this3.setGoto(button, 'next');
        } // Numeric: Check the text for a number, else fallback to the next index.


        var index = parseInt(button.textContent.replace(/.*\b(\d+)\b.*/, '$1'), 10) || nextIndex; // Increment the next index.

        nextIndex = index + 1;
        return _this3.setGoto(button, index);
      });
      this.updateButtons();
      return true;
    }
    /**
     * Get navs for the current slider.
     *
     * @return {Array}
     */

  }, {
    key: "getNavs",
    value: function getNavs() {
      var _this4 = this;

      // eslint-disable-next-line arrow-body-style
      return Object(_helpers_qsa__WEBPACK_IMPORTED_MODULE_15__["default"])('[data-snap-slider-nav]').filter(function (nav) {
        // Only return navs targeting the current slider.
        return nav.getAttribute('data-snap-slider-nav') === _this4.id;
      });
    }
    /**
     * Get nav buttons for the current slider.
     *
     * @return {Array}
     */

  }, {
    key: "getButtons",
    value: function getButtons() {
      var _this5 = this;

      return Object(_helpers_qsa__WEBPACK_IMPORTED_MODULE_15__["default"])('[data-snap-slider-goto]').filter(function (button) {
        var _SnapSlider$getButton = SnapSlider.getButtonTarget(button),
            sliderID = _SnapSlider$getButton.sliderID; // Only return buttons targeting the current slider.


        return sliderID === _this5.id;
      });
    }
    /**
     * Update nav buttons for the current slider.
     *
     * @return {void}
     */

  }, {
    key: "updateButtons",
    value: function updateButtons() {
      var _this6 = this;

      // Wait until the slider has initialized.
      if (!this.current) {
        return;
      } // Loop through all the nav buttons.


      this.getButtons().forEach(function (button) {
        // Figure out which slide it's for...
        var _SnapSlider$getButton2 = SnapSlider.getButtonTarget(button),
            index = _SnapSlider$getButton2.index; // And update its class.


        if (_this6.isCurrent(index)) {
          button.classList.add('is-current');
        } else {
          button.classList.remove('is-current');
        } // Also, enable/disable relative buttons unless `loop` is on.


        if (!_this6.loop && SnapSlider.isRelative(index)) {
          // Disable prev button on first slide.
          // Disable next button on last slide.
          var disabled = index === 'prev' && _this6.current === 1 || index === 'next' && _this6.current === _this6.slides.length;

          if (disabled) {
            // button.setAttribute('disabled', '');
            button.classList.add('is-disabled');
          } else {
            // button.removeAttribute('disabled', '');
            button.classList.remove('is-disabled');
          }
        }
      });
    }
    /**
     * Update slide active states when the slider changes.
     *
     * @return {void}
     */

  }, {
    key: "updateSlides",
    value: function updateSlides() {
      var _this7 = this;

      this.slides.forEach(function (slide, index) {
        // NOTE: Subtract 1 because the array is 0-index, but our API is 1-index.
        if (index === _this7.current - 1) {
          slide.classList.add('is-current');
          slide.removeAttribute('aria-hidden'); // Enable tabbing for current slide

          Object(_helpers_qsa__WEBPACK_IMPORTED_MODULE_15__["default"])('[data-snap-slider-tabindex]', slide).forEach(function (tab) {
            tab.removeAttribute('tabindex');
          });
        } else {
          slide.classList.remove('is-current');
          slide.setAttribute('aria-hidden', 'true'); // Disable tabbing for non-current slides

          tabbable__WEBPACK_IMPORTED_MODULE_2___default()(slide).forEach(function (tab) {
            tab.setAttribute('tabindex', '-1');
            tab.setAttribute('data-snap-slider-tabindex', '');
          });
        }
      });
    }
    /**
     * Add a nav element for the current slider. Automatically hooks up any nav
     * buttons inside the nav.
     *
     * @param  {String|Element|Array|Object}  containerOrOptions
     * @param  {Object}                       options
     * @param  {String|Element|Array}         options.container
     * @param  {String|Element|Array}         options.buttons
     * @param  {String|Element|Array}         options.prev
     * @param  {String|Element|Array}         options.next
     * @return {Boolean}
     */

  }, {
    key: "addNav",
    value: function addNav(containerOrOptions) {
      var _this8 = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      // Allow people to quickly add a nav by just passing a container
      // element, or by passing in a single options object.
      if (Object(_helpers_isObject__WEBPACK_IMPORTED_MODULE_9__["default"])(containerOrOptions)) {
        options = containerOrOptions;
      } // Fill default options.


      options = _objectSpread({
        container: containerOrOptions,
        buttons: '',
        prev: '',
        next: ''
      }, options); // Get matching nav containers.

      var navContainers = Object(_helpers_getElements__WEBPACK_IMPORTED_MODULE_6__["default"])(options.container); // Don't add navs without container elements.

      if (!navContainers.length) {
        return false;
      }

      navContainers.forEach(function (navContainer) {
        // Set a data attribute assigning the nav to this slider.
        navContainer.setAttribute('data-snap-slider-nav', _this8.id); // Get button selectors from JavaScript, data attribute, or default to 'button'.
        // NOTE: In this case, allow the nav's data attribute to override the parent
        // container's options.

        var buttons = navContainer.getAttribute('data-snap-slider-buttons') || options.buttons || 'button';
        var prev = options.prev || navContainer.getAttribute('data-snap-slider-prev');
        var next = options.next || navContainer.getAttribute('data-snap-slider-next'); // And add them.

        _this8.addGotoButtons({
          container: navContainer,
          buttons: buttons,
          prev: prev,
          next: next
        });
      });
      return true;
    }
    /**
     * Which slide is closest to its active offset position?
     *
     * Returns an object include the slide's index, element,
     * and the diff between its active offset and our
     * current scroll position.
     *
     * @return {Object}  { index, slide, diff }
     */

  }, {
    key: "getClosest",
    value: function getClosest() {
      var _this9 = this;

      return this.slides.reduce(function (prev, slide, index) {
        // 1-index to stay consistent with our API.
        index += 1; // How far away are we from the next slide's active offset position?

        var offset = _this9.getScrollOffset(slide);

        var diff = {
          top: Math.abs(_this9.container.scrollTop - offset.top),
          left: Math.abs(_this9.container.scrollLeft - offset.left)
        }; // Save the next slide's info to compare with other slides.

        var next = {
          index: index,
          slide: slide,
          diff: diff
        }; // If this is the first slide, return it and compare the next one.

        if (!prev) {
          return next;
        } // Compare each slide to see which one is the closest to its active offset position.
        // As soon as the next slide is at least as close as the previous one, return it.


        if (next.diff.left <= prev.diff.left && next.diff.top <= prev.diff.top) {
          return next;
        } // Otherwise, keep the last closest slide.


        return prev; // Init with `false` so the first slide gets processed just like the rest of them.
      }, false);
    }
    /**
     * Watch the container scroll for when the current slide changes.
     *
     * @return {void}
     */

  }, {
    key: "watchForChanges",
    value: function watchForChanges() {
      var _this10 = this;

      // Scroll listener. Save so we can remove it during `destroy()`.
      this.scrollListener = lodash_throttle__WEBPACK_IMPORTED_MODULE_4___default()(function (event) {
        // Which slide is closest to their active offset position?
        var closest = _this10.getClosest(); // If someone's passively scrolling (i.e., not in a transition),
        // then  as soon as we've scrolled to another slide, mark that
        // slide as the new current one and fire a change event.


        if (!_this10.transition && closest.index !== _this10.current) {
          _this10.current = closest.index;

          _this10.fireEvent('change', event);
        } // If we just started scrolling, update state and
        // fire a `scroll.start` event.


        if (!_this10.scrolling) {
          _this10.scrolling = true;

          _this10.fireEvent('scroll.start', event);
        } // Fire a generic `scroll` event.


        _this10.fireEvent('scroll', event);
      }, 250); // Scroll end listener. Save so we can remove it during `destroy()`.

      this.scrollEndListener = lodash_debounce__WEBPACK_IMPORTED_MODULE_3___default()(function (event) {
        // We're done scrolling!
        _this10.scrolling = false;

        _this10.fireEvent('scroll.end', event); // Clear any previous transition checks.
        // NOTE: This has to happen *after* we fire the `scroll.end` event,
        // otherwise `handleFocus` won't be able to access `this.transition`.


        _this10.stopTransition();
      }, 250); // Arrow key listener. Save so we can remove it during `destroy()`.

      this.arrowKeyListener = lodash_throttle__WEBPACK_IMPORTED_MODULE_4___default()(function (event) {
        // Ignore events that have already been prevented.
        if (event.defaultPrevented) {
          return;
        } // Listen for arrow keys.
        // @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key


        var isPrev = ['Up', 'ArrowUp', 'Left', 'ArrowLeft'].indexOf(event.key) >= 0;
        var isNext = ['Down', 'ArrowDown', 'Right', 'ArrowRight'].indexOf(event.key) >= 0; // Ignore non-arrow keys.

        if (!isPrev && !isNext) {
          return;
        } // Go to the next or previous slide.


        _this10["goto"](isNext ? 'next' : 'prev', null, event); // Prevent default browser scroll.


        event.preventDefault();
      }, 250); // Focus listener. Save so we can remove it during `destroy()`.

      this.focusListener = function (event) {
        // Only trigger `goto` on focus when we're not passively scrolling.
        // However, if someone manually triggered a transition then
        // allow them to click or tab away to a different slide.
        if (_this10.scrolling && !_this10.transition) {
          return;
        } // Get slide + index.


        var slide;
        var index;

        _this10.slides.forEach(function (s, i) {
          if (s.contains(event.target)) {
            slide = s;
            index = i + 1;
          }
        }, null); // If there's a matching slide, go to it.


        if (slide) {
          _this10["goto"](index, null, event);
        }
      }; // Add all our listeners.
      // Set timeout to avoid initial `goto` event triggering a scroll listener.


      setTimeout(function () {
        _this10.container.addEventListener('scroll', _this10.scrollListener, _helpers_passive__WEBPACK_IMPORTED_MODULE_13__["default"]);

        _this10.container.addEventListener('scroll', _this10.scrollEndListener, _helpers_passive__WEBPACK_IMPORTED_MODULE_13__["default"]);

        _this10.container.addEventListener('keydown', _this10.arrowKeyListener);

        _this10.container.addEventListener('focusin', _this10.focusListener); // Done loading!


        _this10.fireEvent('load');
      }, 100);
    }
    /**
     * Update the slider on load.
     *
     * @return {void}
     */

  }, {
    key: "hasLoaded",
    value: function hasLoaded() {
      this.container.classList.add('has-loaded');
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
      // Make sure we're still on the current slide.
      this["goto"](this.current, {
        focus: false,
        force: true,
        ignoreCallbacks: true,
        immediate: true
      });
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
      // Stop running transitions, event listeners, etc.
      this.stopTransition();
      this.container.removeEventListener('scroll', this.scrollListener);
      this.container.removeEventListener('scroll', this.scrollEndListener);
      this.container.removeEventListener('keydown', this.arrowKeyListener); // Reset callbacks.
      // eslint-disable-next-line no-restricted-syntax

      for (var eventName in this.callbacks) {
        if (Object(_helpers_hasOwnProperty__WEBPACK_IMPORTED_MODULE_8__["default"])(this.callbacks, eventName)) {
          this.callbacks[eventName] = [];
        }
      } // Remove references to this slider.


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

      delete options.container;
      delete options.id; // Re-initialize this slider with initial options + overrides.

      this.init(this.container, _objectSpread(_objectSpread({}, initialOptions), options));
    }
    /**
     * Handle resize events for *all* sliders.
     *
     * @return {void}
     */

  }, {
    key: "fireEvent",

    /**
     * When an event happens, fire all the callback functions for that event.
     *
     * @param  {String}   eventName
     * @param  {Event}    event
     * @param  {Object}   options
     * @param  {Boolean}  options.focus
     * @param  {Boolean}  options.ignoreCallbacks
     * @return {void}
     */
    value: function fireEvent(eventName, event) {
      var _this11 = this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      // Ignore invalid events.
      if (!Object(_helpers_hasOwnProperty__WEBPACK_IMPORTED_MODULE_8__["default"])(this.callbacks, eventName)) {
        return;
      } // Fill default options.


      options = _objectSpread({
        // By default, focus the slide we're going to.
        focus: true,
        // Ignore custom callbacks for events.
        ignoreCallbacks: false
      }, options); // Required: Update slider attributes on load.

      if (eventName === 'load') {
        this.hasLoaded();
      } // Required: Update buttons and slides on every change.


      if (eventName === 'change') {
        this.updateButtons();
        this.updateSlides();
      } // Allow focus events to be ignored.


      if (options.focus) {
        this.handleFocus(eventName, event);
      } // Allow callbacks to be ignored.


      if (options.ignoreCallbacks) {
        return;
      } // Fallback object for `null` events.


      event = event || {}; // Include more granular event types for easier callbacks.

      var events = [eventName];

      if (Object(_helpers_hasOwnProperty__WEBPACK_IMPORTED_MODULE_8__["default"])(this.callbacks, "".concat(eventName, ".").concat(event.type))) {
        events.push("".concat(eventName, ".").concat(event.type));
      } // Fire all the callbacks for each event.


      events.forEach(function (name) {
        _this11.callbacks[name].forEach(function (callback) {
          if (typeof callback === 'function') {
            callback(_this11, event);
          }
        });
      });
    }
    /**
     * Handle focus events differently depending on whether we're manually
     * triggering changes or passively scrolling.
     *
     * @param  {String}   eventName
     * @param  {Event}    event
     * @return {void}
     */

  }, {
    key: "handleFocus",
    value: function handleFocus(eventName, event) {
      // Only handle focus for manually triggered changes (e.g., clicks and key presses).
      // Ignore passive scrolling to avoid mistakenly hijacking someone's focus.
      if (!this.transition) {
        return;
      } // Only focus the slide if we're NOT clicking a prev/next button.


      if (event && eventName === 'change') {
        // Did we click a button?
        var button = event.target.closest('[data-snap-slider-goto]');

        var _SnapSlider$getButton3 = SnapSlider.getButtonTarget(button),
            index = _SnapSlider$getButton3.index; // If we clicked a relative button, get out.


        if (SnapSlider.isRelative(index)) {
          return;
        }
      } // If we're only transitioning one slide over, focus immediately on change.


      if (this.transition.diff <= 1 && eventName === 'change') {
        this.getCurrentSlide().focus({
          preventScroll: true
        });
      } // If we're transitioning across multiple slides, wait until the scroll ends to focus.
      // Otherwise, we'll cause the scroll to flicker.


      if (this.transition.diff > 1 && eventName === 'scroll.end') {
        // Only focus the slide if we haven't already focused on another
        // element during the transition.
        if (!document.activeElement || document.activeElement === document.body || document.activeElement.closest('[data-snap-slider-goto]')) {
          this.getCurrentSlide().focus({
            preventScroll: true
          });
        }
      }
    }
    /**
     * Add callbacks to fire on specific events.
     *
     * @param  {String}    event     Event name.
     * @param  {Function}  callback  Function w/ slider and event params (e.g., `fn(slider, event)`).
     * @return {void}
     */

  }, {
    key: "on",
    value: function on(event, callback) {
      // Ignore invalid events.
      if (!Object(_helpers_hasOwnProperty__WEBPACK_IMPORTED_MODULE_8__["default"])(this.callbacks, event)) {
        if (false) {}

        return;
      } // Ignore invalid callbacks.


      if (typeof callback !== 'function') {
        if (false) {}

        return;
      } // Add the callback for our event.


      this.callbacks[event].push(callback);
    }
    /**
     * Log that we couldn't find the element you're looking for.
     *
     * @param  {mixed}  element
     * @return {void}
     */

  }], [{
    key: "isValidIndex",
    value: function isValidIndex(index) {
      var aliases = ['first', 'middle', 'last', 'prev', 'next']; // Valid indexes are either a known alias,
      // or a positive integer.

      return aliases.indexOf(index) >= 0 || parseInt(index, 10) >= 1;
    }
  }, {
    key: "getButtonTarget",
    value: function getButtonTarget(button) {
      // Where are we going?
      var _goto2 = button ? button.getAttribute('data-snap-slider-goto') : ''; // Ignore missing buttons and attributes.


      if (!_goto2) {
        return {};
      } // Parse slide index and slider ID from `goto` attribute.


      var args = _goto2.split(':').map(function (str) {
        return str.trim();
      });

      var index = args.pop();
      var sliderID = args.pop(); // If the slider ID wasn't included, check for a parent nav or container element.

      if (!sliderID) {
        var nav = button.closest('[data-snap-slider-nav]');
        var container = button.closest('[data-snap-slider]'); // If it is in a nav or container, get the slider ID from there.

        if (nav) {
          sliderID = nav.getAttribute('data-snap-slider-nav');
        }

        if (container) {
          sliderID = container.getAttribute('data-snap-slider');
        }
      } // If there's still no slider ID, is this button already in a slider?


      if (!sliderID) {
        var slider = button.closest('data-snap-slider'); // If it is in a slider, get the slider ID from there.

        if (slider) {
          sliderID = slider.getAttribute('data-snap-slider');
        }
      }

      return {
        sliderID: sliderID,
        index: index
      };
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
    key: "handleGoto",
    value: function handleGoto(event) {
      // Get the button we clicked.
      var button = event.target.closest('[data-snap-slider-goto]'); // Get the slider we're trying to update.

      var _SnapSlider$getButton4 = SnapSlider.getButtonTarget(button),
          sliderID = _SnapSlider$getButton4.sliderID,
          index = _SnapSlider$getButton4.index;

      var slider = window._SnapSliders[sliderID]; // Make sure it actually exists.

      if (!slider) {
        return;
      } // Go! But only focus the slide if we're NOT clicking a prev/next button.


      slider["goto"](index, null, event);
    }
  }, {
    key: "isRelative",
    value: function isRelative(index) {
      return index === 'prev' || index === 'next';
    }
  }, {
    key: "handleResize",
    value: function handleResize() {
      // Loop through all sliders on the page.
      Object(_helpers_values__WEBPACK_IMPORTED_MODULE_17__["default"])(window._SnapSliders).forEach(function (slider) {
        return slider.update();
      });
    }
  }, {
    key: "notFound",
    value: function notFound(element) {
      if (false) {}
    }
    /**
     * Get the `SnapSlider` object for a slider based on its ID.
     *
     * @param  {String}      id
     * @return {SnapSlider}
     */

  }, {
    key: "get",
    value: function get(id) {
      return window._SnapSliders[id];
    }
    /**
     * `console.log` info about a slider, its nav, or goto buttons.
     *
     * @param  {String|Element|Array} idOrElements
     * @return {void}
     */

  }, {
    key: "debug",
    value: function debug(idOrElements) {
      if (false) { var elements; }
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


Object(_helpers_onReady__WEBPACK_IMPORTED_MODULE_12__["default"])(function () {
  // Init polyfills.
  Object(element_closest__WEBPACK_IMPORTED_MODULE_0__["default"])(window);
  smoothscroll_polyfill__WEBPACK_IMPORTED_MODULE_1___default.a.polyfill(); // Initialize all sliders with data attributes.

  Object(_helpers_qsa__WEBPACK_IMPORTED_MODULE_15__["default"])('[data-snap-slider]').forEach(function (el) {
    return new SnapSlider(el);
  }); // Setup click events for *all* nav elements.

  Object(_helpers_on__WEBPACK_IMPORTED_MODULE_11__["default"])('body', 'click', '[data-snap-slider-goto]', SnapSlider.handleGoto); // Setup resize events for *all* sliders.

  window.addEventListener('resize', SnapSlider.handleResize);
});
/* harmony default export */ __webpack_exports__["default"] = (SnapSlider);

/***/ }),
/* 1 */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function polyfill(window) {
  var ElementPrototype = window.Element.prototype;

  if (typeof ElementPrototype.matches !== 'function') {
    ElementPrototype.matches = ElementPrototype.msMatchesSelector || ElementPrototype.mozMatchesSelector || ElementPrototype.webkitMatchesSelector || function matches(selector) {
      var element = this;
      var elements = (element.document || element.ownerDocument).querySelectorAll(selector);
      var index = 0;

      while (elements[index] && elements[index] !== element) {
        ++index;
      }

      return Boolean(elements[index]);
    };
  }

  if (typeof ElementPrototype.closest !== 'function') {
    ElementPrototype.closest = function closest(selector) {
      var element = this;

      while (element && element.nodeType === 1) {
        if (element.matches(selector)) {
          return element;
        }

        element = element.parentNode;
      }

      return null;
    };
  }
}

/* harmony default export */ __webpack_exports__["default"] = (polyfill);
//# sourceMappingURL=index.mjs.map


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/* smoothscroll v0.4.4 - 2019 - Dustan Kasten, Jeremias Menichelli - MIT License */
(function () {
  'use strict';

  // polyfill
  function polyfill() {
    // aliases
    var w = window;
    var d = document;

    // return if scroll behavior is supported and polyfill is not forced
    if (
      'scrollBehavior' in d.documentElement.style &&
      w.__forceSmoothScrollPolyfill__ !== true
    ) {
      return;
    }

    // globals
    var Element = w.HTMLElement || w.Element;
    var SCROLL_TIME = 468;

    // object gathering original scroll methods
    var original = {
      scroll: w.scroll || w.scrollTo,
      scrollBy: w.scrollBy,
      elementScroll: Element.prototype.scroll || scrollElement,
      scrollIntoView: Element.prototype.scrollIntoView
    };

    // define timing method
    var now =
      w.performance && w.performance.now
        ? w.performance.now.bind(w.performance)
        : Date.now;

    /**
     * indicates if a the current browser is made by Microsoft
     * @method isMicrosoftBrowser
     * @param {String} userAgent
     * @returns {Boolean}
     */
    function isMicrosoftBrowser(userAgent) {
      var userAgentPatterns = ['MSIE ', 'Trident/', 'Edge/'];

      return new RegExp(userAgentPatterns.join('|')).test(userAgent);
    }

    /*
     * IE has rounding bug rounding down clientHeight and clientWidth and
     * rounding up scrollHeight and scrollWidth causing false positives
     * on hasScrollableSpace
     */
    var ROUNDING_TOLERANCE = isMicrosoftBrowser(w.navigator.userAgent) ? 1 : 0;

    /**
     * changes scroll position inside an element
     * @method scrollElement
     * @param {Number} x
     * @param {Number} y
     * @returns {undefined}
     */
    function scrollElement(x, y) {
      this.scrollLeft = x;
      this.scrollTop = y;
    }

    /**
     * returns result of applying ease math function to a number
     * @method ease
     * @param {Number} k
     * @returns {Number}
     */
    function ease(k) {
      return 0.5 * (1 - Math.cos(Math.PI * k));
    }

    /**
     * indicates if a smooth behavior should be applied
     * @method shouldBailOut
     * @param {Number|Object} firstArg
     * @returns {Boolean}
     */
    function shouldBailOut(firstArg) {
      if (
        firstArg === null ||
        typeof firstArg !== 'object' ||
        firstArg.behavior === undefined ||
        firstArg.behavior === 'auto' ||
        firstArg.behavior === 'instant'
      ) {
        // first argument is not an object/null
        // or behavior is auto, instant or undefined
        return true;
      }

      if (typeof firstArg === 'object' && firstArg.behavior === 'smooth') {
        // first argument is an object and behavior is smooth
        return false;
      }

      // throw error when behavior is not supported
      throw new TypeError(
        'behavior member of ScrollOptions ' +
          firstArg.behavior +
          ' is not a valid value for enumeration ScrollBehavior.'
      );
    }

    /**
     * indicates if an element has scrollable space in the provided axis
     * @method hasScrollableSpace
     * @param {Node} el
     * @param {String} axis
     * @returns {Boolean}
     */
    function hasScrollableSpace(el, axis) {
      if (axis === 'Y') {
        return el.clientHeight + ROUNDING_TOLERANCE < el.scrollHeight;
      }

      if (axis === 'X') {
        return el.clientWidth + ROUNDING_TOLERANCE < el.scrollWidth;
      }
    }

    /**
     * indicates if an element has a scrollable overflow property in the axis
     * @method canOverflow
     * @param {Node} el
     * @param {String} axis
     * @returns {Boolean}
     */
    function canOverflow(el, axis) {
      var overflowValue = w.getComputedStyle(el, null)['overflow' + axis];

      return overflowValue === 'auto' || overflowValue === 'scroll';
    }

    /**
     * indicates if an element can be scrolled in either axis
     * @method isScrollable
     * @param {Node} el
     * @param {String} axis
     * @returns {Boolean}
     */
    function isScrollable(el) {
      var isScrollableY = hasScrollableSpace(el, 'Y') && canOverflow(el, 'Y');
      var isScrollableX = hasScrollableSpace(el, 'X') && canOverflow(el, 'X');

      return isScrollableY || isScrollableX;
    }

    /**
     * finds scrollable parent of an element
     * @method findScrollableParent
     * @param {Node} el
     * @returns {Node} el
     */
    function findScrollableParent(el) {
      while (el !== d.body && isScrollable(el) === false) {
        el = el.parentNode || el.host;
      }

      return el;
    }

    /**
     * self invoked function that, given a context, steps through scrolling
     * @method step
     * @param {Object} context
     * @returns {undefined}
     */
    function step(context) {
      var time = now();
      var value;
      var currentX;
      var currentY;
      var elapsed = (time - context.startTime) / SCROLL_TIME;

      // avoid elapsed times higher than one
      elapsed = elapsed > 1 ? 1 : elapsed;

      // apply easing to elapsed time
      value = ease(elapsed);

      currentX = context.startX + (context.x - context.startX) * value;
      currentY = context.startY + (context.y - context.startY) * value;

      context.method.call(context.scrollable, currentX, currentY);

      // scroll more if we have not reached our destination
      if (currentX !== context.x || currentY !== context.y) {
        w.requestAnimationFrame(step.bind(w, context));
      }
    }

    /**
     * scrolls window or element with a smooth behavior
     * @method smoothScroll
     * @param {Object|Node} el
     * @param {Number} x
     * @param {Number} y
     * @returns {undefined}
     */
    function smoothScroll(el, x, y) {
      var scrollable;
      var startX;
      var startY;
      var method;
      var startTime = now();

      // define scroll context
      if (el === d.body) {
        scrollable = w;
        startX = w.scrollX || w.pageXOffset;
        startY = w.scrollY || w.pageYOffset;
        method = original.scroll;
      } else {
        scrollable = el;
        startX = el.scrollLeft;
        startY = el.scrollTop;
        method = scrollElement;
      }

      // scroll looping over a frame
      step({
        scrollable: scrollable,
        method: method,
        startTime: startTime,
        startX: startX,
        startY: startY,
        x: x,
        y: y
      });
    }

    // ORIGINAL METHODS OVERRIDES
    // w.scroll and w.scrollTo
    w.scroll = w.scrollTo = function() {
      // avoid action when no arguments are passed
      if (arguments[0] === undefined) {
        return;
      }

      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0]) === true) {
        original.scroll.call(
          w,
          arguments[0].left !== undefined
            ? arguments[0].left
            : typeof arguments[0] !== 'object'
              ? arguments[0]
              : w.scrollX || w.pageXOffset,
          // use top prop, second argument if present or fallback to scrollY
          arguments[0].top !== undefined
            ? arguments[0].top
            : arguments[1] !== undefined
              ? arguments[1]
              : w.scrollY || w.pageYOffset
        );

        return;
      }

      // LET THE SMOOTHNESS BEGIN!
      smoothScroll.call(
        w,
        d.body,
        arguments[0].left !== undefined
          ? ~~arguments[0].left
          : w.scrollX || w.pageXOffset,
        arguments[0].top !== undefined
          ? ~~arguments[0].top
          : w.scrollY || w.pageYOffset
      );
    };

    // w.scrollBy
    w.scrollBy = function() {
      // avoid action when no arguments are passed
      if (arguments[0] === undefined) {
        return;
      }

      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0])) {
        original.scrollBy.call(
          w,
          arguments[0].left !== undefined
            ? arguments[0].left
            : typeof arguments[0] !== 'object' ? arguments[0] : 0,
          arguments[0].top !== undefined
            ? arguments[0].top
            : arguments[1] !== undefined ? arguments[1] : 0
        );

        return;
      }

      // LET THE SMOOTHNESS BEGIN!
      smoothScroll.call(
        w,
        d.body,
        ~~arguments[0].left + (w.scrollX || w.pageXOffset),
        ~~arguments[0].top + (w.scrollY || w.pageYOffset)
      );
    };

    // Element.prototype.scroll and Element.prototype.scrollTo
    Element.prototype.scroll = Element.prototype.scrollTo = function() {
      // avoid action when no arguments are passed
      if (arguments[0] === undefined) {
        return;
      }

      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0]) === true) {
        // if one number is passed, throw error to match Firefox implementation
        if (typeof arguments[0] === 'number' && arguments[1] === undefined) {
          throw new SyntaxError('Value could not be converted');
        }

        original.elementScroll.call(
          this,
          // use left prop, first number argument or fallback to scrollLeft
          arguments[0].left !== undefined
            ? ~~arguments[0].left
            : typeof arguments[0] !== 'object' ? ~~arguments[0] : this.scrollLeft,
          // use top prop, second argument or fallback to scrollTop
          arguments[0].top !== undefined
            ? ~~arguments[0].top
            : arguments[1] !== undefined ? ~~arguments[1] : this.scrollTop
        );

        return;
      }

      var left = arguments[0].left;
      var top = arguments[0].top;

      // LET THE SMOOTHNESS BEGIN!
      smoothScroll.call(
        this,
        this,
        typeof left === 'undefined' ? this.scrollLeft : ~~left,
        typeof top === 'undefined' ? this.scrollTop : ~~top
      );
    };

    // Element.prototype.scrollBy
    Element.prototype.scrollBy = function() {
      // avoid action when no arguments are passed
      if (arguments[0] === undefined) {
        return;
      }

      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0]) === true) {
        original.elementScroll.call(
          this,
          arguments[0].left !== undefined
            ? ~~arguments[0].left + this.scrollLeft
            : ~~arguments[0] + this.scrollLeft,
          arguments[0].top !== undefined
            ? ~~arguments[0].top + this.scrollTop
            : ~~arguments[1] + this.scrollTop
        );

        return;
      }

      this.scroll({
        left: ~~arguments[0].left + this.scrollLeft,
        top: ~~arguments[0].top + this.scrollTop,
        behavior: arguments[0].behavior
      });
    };

    // Element.prototype.scrollIntoView
    Element.prototype.scrollIntoView = function() {
      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0]) === true) {
        original.scrollIntoView.call(
          this,
          arguments[0] === undefined ? true : arguments[0]
        );

        return;
      }

      // LET THE SMOOTHNESS BEGIN!
      var scrollableParent = findScrollableParent(this);
      var parentRects = scrollableParent.getBoundingClientRect();
      var clientRects = this.getBoundingClientRect();

      if (scrollableParent !== d.body) {
        // reveal element inside parent
        smoothScroll.call(
          this,
          scrollableParent,
          scrollableParent.scrollLeft + clientRects.left - parentRects.left,
          scrollableParent.scrollTop + clientRects.top - parentRects.top
        );

        // reveal parent in viewport unless is fixed
        if (w.getComputedStyle(scrollableParent).position !== 'fixed') {
          w.scrollBy({
            left: parentRects.left,
            top: parentRects.top,
            behavior: 'smooth'
          });
        }
      } else {
        // reveal element in viewport
        w.scrollBy({
          left: clientRects.left,
          top: clientRects.top,
          behavior: 'smooth'
        });
      }
    };
  }

  if (true) {
    // commonjs
    module.exports = { polyfill: polyfill };
  } else {}

}());


/***/ }),
/* 3 */
/***/ (function(module, exports) {

var candidateSelectors = [
  'input',
  'select',
  'textarea',
  'a[href]',
  'button',
  '[tabindex]',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]:not([contenteditable="false"])',
];
var candidateSelector = candidateSelectors.join(',');

var matches = typeof Element === 'undefined'
  ? function () {}
  : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;

function tabbable(el, options) {
  options = options || {};

  var regularTabbables = [];
  var orderedTabbables = [];

  var candidates = el.querySelectorAll(candidateSelector);

  if (options.includeContainer) {
    if (matches.call(el, candidateSelector)) {
      candidates = Array.prototype.slice.apply(candidates);
      candidates.unshift(el);
    }
  }

  var i, candidate, candidateTabindex;
  for (i = 0; i < candidates.length; i++) {
    candidate = candidates[i];

    if (!isNodeMatchingSelectorTabbable(candidate)) continue;

    candidateTabindex = getTabindex(candidate);
    if (candidateTabindex === 0) {
      regularTabbables.push(candidate);
    } else {
      orderedTabbables.push({
        documentOrder: i,
        tabIndex: candidateTabindex,
        node: candidate,
      });
    }
  }

  var tabbableNodes = orderedTabbables
    .sort(sortOrderedTabbables)
    .map(function(a) { return a.node })
    .concat(regularTabbables);

  return tabbableNodes;
}

tabbable.isTabbable = isTabbable;
tabbable.isFocusable = isFocusable;

function isNodeMatchingSelectorTabbable(node) {
  if (
    !isNodeMatchingSelectorFocusable(node)
    || isNonTabbableRadio(node)
    || getTabindex(node) < 0
  ) {
    return false;
  }
  return true;
}

function isTabbable(node) {
  if (!node) throw new Error('No node provided');
  if (matches.call(node, candidateSelector) === false) return false;
  return isNodeMatchingSelectorTabbable(node);
}

function isNodeMatchingSelectorFocusable(node) {
  if (
    node.disabled
    || isHiddenInput(node)
    || isHidden(node)
  ) {
    return false;
  }
  return true;
}

var focusableCandidateSelector = candidateSelectors.concat('iframe').join(',');
function isFocusable(node) {
  if (!node) throw new Error('No node provided');
  if (matches.call(node, focusableCandidateSelector) === false) return false;
  return isNodeMatchingSelectorFocusable(node);
}

function getTabindex(node) {
  var tabindexAttr = parseInt(node.getAttribute('tabindex'), 10);
  if (!isNaN(tabindexAttr)) return tabindexAttr;
  // Browsers do not return `tabIndex` correctly for contentEditable nodes;
  // so if they don't have a tabindex attribute specifically set, assume it's 0.
  if (isContentEditable(node)) return 0;
  return node.tabIndex;
}

function sortOrderedTabbables(a, b) {
  return a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex;
}

function isContentEditable(node) {
  return node.contentEditable === 'true';
}

function isInput(node) {
  return node.tagName === 'INPUT';
}

function isHiddenInput(node) {
  return isInput(node) && node.type === 'hidden';
}

function isRadio(node) {
  return isInput(node) && node.type === 'radio';
}

function isNonTabbableRadio(node) {
  return isRadio(node) && !isTabbableRadio(node);
}

function getCheckedRadio(nodes) {
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].checked) {
      return nodes[i];
    }
  }
}

function isTabbableRadio(node) {
  if (!node.name) return true;
  // This won't account for the edge case where you have radio groups with the same
  // in separate forms on the same page.
  var radioSet = node.ownerDocument.querySelectorAll('input[type="radio"][name="' + node.name + '"]');
  var checked = getCheckedRadio(radioSet);
  return !checked || checked === node;
}

function isHidden(node) {
  // offsetParent being null will allow detecting cases where an element is invisible or inside an invisible element,
  // as long as the element does not use position: fixed. For them, their visibility has to be checked directly as well.
  return node.offsetParent === null || getComputedStyle(node).visibility === 'hidden';
}

module.exports = tabbable;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(5),
    now = __webpack_require__(6),
    toNumber = __webpack_require__(10);

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
/* 5 */
/***/ (function(module, exports) {

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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(7);

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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(8);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(9)))

/***/ }),
/* 9 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(5),
    isSymbol = __webpack_require__(11);

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

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
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(12),
    isObjectLike = __webpack_require__(16);

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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(13),
    getRawTag = __webpack_require__(14),
    objectToString = __webpack_require__(15);

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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(7);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(13);

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
/* 15 */
/***/ (function(module, exports) {

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
/* 16 */
/***/ (function(module, exports) {

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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var debounce = __webpack_require__(4),
    isObject = __webpack_require__(5);

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

module.exports = throttle;


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getClosestAttribute; });
/**
 * Get an attribute for the closest element with it.
 * @param  {Element}  el
 * @param  {String}  attr
 * @return {String}
 */
function getClosestAttribute(el, attr) {
  // Ignore missing elements
  if (!el) {
    return '';
  } // Find the closest element with a mattring attribute


  el = el.closest("[".concat(attr, "]")); // If we found a match, return the attribute, otherwise
  // return an empty string.

  return el ? el.getAttribute(attr) : '';
}

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getElements; });
/* harmony import */ var _qsa__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(20);

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
    return Object(_qsa__WEBPACK_IMPORTED_MODULE_0__["default"])(elements, context);
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
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return qsa; });
/* harmony import */ var _toArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);

/**
 * QSA = "Query Selector All" that returns an Array instead of a NodeList.
 * @param  {String}   selector
 * @param  {Element}  context
 * @return {Array}
 */

function qsa(selector, context) {
  return selector ? Object(_toArray__WEBPACK_IMPORTED_MODULE_0__["default"])((context || document).querySelectorAll(selector)) : [];
}

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return toArray; });
/**
 * Convert a value to an array.
 * @param  {mixed}   val
 * @return {Array}
 */
function toArray(val) {
  return Array.prototype.slice.call(val);
}

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getStyle; });
/* harmony import */ var _hasOwnProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(23);

/**
 * Get a computed style for some element.
 * @param  {Element}  el
 * @param  {String}   prop
 * @return {String}
 */

function getStyle(el, prop) {
  var style = window.getComputedStyle(el); // Ignore mmissing elements or props

  if (!style || !Object(_hasOwnProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(style, prop)) {
    return '';
  }

  return style[prop];
}

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return hasOwnProperty; });
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
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return isObject; });
/**
 * Strict check for Objects. Literally checks whether
 * the value's constructor is "Object".
 * @param  {mixed}  val
 * @return {String}
 */
function isObject(val) {
  return val && val.constructor.name === 'Object';
}

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return minmax; });
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
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return on; });
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
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return onReady; });
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

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* eslint-disable getter-return */

/**
 * Passive Event Listeners.
 *
 * Pass this value as a 3rd argument to your event listeners
 * to dramatically improve performance.
 *
 * @see https://developers.google.com/web/updates/2016/06/passive-event-listeners
 * @see https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection
 * @type {Boolean}
 */
var passive = function () {
  var result = false;

  try {
    var opts = Object.defineProperty({}, 'passive', {
      get: function get() {
        result = {
          passive: true
        };
      }
    });
    window.addEventListener('testPassive', null, opts);
    window.removeEventListener('testPassive', null, opts);
  } catch (error) {// 🤫
  }

  return result;
}();

/* harmony default export */ __webpack_exports__["default"] = (passive);

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return pick; });
/**
 * Pick keys from an object.
 * @param  {Object} obj
 * @param  {Array}  keys
 * @return {Object}
 */
function pick(obj, keys) {
  return keys.reduce(function (result, key) {
    result[key] = obj[key];
    return result;
  }, {});
}

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _hasOwnProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(23);
/* eslint-disable no-restricted-syntax, no-var, vars-on-top */

/**
 * Helper that does the same thing as `Object.values()`. Works in IE!
 * @param  {Object}  obj
 * @return {Array}
 */

function values(obj) {
  var arr = [];

  for (var prop in obj) {
    if (Object(_hasOwnProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(obj, prop)) {
      arr.push(obj[prop]);
    }
  }

  return arr;
} // Use native code if supported, else return polyfill.
// eslint-disable-next-line no-confusing-arrow


var fn = function () {
  return typeof Object.values === 'function' ? Object.values : values;
}();

/* harmony default export */ __webpack_exports__["default"] = (fn);

/***/ })
/******/ ])["default"];
});