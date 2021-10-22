// Dependencies
import debounce from 'lodash/debounce';

// Helpers
import getElements from './helpers/getElements';
import hasOwnProperty from './helpers/hasOwnProperty';
import on from './helpers/on';
import onReady from './helpers/onReady';
import qsa from './helpers/qsa';

let nextSliderNumber = 1;

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
   * @param  {String|Element|Array}  container
   * @param  {Object}                options
   * @constructor
   */
  constructor(container, options = {}) {
    // Setup internal variables.
    /* eslint-disable quote-props */
    this.callbacks = {
      'load': [],
      'change': [],
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
  init(container, options = {}) {
    // Fill default options.
    this.options = {
      container,
      id: '',
      slides: '',
      start: 0,
      nav: '',
      buttons: '',
      prev: '',
      next: '',
      loop: false,
      on: {},
      ...options,
    };

    // Get container element.
    container = getElements(container).shift();

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

    // Set slider ID.
    this.id = this.getMaybeSetID(this.container, this.options.id);

    // Get slides.
    this.slides = this.getMaybeSetSlides(this.container, this.options.slides);

    // Get navs.
    this.navs = qsa(
      [`[data-snap-slider-nav="${this.id}"]`, this.options.nav]
        .filter((selector) => selector)
        .join(', '),
    ).map((nav) => this.addNav(nav, { buttons: this.options.buttons }));

    // Get buttons.
    const buttonSelector = this.options.buttons
      || this.container.getAttribute('data-snap-slider-buttons');
    if (buttonSelector) {
      const buttons = qsa(buttonSelector, this.container);
      this.addGotoButtons(buttons);
    }

    // Keep track of buttons.
    this.buttons = this.getButtons();

    // this.buttonsFirst = this.buttons.filter((button) => this.isRelative(button, 'first'));
    // this.buttonsMiddle = this.buttons.filter((button) => this.isRelative(button, 'middle'));
    // this.buttonsLast = this.buttons.filter((button) => this.isRelative(button, 'last'));
    this.buttonsPrev = this.buttons.filter((button) => this.isRelative(button, 'prev'));
    this.buttonsNext = this.buttons.filter((button) => this.isRelative(button, 'next'));

    // Start.
    const start = this.options.start
      || this.container.getAttribute('data-snap-slider-start')
      || 1;
    this.current = this.getIndexNumber(start);

    // Loop.
    this.loop = this.options.loop || this.container.getAttribute('data-snap-slider-loop') === 'true';

    // Callbacks.
    Object.entries(this.options.on).forEach(([eventName, callback]) => {
      this.on(eventName, callback);
    });

    // Events.
    this.maybeSetCurrentDebounce = debounce(
      this.maybeSetCurrent.bind(this),
      300,
    );

    // Intersection Observer.
    // TODO: Make intersection observer configurable.
    this.observer = new IntersectionObserver(this.observerCallback.bind(this), {
      root: this.container,
      threshold: 0.6,
    });
    this.slides.forEach((slide) => this.observer.observe(slide));

    // References.
    this.container.SnapSlider = this;
    window._SnapSliders[this.id] = this;

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
      id = `slider-${nextSliderNumber}`;
      nextSliderNumber += 1;
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
      : [...container.children];

    // Ensure all slides are focusable but not tabbable.
    slides.forEach((slide) => slide.setAttribute('tabindex', '-1'));

    // Return array of slides.
    return slides;
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
   * Get the index of the first visible slide in the slider.
   *
   * @return {Number}
   */
  getFirstVisibleIndex() {
    return this.slides.findIndex((slide) => slide.classList.contains('is-visible')) + 1;
  }

  /**
   * Is this a prev/next button, or some other relative index?
   *
   * @param  {Element}        button
   * @param  {String|Number}  index
   * @return {Boolean}
   */
  isRelative(button, index) {
    if (index) {
      return button.matches(`[data-snap-slider-goto$="${index}"]`);
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
  goto(index, options = {}) {
    index = this.getIndexNumber(index);

    const slide = this.slides[index - 1];

    // If we can't find a matching slide, abort!
    if (!slide) {
      return false;
    }

    this.setCurrent(index, options.ignoreCallbacks);

    // TODO: WTF, Safari???
    // slide.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    // slide.scrollIntoView({ behavior: 'smooth' });
    const scrollOptions = {
      top: slide.offsetTop,
      left: slide.offsetLeft,
    };

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
  static handleGoto(event) {
    const button = event.target.closest('[data-snap-slider-goto]');
    const goto = button?.getAttribute('data-snap-slider-goto') || '';

    // Parse slide index and slider ID from goto attribute.
    const args = goto.split(':').map((str) => str.trim());
    const index = args.pop();
    let sliderID = args.pop();

    // If button doesn't include slider ID, get it from nav.
    if (!sliderID) {
      const nav = button?.closest('[data-snap-slider-nav]');
      sliderID = nav?.getAttribute('data-snap-slider-nav');
    }

    // Get slider with matching ID, if it exists.
    // Otherwise, check whether the button is actually inside the slider.
    const slider = window._SnapSliders[sliderID]
      || button?.closest('[data-snap-slider]')?.SnapSlider;

    // If you still can't find a slider, abort!
    if (!slider) {
      return;
    }

    // Let the rest of the slider know a click has happened.
    // We'll wait to fire another "change" event until
    // the selected slide becomes visible.
    this.hasClicked = true;

    // Go to slide.
    slider.goto(index);
  }

  /**
   * Add multiple nav elements for the current slider.
   * Automatically hook up any buttons inside the nav.
   *
   * @param  {String|Element|Array}  navs
   * @return {Array}
   */
  // TODO: Do we need this helper?
  addNavs(navs) {
    return getElements(navs).map((nav) => this.addNav(nav));
  }

  /**
   * Add a single nav element for the current slider.
   * Automatically hook up any buttons inside the nav.
   *
   * @param  {String|Element|Array}  nav
   * @return {Element}
   */
  addNav(nav) {
    nav = getElements(nav).shift();

    // Set a data attribute assigning the nav to this slider.
    nav.setAttribute('data-snap-slider-nav', this.id);

    // Get button selectors from JavaScript, data attributes, or default to 'button'.
    // NOTE: Allow the nav's data attribute to override the parent container's options.
    const buttonSelector = this.options.buttons
      || nav.getAttribute('data-snap-slider-buttons')
      || this.container.getAttribute('data-snap-slider-buttons')
      || 'button';
    const prevSelector = this.options.prev
      || nav.getAttribute('data-snap-slider-prev')
      || this.container.getAttribute('data-snap-slider-prev');
    const nextSelector = this.options.next
      || nav.getAttribute('data-snap-slider-next')
      || this.container.getAttribute('data-snap-slider-next');

    // Get buttons.
    const buttons = qsa(
      [buttonSelector, prevSelector, nextSelector]
        .filter((selector) => selector)
        .join(', '),
      nav,
    );

    const buttonCounter = { index: 1 };

    buttons.forEach((button) => this.addGotoButton(button, buttonCounter));

    return nav;
  }

  /**
   * Get navs for the current slider.
   *
   * @return {Array}
   */
  // TODO: Deprecate in favor of `this.navs`.
  getNavs() {
    return qsa(`[data-snap-slider-nav="${this.id}"]`);
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
  addGotoButtons(buttons, counter = { index: 1 }) {
    return getElements(buttons).map((button) => this.addGotoButton(button, counter));
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
  addGotoButton(button, counter = { index: 1 }) {
    button = getElements(button).shift();

    // Skip buttons that already have goto attributes.
    if (button.hasAttribute('data-snap-slider-goto')) {
      return button;
    }

    // Custom prev/next buttons.
    if (this.options.prev && button.matches(this.options.prev)) {
      button.setAttribute('data-snap-slider-goto', 'prev');
      return button;
    }
    if (this.options.next && button.matches(this.options.next)) {
      button.setAttribute('data-snap-slider-goto', 'next');
      return button;
    }

    // TODO: Make it possible to configure prev/next terms.
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
      const index = parseInt(button.textContent.replace(/.*\b(\d+)\b.*/, '$1'), 10) || counter.index;
      button.setAttribute('data-snap-slider-goto', index);
      // Increment next index.
      counter.index = index + 1;
    }

    return button;
  }

  /**
   * Get nav buttons for the current slider.
   *
   * @return {Array}
   */
  getButtons() {
    return qsa(`
      [data-snap-slider="${this.id}"] [data-snap-slider-goto]:not([data-snap-slider-goto*=":"]),
      [data-snap-slider-nav="${this.id}"] [data-snap-slider-goto]:not([data-snap-slider-goto*=":"]),
      [data-snap-slider-goto^="${this.id}:"]
    `);
  }

  /**
   * Update the current index, slides, and buttons, then fire a change event.
   *
   * @param  {String|Number}  index
   * @param  {Boolean}        ignoreCallbacks
   * @return {Number}
   */
  setCurrent(index, ignoreCallbacks) {
    index = this.getIndexNumber(index);

    // Ignore requests for slides that don't exist.
    if (!this.getSlide(index)) {
      return -1;
    }

    // Update current index.
    this.current = index;

    // Update slides.
    this.slides.forEach((slide, i) => {
      // NOTE: Subtract 1 because the array is 0-index, but our API is 1-index.
      if (i === index - 1) {
        slide.classList.add('is-current');
      } else {
        slide.classList.remove('is-current');
      }
    });

    // Update buttons.
    this.buttons.forEach((button) => {
      if (button.getAttribute('data-snap-slider-goto') === String(index)) {
        button.classList.add('is-current');
      } else {
        button.classList.remove('is-current');
      }
    });

    // Callback: `change`.
    if (!ignoreCallbacks) {
      this.callbacks.change.forEach((fn) => fn(index));
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
  maybeSetCurrent() {
    if (!this.hasClicked) {
      this.setCurrent(this.getFirstVisibleIndex());
    }

    // Reset click every time scrolling stops.
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
  observerCallback(entries) {
    entries.forEach((entry) => {
      const slide = entry.target;
      const index = this.slides.indexOf(slide) + 1;
      const buttons = this.buttons.filter((button) => button.getAttribute('data-snap-slider-goto') === String(index));

      if (entry.isIntersecting) {
        slide.classList.add('is-visible');
        buttons.forEach((b) => b.classList.add('is-visible'));
      } else {
        slide.classList.remove('is-visible');
        buttons.forEach((b) => b.classList.remove('is-visible'));
      }
    });

    // Disable relative goto buttons.
    if (!this.loop) {
      // Prev.
      if (this.slides[0].classList.contains('is-visible')) {
        this.buttonsPrev.forEach((button) => button.classList.add('is-disabled'));
      } else {
        this.buttonsPrev.forEach((button) => button.classList.remove('is-disabled'));
      }

      // Next.
      if (this.slides[this.slides.length - 1].classList.contains('is-visible')) {
        this.buttonsNext.forEach((button) => button.classList.add('is-disabled'));
      } else {
        this.buttonsNext.forEach((button) => button.classList.remove('is-disabled'));
      }
    }

    if (this.hasLoaded) {
      this.maybeSetCurrentDebounce();
    } else {
      // Load.
      this.hasLoaded = true;
      this.container.classList.add('has-loaded');
      // Callback: `load`.
      this.callbacks.load.forEach((fn) => fn());
    }
  }

  /**
   * Add callbacks to fire on specific events.
   *
   * @param  {String}    eventName  Event name.
   * @param  {Function}  callback   Function w/ slider and event params (e.g., `fn(slider, event)`).
   * @return {void}
   */
  on(eventName, callback) {
    // Ignore invalid events.
    if (!hasOwnProperty(this.callbacks, eventName)) {
      if (process.env.NODE_ENV !== 'production') {
        console.log(`
🚫 Whoops! Snap Slider can't add events for "${eventName}".\n
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
    this.callbacks[eventName].push(callback);
  }

  /**
   * Update this slider (e.g., on resize). Basically just repositions the
   * current slide.
   *
   * @return {void}
   */
  update() {
    this.goto(this.current, {
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
    // Stop events, observers, etc.
    this.maybeSetCurrentDebounce.cancel();
    this.observer.disconnect();

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
    delete options.id;

    // Destroy the slider, then re-initialize with new options.
    this.destroy();
    this.init(this.container, { ...initialOptions, ...options });
  }

  /**
   * Handle resize events for *all* sliders.
   *
   * @return {void}
   */
  static handleResize() {
    // Update all sliders on the page.
    Object.values(window._SnapSliders).forEach((slider) => slider.update());
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
  // Initialize all sliders with data attributes.
  qsa('[data-snap-slider]').forEach((el) => new SnapSlider(el));

  // Setup click events for *all* nav elements.
  on('body', 'click', '[data-snap-slider-goto]', SnapSlider.handleGoto);

  // Setup resize events for *all* sliders.
  window.addEventListener('resize', SnapSlider.handleResize);
});

export default SnapSlider;
