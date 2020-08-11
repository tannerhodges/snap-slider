// Dependencies
import elementClosest from 'element-closest';
import smoothscroll from 'smoothscroll-polyfill';
import tabbable from 'tabbable';

// Helpers
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
import getClosestAttribute from './helpers/getClosestAttribute';
import getElements from './helpers/getElements';
import getStyle from './helpers/getStyle';
import hasOwnProperty from './helpers/hasOwnProperty';
import isObject from './helpers/isObject';
import minmax from './helpers/minmax';
import on from './helpers/on';
import onReady from './helpers/onReady';
import passive from './helpers/passive';
import pick from './helpers/pick';
import qsa from './helpers/qsa';
import toArray from './helpers/toArray';
import values from './helpers/values';

// Modules
const logger = (process.env.NODE_ENV !== 'production')
  ? require('./modules/logger')
  : {};

// Internal Variables
let counter = 1;

/**
 * Snap Slider.
 * @class
 */
class SnapSlider {
  /**
   * New Snap Slider.
   *
   * See `init()` for a full breakdown of `options`.
   *
   * @param  {String|Element|Array|Object}  containerOrOptions
   * @param  {Object}                       options
   * @constructor
   */
  constructor(containerOrOptions, options = {}) {
    // Setup internal variables.
    this.terms = {
      prev: /(prev|back|before|left|up)/,
      next: /(next|forward|after|right|down)/,
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
      'scroll.end': [],
    };
    /* eslint-enable quote-props */

    this.init(containerOrOptions, options);

    // Don't construct sliders with empty containers.
    if (!this.container) {
      return;
    }

    this.watchForChanges();

    // Keep track of the slider so we can reference & debug it later.
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
  init(containerOrOptions, options = {}) {
    // Allow people to quickly spin up sliders by just passing a container
    // element, or by passing in a single options object.
    if (isObject(containerOrOptions)) {
      options = containerOrOptions;
    }

    // Fill default options.
    this.options = {
      container: containerOrOptions,
      id: '',
      slides: '',
      nav: '',
      buttons: '',
      prev: '',
      next: '',
      start: 0,
      loop: null,
      on: {},
      ...options,
    };

    // Get single element from params.
    const container = getElements(this.options.container).shift();

    // Don't construct sliders with empty containers.
    if (!container) {
      if (process.env.NODE_ENV !== 'production') {
        console.log(`
🚫 Whoops! Snap Slider can't find a container element matching "${this.options.container}".\n
🔍 Please check your selectors for typos. Make sure the element actually exists
   in the DOM when Snap Slider tries to initialize it.\n
👇 Here's a copy of the options you tried to initialize with for debugging:\n\n`, this.options, '\n\n');
      }
      return;
    }

    // Great! Now let's start initializing everything.
    this.container = container;

    // Get selectors from JavaScript or data attributes.
    this.options.buttons = options.buttons || this.container.getAttribute('data-snap-slider-buttons');
    this.options.prev = options.prev || this.container.getAttribute('data-snap-slider-prev');
    this.options.next = options.next || this.container.getAttribute('data-snap-slider-next');

    // Get and set persistent options in data attributes.
    this.id = this.getMaybeSetID(container, this.options.id);
    this.slides = this.getMaybeSetSlides(container, this.options.slides);
    this.align = this.getMaybeSetAlign(container, this.options.align);
    this.current = this.getMaybeSetStart(container, this.options.start);
    this.loop = this.getMaybeSetLoop(container, this.options.loop);

    // Reset internal variables.
    this.transition = null;
    this.scrolling = false;

    // Add custom callbacks.
    // eslint-disable-next-line no-restricted-syntax
    for (const eventName in this.options.on) {
      if (hasOwnProperty(this.options.on, eventName)) {
        this.on(eventName, this.options.on[eventName]);
      }
    }

    // Setup navigation.
    // NOTE: If left blank, `addNav()` will handle the fallbacks for button selectors.
    const navOptions = pick(this.options, [
      'buttons',
      'prev',
      'next',
    ]);

    // Init custom goto buttons in the container.
    // NOTE: "Goto" buttons are automatically handled by delegated click
    // events on the `body`. For more details, see `handleGotoClick()`.
    this.addGotoButtons({ ...navOptions, container });

    // Init standard navs with data attributes.
    this.addNav(`[data-snap-slider-nav="${this.id}"]`, navOptions);

    // Then init custom navs too.
    if (this.options.nav) {
      this.addNav(this.options.nav, navOptions);
    }

    // Go to the slide we want to start on.
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
  getMaybeSetID(container, id) {
    // Either use the ID we were given or the ID already on the container.
    id = id
      || container.getAttribute('data-snap-slider')
      || container.id;

    // If we don't have an ID, make one up and increment our internal
    // counter for the next slider.
    if (!id) {
      id = `slider-${counter}`;
      counter += 1;
    }

    // Store value in data attribute.
    container.setAttribute('data-snap-slider', id);

    // Return the final ID.
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
  getMaybeSetSlides(container, selector) {
    // Get selector from JavaScript or data attribute.
    selector = selector && typeof selector === 'string'
      ? selector
      : container.getAttribute('data-snap-slider-slides');

    // Store value in data attribute.
    container.setAttribute('data-snap-slider-slides', selector || '');

    // If selector exists, use those elements. Otherwise,
    // assume the container's immediate children are slides.
    const slides = selector
      ? getElements(selector, container)
      : toArray(container.children);

    // Ensure all slides are focusable but not tabbable.
    slides.forEach((slide) => slide.setAttribute('tabindex', '-1'));

    // Return array of slides.
    return slides;
  }

  /**
   * Get alignment fallback for a given container.
   *
   * @param  {Element}  container
   * @param  {String}   align
   * @return {String}
   */
  getMaybeSetAlign(container, align) {
    // Get align index from JavaScript, data attribute, or leave blank.
    align = align || container.getAttribute('data-snap-slider-align') || '';

    // Store value in data attribute.
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
  getMaybeSetStart(container, start) {
    // Get start index from JavaScript, data attribute, or default to 1.
    if (!SnapSlider.isValidIndex(start)) {
      start = container.getAttribute('data-snap-slider-start') || 1;
    }

    // Store value in data attribute.
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
  getMaybeSetLoop(container, loop) {
    // If we were given a Boolean value to set, use that.
    // Else check for an existing data attribute.
    // Defaults to `false`.
    loop = typeof loop === 'boolean'
      ? loop
      : container.getAttribute('data-snap-slider-loop') === 'true';

    // Store value in data attribute.
    container.setAttribute('data-snap-slider-loop', loop);

    // Return the final loop value.
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
  getSnapAlign(el) {
    // Get element's CSS align value.
    const style = getStyle(el, 'scrollSnapAlign');

    console.log('getSnapAlign', style, getClosestAttribute(el, 'data-snap-slider-align'), 'start');

    // If browser supports Scroll Snap and slide
    // has a non-empty value, return it.
    if (style && style.indexOf('none') < 0) {
      return style;
    }

    // Otherwise, fallback to the slider's align attribute.
    // Else assume "start" for everything.
    return getClosestAttribute(el, 'data-snap-slider-align')
      || 'start';
  }

  /**
   * Get a specific slide element. Accepts any valid goto alias.
   *
   * @param  {Number}   index  Starts at 1.
   * @return {Element}
   */
  getSlide(index) {
    // Convert index aliases to numbers.
    index = this.getIndexNumber(index);

    // Return the slide for that numeric index.
    // NOTE: Subtract 1 because the array is 0-index, but our API is 1-index.
    return this.slides[index - 1];
  }

  /**
   * Get the current slide element.
   *
   * @return {Element}
   */
  getCurrentSlide() {
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
  static isValidIndex(index) {
    const aliases = [
      'first',
      'middle',
      'last',
      'prev',
      'next',
    ];

    // Valid indexes are either a known alias,
    // or a positive integer.
    return aliases.indexOf(index) >= 0
      || parseInt(index, 10) >= 1;
  }

  /**
   * Get the slide number for any index.
   *
   * Returns -1 if index is invalid.
   *
   * @param  {String|Number}  index
   * @return {Number}
   */
  getIndexNumber(index) {
    let num;

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
    }

    // Return numeric index. Or, if something goes wrong,
    // fallback to the first slide.
    return num || 1;
  }

  /**
   * Get the offset we should scroll to for a specific slide.
   *
   * @param  {Element}  slide
   * @return {Object}   { top, left }
   */
  getScrollOffset(slide) {
    const { container } = this;
    const align = this.getSnapAlign(slide);

    // Calculate the 'start' position by default.
    // NOTE: This forces slides with align `none` to still snap into place.
    let top = slide.offsetTop;
    let left = slide.offsetLeft;

    // NOTE: Because Safari uses the 2-value syntax, we simply check for matching
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
    }

    // Keep offsets within the scrollable area.
    top = minmax(top, 0, container.scrollHeight);
    left = minmax(left, 0, container.scrollWidth);

    return { top, left };
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
  goto(index, options = {}, event) {
    // Fill default options.
    options = {
      // By default, focus the slide we're going to.
      focus: true,
      // Force-update the scroll position, even if we're already on the current slide.
      force: false,
      // Ignore custom callbacks for events.
      ignoreCallbacks: false,
      // Immediately update position without smooth scrolling.
      immediate: false,
      ...options,
    };

    // Get the next slide we should go to.
    const next = this.getIndexNumber(index);

    // If nothing changed, don't do anything (as long as
    // we're not trying to force it).
    if (!options.force && next === this.current) {
      return false;
    }

    // Get the next slide.
    const slide = this.getSlide(next);

    if (!slide) {
      return false;
    }

    // Scroll to it!
    const { top, left } = this.getScrollOffset(slide);

    if (options.immediate) {
      // Scroll immediately.
      this.container.scroll({ top, left });
    } else {
      // Let the event handlers know we're coming, then smooth scroll.
      this.startTransition(next);
      this.container.scroll({ top, left, behavior: 'smooth' });
    }

    // Update state.
    this.current = next;

    // We changed slides!
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
  buildGoto(nav, index = '') {
    // Start with an empty string.
    let goto = '';

    // If this button isn't part of a nav, include the slider ID.
    if (!nav) {
      goto += `${this.id}:`;
    }

    // Add the index and return.
    return goto + index;
  }

  /**
   * Set the `goto` attribute for nav buttons.
   *
   * @param  {String|Element|Array}  buttons
   * @param  {String}                index
   * @return {void}
   */
  setGoto(buttons, index) {
    buttons = getElements(buttons);

    // If we found custom prev/next buttons, set their `goto` attributes
    // before we loop through the rest of the buttons.
    buttons.forEach((button) => {
      button.setAttribute('data-snap-slider-goto', this.buildGoto(
        // Don't assume this button is grouped with the others. It may
        // be somewhere else on the page, so double check for a parent
        // slider or nav container.
        button.closest('[data-snap-slider], [data-snap-slider-nav]'),
        index,
      ));
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
  static getButtonTarget(button) {
    // Where are we going?
    const goto = button ? button.getAttribute('data-snap-slider-goto') : '';

    // Ignore missing buttons and attributes.
    if (!goto) {
      return {};
    }

    // Parse slide index and slider ID from `goto` attribute.
    const args = goto.split(':').map((str) => str.trim());
    const index = args.pop();
    let sliderID = args.pop();

    // If the slider ID wasn't included, check for a parent nav or container element.
    if (!sliderID) {
      const nav = button.closest('[data-snap-slider-nav]');
      const container = button.closest('[data-snap-slider]');

      // If it is in a nav or container, get the slider ID from there.
      if (nav) {
        sliderID = nav.getAttribute('data-snap-slider-nav');
      }

      if (container) {
        sliderID = container.getAttribute('data-snap-slider');
      }
    }

    // If there's still no slider ID, is this button already in a slider?
    if (!sliderID) {
      const slider = button.closest('data-snap-slider');

      // If it is in a slider, get the slider ID from there.
      if (slider) {
        sliderID = slider.getAttribute('data-snap-slider');
      }
    }

    return { sliderID, index };
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
  static handleGoto(event) {
    // Get the button we clicked.
    const button = event.target.closest('[data-snap-slider-goto]');

    // Get the slider we're trying to update.
    const { sliderID, index } = SnapSlider.getButtonTarget(button);
    const slider = window._SnapSliders[sliderID];

    // Make sure it actually exists.
    if (!slider) {
      return;
    }

    // Go! But only focus the slide if we're NOT clicking a prev/next button.
    slider.goto(index, null, event);
  }

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
  startTransition(next) {
    // Tell the scroll listener which slide we're transitioning to.
    this.transition = {
      from: this.current,
      to: next,
      diff: Math.abs(next - this.current),
    };

    // In case someone's fast enough to start scrolling again before our
    // scroll listener resolves the `transition` flag, or if the slide's
    // already visible and nothing actually has to scroll,
    // set a timeout to resolve the transition.
    const stuck = this.transition.to;

    // If there's already a check waiting, clear it to avoid accidentally
    // reverting to the wrong slide.
    if (this.checkTransition) {
      clearTimeout(this.checkTransition);
    }

    // Now make sure we don't get stuck!
    this.checkTransition = setTimeout(() => {
      if (this.transition.to === stuck) {
        this.stopTransition();
      }
    }, 1000);
  }

  /**
   * Stop the transitions! Set things back to normal.
   *
   * @return {void}
   */
  stopTransition() {
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
  isPrevButton(button) {
    button = getElements(button).shift();

    // Ignore missing elements.
    if (!button) {
      return false;
    }

    // Check whether the `goto` attribute is "prev".
    // If not, check the text & class for common "prev" terms.
    return (button.getAttribute('data-snap-slider-goto') || '').match(/\bprev$/)
      || button.textContent.toLowerCase().match(this.terms.prev)
      || button.className.toLowerCase().match(this.terms.prev);
  }

  /**
   * Is this a "next" button?
   *
   * @param  {String|Element|Array}  button
   * @return {Boolean}
   */
  isNextButton(button) {
    button = getElements(button).shift();

    // Ignore missing elements.
    if (!button) {
      return false;
    }

    // Check whether the `goto` attribute is "next".
    // If not, check the text & class for common "next" terms.
    return (button.getAttribute('data-snap-slider-goto') || '').match(/\bnext$/)
      || button.textContent.toLowerCase().match(this.terms.next)
      || button.className.toLowerCase().match(this.terms.next);
  }

  /**
   * Is this index a relative term? I.e., is it `prev` or `next`?
   *
   * @param  {String|Number}  index
   * @return {Boolean}
   */
  static isRelative(index) {
    return index === 'prev' || index === 'next';
  }

  /**
   * Does an index match the current slide?
   *
   * @param  {String|Number}  index
   * @return {Boolean}
   */
  isCurrent(index) {
    // Ignore relative indexes (i.e., `prev` and `next`) since they
    // always refer to one more or less than the current index.
    if (SnapSlider.isRelative(index)) {
      return false;
    }

    // Does this numeric index match the current slide?
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
  addGotoButtons(buttonsOrOptions, options = {}) {
    // Allow people to quickly add nav buttons by just passing the
    // selector, or by passing in a single options object.
    if (isObject(buttonsOrOptions)) {
      options = buttonsOrOptions;
    }

    // Fill default options.
    options = {
      container: '',
      buttons: buttonsOrOptions,
      prev: '',
      next: '',
      ...options,
    };

    // Get button elements.
    // NOTE: If someone passes an overly-generic selector (e.g., `button`)
    // this will query the entire document. In general, you should either
    // specify a container element, use specific selectors, or pass
    // the elements directly.
    const buttons = getElements(options.buttons, options.container);
    const prev = getElements(options.prev, options.container);
    const next = getElements(options.next, options.container);

    // If we found custom prev/next buttons, set their `goto` attributes
    // before we loop through the rest of the buttons.
    prev.forEach((b) => b.hasAttribute('data-snap-slider-goto') || this.setGoto(prev, 'prev'));
    next.forEach((b) => b.hasAttribute('data-snap-slider-goto') || this.setGoto(next, 'next'));

    // Keep track of the index outside of the loop so we can
    // skip prev/next buttons but still go in order.
    let nextIndex = 1;

    // Loop through the buttons and set each one's `goto` attribute.
    buttons.forEach((button) => {
      // Ignore buttons that already have a `goto` attribute.
      if (button.hasAttribute('data-snap-slider-goto')) {
        return null;
      }

      // Previous
      if (this.isPrevButton(button)) {
        return this.setGoto(button, 'prev');
      }

      // Next
      if (this.isNextButton(button)) {
        return this.setGoto(button, 'next');
      }

      // Numeric: Check the text for a number, else fallback to the next index.
      const index = parseInt(button.textContent.replace(/.*\b(\d+)\b.*/, '$1'), 10) || nextIndex;

      // Increment the next index.
      nextIndex = index + 1;

      return this.setGoto(button, index);
    });

    this.updateButtons();

    return true;
  }

  /**
   * Get navs for the current slider.
   *
   * @return {Array}
   */
  getNavs() {
    // eslint-disable-next-line arrow-body-style
    return qsa('[data-snap-slider-nav]').filter((nav) => {
      // Only return navs targeting the current slider.
      return nav.getAttribute('data-snap-slider-nav') === this.id;
    });
  }

  /**
   * Get nav buttons for the current slider.
   *
   * @return {Array}
   */
  getButtons() {
    return qsa('[data-snap-slider-goto]').filter((button) => {
      const { sliderID } = SnapSlider.getButtonTarget(button);
      // Only return buttons targeting the current slider.
      return sliderID === this.id;
    });
  }

  /**
   * Update nav buttons for the current slider.
   *
   * @return {void}
   */
  updateButtons() {
    // Wait until the slider has initialized.
    if (!this.current) {
      return;
    }

    // Loop through all the nav buttons.
    this.getButtons().forEach((button) => {
      // Figure out which slide it's for...
      const { index } = SnapSlider.getButtonTarget(button);

      // And update its class.
      if (this.isCurrent(index)) {
        button.classList.add('is-current');
      } else {
        button.classList.remove('is-current');
      }

      // Also, enable/disable relative buttons unless `loop` is on.
      if (!this.loop && SnapSlider.isRelative(index)) {
        // Disable prev button on first slide.
        // Disable next button on last slide.
        const disabled = (index === 'prev' && this.current === 1)
          || (index === 'next' && this.current === this.slides.length);

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
  updateSlides() {
    this.slides.forEach((slide, index) => {
      // NOTE: Subtract 1 because the array is 0-index, but our API is 1-index.
      if (index === this.current - 1) {
        slide.classList.add('is-current');
        slide.removeAttribute('aria-hidden');

        // Enable tabbing for current slide
        qsa('[data-snap-slider-tabindex]', slide).forEach((tab) => {
          tab.removeAttribute('tabindex');
        });
      } else {
        slide.classList.remove('is-current');
        slide.setAttribute('aria-hidden', 'true');

        // Disable tabbing for non-current slides
        tabbable(slide).forEach((tab) => {
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
  addNav(containerOrOptions, options = {}) {
    // Allow people to quickly add a nav by just passing a container
    // element, or by passing in a single options object.
    if (isObject(containerOrOptions)) {
      options = containerOrOptions;
    }

    // Fill default options.
    options = {
      container: containerOrOptions,
      buttons: '',
      prev: '',
      next: '',
      ...options,
    };

    // Get matching nav containers.
    const navContainers = getElements(options.container);

    // Don't add navs without container elements.
    if (!navContainers.length) {
      return false;
    }

    navContainers.forEach((navContainer) => {
      // Set a data attribute assigning the nav to this slider.
      navContainer.setAttribute('data-snap-slider-nav', this.id);

      // Get button selectors from JavaScript, data attribute, or default to 'button'.
      // NOTE: In this case, allow the nav's data attribute to override the parent
      // container's options.
      const buttons = navContainer.getAttribute('data-snap-slider-buttons')
        || options.buttons
        || 'button';
      const prev = options.prev || navContainer.getAttribute('data-snap-slider-prev');
      const next = options.next || navContainer.getAttribute('data-snap-slider-next');

      // And add them.
      this.addGotoButtons({
        container: navContainer,
        buttons,
        prev,
        next,
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
  getClosest() {
    return this.slides.reduce((prev, slide, index) => {
      // 1-index to stay consistent with our API.
      index += 1;

      // How far away are we from the next slide's active offset position?
      const offset = this.getScrollOffset(slide);
      const diff = {
        top: Math.abs(this.container.scrollTop - offset.top),
        left: Math.abs(this.container.scrollLeft - offset.left),
      };

      // Save the next slide's info to compare with other slides.
      const next = { index, slide, diff };

      // If this is the first slide, return it and compare the next one.
      if (!prev) {
        return next;
      }

      // Compare each slide to see which one is the closest to its active offset position.
      // As soon as the next slide is at least as close as the previous one, return it.
      if (next.diff.left <= prev.diff.left && next.diff.top <= prev.diff.top) {
        return next;
      }

      // Otherwise, keep the last closest slide.
      return prev;
    // Init with `false` so the first slide gets processed just like the rest of them.
    }, false);
  }

  /**
   * Watch the container scroll for when the current slide changes.
   *
   * @return {void}
   */
  watchForChanges() {
    // Scroll listener. Save so we can remove it during `destroy()`.
    this.scrollListener = throttle((event) => {
      // Which slide is closest to their active offset position?
      const closest = this.getClosest();

      // If someone's passively scrolling (i.e., not in a transition),
      // then  as soon as we've scrolled to another slide, mark that
      // slide as the new current one and fire a change event.
      if (!this.transition && closest.index !== this.current) {
        this.current = closest.index;
        this.fireEvent('change', event);
      }

      // If we just started scrolling, update state and
      // fire a `scroll.start` event.
      if (!this.scrolling) {
        this.scrolling = true;
        this.fireEvent('scroll.start', event);
      }

      // Fire a generic `scroll` event.
      this.fireEvent('scroll', event);
    }, 250);

    // Scroll end listener. Save so we can remove it during `destroy()`.
    this.scrollEndListener = debounce((event) => {
      // We're done scrolling!
      this.scrolling = false;
      this.fireEvent('scroll.end', event);

      // Clear any previous transition checks.
      // NOTE: This has to happen *after* we fire the `scroll.end` event,
      // otherwise `handleFocus` won't be able to access `this.transition`.
      this.stopTransition();
    }, 250);

    // Arrow key listener. Save so we can remove it during `destroy()`.
    this.arrowKeyListener = throttle((event) => {
      // Ignore events that have already been prevented.
      if (event.defaultPrevented) {
        return;
      }

      // Listen for arrow keys.
      // @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
      const isPrev = ['Up', 'ArrowUp', 'Left', 'ArrowLeft'].indexOf(event.key) >= 0;
      const isNext = ['Down', 'ArrowDown', 'Right', 'ArrowRight'].indexOf(event.key) >= 0;

      // Ignore non-arrow keys.
      if (!isPrev && !isNext) {
        return;
      }

      // Go to the next or previous slide.
      this.goto(isNext ? 'next' : 'prev', null, event);

      // Prevent default browser scroll.
      event.preventDefault();
    }, 250);

    // Focus listener. Save so we can remove it during `destroy()`.
    this.focusListener = (event) => {
      // Only trigger `goto` on focus when we're not passively scrolling.
      // However, if someone manually triggered a transition then
      // allow them to click or tab away to a different slide.
      if (this.scrolling && !this.transition) {
        return;
      }

      // Get slide + index.
      let slide;
      let index;

      this.slides.forEach((s, i) => {
        if (s.contains(event.target)) {
          slide = s;
          index = i + 1;
        }
      }, null);

      // If there's a matching slide, go to it.
      if (slide) {
        this.goto(index, null, event);
      }
    };

    // Add all our listeners.
    // Set timeout to avoid initial `goto` event triggering a scroll listener.
    setTimeout(() => {
      this.container.addEventListener('scroll', this.scrollListener, passive);
      this.container.addEventListener('scroll', this.scrollEndListener, passive);
      this.container.addEventListener('keydown', this.arrowKeyListener);
      this.container.addEventListener('focusin', this.focusListener);

      // Done loading!
      this.fireEvent('load');
    }, 100);
  }

  /**
   * Update the slider on load.
   *
   * @return {void}
   */
  hasLoaded() {
    this.container.classList.add('has-loaded');
  }

  /**
   * Update this slider (e.g., on resize). Basically just repositions the
   * current slide.
   *
   * @return {void}
   */
  update() {
    // Make sure we're still on the current slide.
    this.goto(this.current, {
      focus: false,
      force: true,
      ignoreCallbacks: true,
      immediate: true,
    });
  }

  /**
   * Destroy this slider. Stop any active transitions, remove its event
   * listeners, and delete it from our internal array of slider instances.
   *
   * @return {void}
   */
  destroy() {
    // Stop running transitions, event listeners, etc.
    this.stopTransition();
    this.container.removeEventListener('scroll', this.scrollListener);
    this.container.removeEventListener('scroll', this.scrollEndListener);
    this.container.removeEventListener('keydown', this.arrowKeyListener);

    // Reset callbacks.
    // eslint-disable-next-line no-restricted-syntax
    for (const eventName in this.callbacks) {
      if (hasOwnProperty(this.callbacks, eventName)) {
        this.callbacks[eventName] = [];
      }
    }

    // Remove references to this slider.
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
  reset(options = {}) {
    // Copy initial options.
    const initialOptions = this.options;

    // Remove initial callbacks to avoid duplicating them.
    delete initialOptions.on;

    // Don't let people reset critical options during reset (e.g., slider ID).
    delete options.container;
    delete options.id;

    // Re-initialize this slider with initial options + overrides.
    this.init(this.container, { ...initialOptions, ...options });
  }

  /**
   * Handle resize events for *all* sliders.
   *
   * @return {void}
   */
  static handleResize() {
    // Loop through all sliders on the page.
    values(window._SnapSliders).forEach((slider) => slider.update());
  }

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
  fireEvent(eventName, event, options = {}) {
    // Ignore invalid events.
    if (!hasOwnProperty(this.callbacks, eventName)) {
      return;
    }

    // Fill default options.
    options = {
      // By default, focus the slide we're going to.
      focus: true,
      // Ignore custom callbacks for events.
      ignoreCallbacks: false,
      ...options,
    };

    // Required: Update slider attributes on load.
    if (eventName === 'load') {
      this.hasLoaded();
    }

    // Required: Update buttons and slides on every change.
    if (eventName === 'change') {
      this.updateButtons();
      this.updateSlides();
    }

    // Allow focus events to be ignored.
    if (options.focus) {
      this.handleFocus(eventName, event);
    }

    // Allow callbacks to be ignored.
    if (options.ignoreCallbacks) {
      return;
    }

    // Fallback object for `null` events.
    event = event || {};

    // Include more granular event types for easier callbacks.
    const events = [eventName];

    if (hasOwnProperty(this.callbacks, `${eventName}.${event.type}`)) {
      events.push(`${eventName}.${event.type}`);
    }

    // Fire all the callbacks for each event.
    events.forEach((name) => {
      this.callbacks[name].forEach((callback) => {
        if (typeof callback === 'function') {
          callback(this, event);
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
  handleFocus(eventName, event) {
    // Only handle focus for manually triggered changes (e.g., clicks and key presses).
    // Ignore passive scrolling to avoid mistakenly hijacking someone's focus.
    if (!this.transition) {
      return;
    }

    // Only focus the slide if we're NOT clicking a prev/next button.
    if (event && eventName === 'change') {
      // Did we click a button?
      const button = event.target.closest('[data-snap-slider-goto]');
      const { index } = SnapSlider.getButtonTarget(button);

      // If we clicked a relative button, get out.
      if (SnapSlider.isRelative(index)) {
        return;
      }
    }

    // If we're only transitioning one slide over, focus immediately on change.
    if (this.transition.diff <= 1 && eventName === 'change') {
      this.getCurrentSlide().focus({ preventScroll: true });
    }

    // If we're transitioning across multiple slides, wait until the scroll ends to focus.
    // Otherwise, we'll cause the scroll to flicker.
    if (this.transition.diff > 1 && eventName === 'scroll.end') {
      // Only focus the slide if we haven't already focused on another
      // element during the transition.
      if (!document.activeElement
        || document.activeElement === document.body
        || document.activeElement.closest('[data-snap-slider-goto]')) {
        this.getCurrentSlide().focus({ preventScroll: true });
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
  on(event, callback) {
    // Ignore invalid events.
    if (!hasOwnProperty(this.callbacks, event)) {
      if (process.env.NODE_ENV !== 'production') {
        console.log(`
🚫 Whoops! Snap Slider can't add events for "${event}".\n
📝 Please make sure your event matches one of the ones in this list:\n\n`, Object.keys(this.callbacks), '\n\n');
      }
      return;
    }

    // Ignore invalid callbacks.
    if (typeof callback !== 'function') {
      if (process.env.NODE_ENV !== 'production') {
        console.log(`
  🚫 Whoops! Snap Slider can only add functions as callbacks.\n
  👀 It looks like you passed a "${typeof callback}" instead.\n\n`, callback, '\n\n');
      }
      return;
    }

    // Add the callback for our event.
    this.callbacks[event].push(callback);
  }

  /**
   * Log that we couldn't find the element you're looking for.
   *
   * @param  {mixed}  element
   * @return {void}
   */
  static notFound(element) {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`
😢 Oh no! Snap Slider couldn't find a slider for "${element}".\n
-------------------------------------------------------------------------------------------
ℹ️ NOTE: Make sure the elements you're trying to debug have a \`data-snap-slider\` attribute.
-------------------------------------------------------------------------------------------\n\n`);
    }
  }

  /**
   * Get the `SnapSlider` object for a slider based on its ID.
   *
   * @param  {String}      id
   * @return {SnapSlider}
   */
  static get(id) {
    return window._SnapSliders[id];
  }

  /**
   * `console.log` info about a slider, its nav, or goto buttons.
   *
   * @param  {String|Element|Array} idOrElements
   * @return {void}
   */
  static debug(idOrElements) {
    if (process.env.NODE_ENV !== 'production') {
      /* eslint-disable no-irregular-whitespace */
      let elements = [];

      // 1. Debug all sliders by default.
      if (arguments.length === 0) {
        idOrElements = '[data-snap-slider]';
      }

      // 2. Debug a slider by its ID.
      if (typeof idOrElements === 'string'
        && hasOwnProperty(window._SnapSliders, idOrElements)) {
        idOrElements = `[data-snap-slider="${idOrElements}"]`;
      }

      // 3. Debug slider elements.
      elements = getElements(idOrElements);

      if (!elements.length) {
        SnapSlider.notFound(idOrElements);
        return;
      }

      // Debug all the things!
      elements.forEach((el, i) => {
        // What are we debugging? Is this a button, nav, or container?
        const button = el.closest('[data-snap-slider-goto]');
        const nav = el.closest('[data-snap-slider-nav]');
        const container = el.closest('[data-snap-slider]');

        // If we're debugging more than one element at a time,
        // add the index # to each section heading.
        const num = elements.length > 1 ? `#${i + 1} ` : '';

        // 2a. Buttons
        if (button) {
          // Get details for the target slider & slide.
          const target = SnapSlider.getButtonTarget(button);
          const slider = window._SnapSliders[target.sliderID];

          // Make sure slide index is valid.
          const { index } = target;
          const slideIndex = SnapSlider.isValidIndex(index)
            ? `"${index}"`
            : `🚫 "${index}" - Yikes! This index is invalid.\n\nUse a positive number instead, or one of the following aliases:\n
  ${['first', 'middle', 'last', 'prev', 'next'].map((a) => `• ${a}`).join('\n')}`;

          // "We couldn't find anything."
          const sliderID = target.sliderID
            ? `"${target.sliderID}"`
            : `🤷‍♀️ We couldn't find any.\n
  • Make sure your button is inside a \`data-snap-slider-nav\` element, or...
  • Include the slider ID you want to target in your \`data-snap-slider-goto\` attribute.
      ◦ For example, \`data-snap-slider-goto="example-slider:${target.index || 'prev'}"\`.`;

          let sliderContainer = `🤷‍♀️ We couldn't find any.\n
  • Double check that your slider ID is correct (👆).
  • Make sure your slider has the same ID in its \`data-snap-slider\` attribute.
      ◦ For example, \`data-snap-slider="example-slider"\`.`;
          let slideIndexNumber = `🤷‍♀️ We couldn't find any.\n
  • Double check that your index is valid (👆).
  • Make sure a slide actually exists at that index (👇).`;
          let slide = `🤷‍♀️ We couldn't find any.\n
  • Double check that your index is valid (👆).
  • Make sure a slide actually exists at that index.
  • Make sure your slider recognizes the slide element as a slide.`;

          // We found it!
          if (slider && slider.container) {
            sliderContainer = slider.container;
            slideIndexNumber = slider.getIndexNumber(index);
            slide = slider.getSlide(index);
          }

          // Log 'em.
          return logger.section({
            heading: `🕹 Button ${num}`,
            description: button,
            groups: [
              {
                heading: '1. What slider is this button targeting?',
                items: [
                  { heading: 'Slider ID', description: sliderID },
                  { heading: 'Slider Element', description: sliderContainer },
                  { heading: 'Slider Object', description: slider || "🤷‍♀️ We couldn't find any." },
                ],
              },
              {
                heading: '2. Which slide will it go to?',
                items: [
                  { heading: 'Slide Index', description: slideIndex },
                  { heading: 'Slide Index (Number)', description: slideIndexNumber },
                  { heading: 'Slide Element', description: slide },
                ],
              },
            ],
            collapsed: true,
          });
        }

        // 2b. Navigation
        if (nav) {
          // Get details for the target slider
          let sliderID = nav.getAttribute('data-snap-slider-nav');
          const slider = window._SnapSliders[sliderID];
          let buttons = qsa('[data-snap-slider-goto]', nav);

          // "We couldn't find anything."
          sliderID = sliderID
            ? `"${sliderID}"`
            : `🤷‍♀️ We couldn't find any.\n
  • Include the slider ID you want to target in your \`data-snap-slider-nav\` attribute.
      ◦ For example, \`data-snap-slider-nav="example-slider"\`.`;

          let sliderContainer = `🤷‍♀️ We couldn't find any.\n
  • Make sure the ID in your container's \`data-snap-slider\` attribute and the ID in your nav's \`data-snap-slider-nav\` attribute both match.`;

          if (!buttons.length) {
            buttons = `🤷‍♀️ We couldn't find any.\n
  • Make sure your buttons have a \`data-snap-slider-goto\` attribute.`;
          }

          // We found it!
          if (slider && slider.container) {
            sliderContainer = slider.container;
          }

          // Log 'em.
          return logger.section({
            heading: `🗺 Navigation ${num}`,
            description: nav,
            groups: [
              {
                heading: '1. What slider is this nav targeting?',
                items: [
                  { heading: 'Slider ID', description: sliderID },
                  { heading: 'Slider Element', description: sliderContainer },
                  { heading: 'Slider Object', description: slider || "🤷‍♀️ We couldn't find any." },
                ],
              },
              {
                heading: '2. What buttons are in this nav?',
                items: [{ heading: 'Buttons', description: buttons }],
              },
            ],
            collapsed: true,
          });
        }

        // 2c. Containers (aka sliders)
        if (container) {
          // Get details for the slider.
          let sliderID = container.getAttribute('data-snap-slider');
          const slider = window._SnapSliders[sliderID];
          let navs = qsa(`[data-snap-slider-nav="${sliderID}"]`);
          let buttons = slider ? slider.getButtons() : [];

          // "We couldn't find anything."
          sliderID = sliderID
            ? `"${sliderID}"`
            : `🤷‍♀️ We couldn't find any.\n
  • Include the slider ID you want in your \`data-snap-slider\` attribute.
      ◦ For example, \`data-snap-slider="example-slider"\`.`;

          if (!navs.length) {
            navs = `🤷‍♀️ We couldn't find any.\n
  • Make sure the ID in your container's \`data-snap-slider\` attribute and the ID in your nav's \`data-snap-slider-nav\` attribute both match.`;
          }

          if (!buttons.length) {
            buttons = `🤷‍♀️ We couldn't find any.\n
  • Make sure your button is inside a \`data-snap-slider-nav\` element, or...
  • Include the slider ID you want to target in your \`data-snap-slider-goto\` attribute.
      ◦ For example, \`data-snap-slider-goto="example-slider:prev"\`.`;
          }

          // Log 'em.
          return logger.section({
            heading: `🥨 Slider ${num}`,
            description: container,
            groups: [
              {
                heading: '1. What slider is this?',
                items: [
                  { heading: 'Slider ID', description: sliderID },
                  { heading: 'Slider Object', description: slider || "🤷‍♀️ We couldn't find any." },
                ],
              },
              {
                heading: '2. What navs target this slider?',
                items: [{ heading: 'Navs', description: navs }],
              },
              {
                heading: '3. What buttons target this slider?',
                items: [{ heading: 'Buttons', description: buttons }],
              },
            ],
            collapsed: true,
          });
        }

        return SnapSlider.notFound(idOrElements);
      });
      /* eslint-enable no-irregular-whitespace */
    }
  }
}

// Keep track of all the sliders on the page to reference.
window._SnapSliders = [];

// Make the constructor globally accessible.
window.SnapSlider = SnapSlider;

// If jQuery exists, integrate.
if (typeof $ !== 'undefined') {
  // eslint-disable-next-line no-undef, func-names
  $.fn.snapSlider = function (options) {
    return new SnapSlider(this, options);
  };
}

// Auto-init once the DOM is ready.
onReady(() => {
  // Init polyfills.
  elementClosest(window);
  smoothscroll.polyfill();

  // Initialize all sliders with data attributes.
  qsa('[data-snap-slider]').forEach((el) => new SnapSlider(el));

  // Setup click events for *all* nav elements.
  on('body', 'click', '[data-snap-slider-goto]', SnapSlider.handleGoto);

  // Setup resize events for *all* sliders.
  window.addEventListener('resize', SnapSlider.handleResize);
});

export default SnapSlider;
