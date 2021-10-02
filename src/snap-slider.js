// Dependencies
import debounce from 'lodash/debounce';

// Helpers
import getElements from './helpers/getElements';
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
    // Fill default options.
    this.options = {
      id: '',
      slides: '',
      nav: '',
      ...options,
    };

    // Get container element.
    this.container = getElements(container).shift();

    // Set slider ID.
    this.id = this.getMaybeSetID(this.container, this.options.id);

    // Get slides.
    this.slides = this.getMaybeSetSlides(this.container, this.options.slides);

    // Get navs.
    // TODO: Nav helper function?
    this.navs = qsa(
      [
        `[data-snap-slider-nav="${this.id}"]`,
        this.options.nav,
      ].filter((selector) => selector).join(', '),
    ).map((nav) => this.addNav(nav));

    // Get buttons.
    // TODO: Button helper function?
    const buttonSelector = this.container.getAttribute('data-snap-slider-buttons');
    if (buttonSelector) {
      const buttons = qsa(buttonSelector, this.container);
      const buttonCounter = { index: 1 };
      buttons.forEach((button) => this.addGotoButton(button, buttonCounter));
    }

    this.buttons = this.getButtons();

    // this.buttonsFirst = this.buttons.filter((button) => this.isRelative(button, 'first'));
    // this.buttonsMiddle = this.buttons.filter((button) => this.isRelative(button, 'middle'));
    // this.buttonsLast = this.buttons.filter((button) => this.isRelative(button, 'last'));
    this.buttonsPrev = this.buttons.filter((button) => this.isRelative(button, 'prev'));
    this.buttonsNext = this.buttons.filter((button) => this.isRelative(button, 'next'));

    // Start.
    // TODO: Should we rename `start` to `current`?
    const start = this.container.getAttribute('data-snap-slider-start') || 1;
    this.current = this.getIndexNumber(start);
    this.goto(this.current, { immediate: true });

    // Loop.
    this.loop = this.container.getAttribute('data-snap-slider-loop') === 'true';

    // Events.
    this.waitToUpdateCurrent = debounce(
      this.waitToUpdateCurrentDebounce.bind(this),
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

    // TODO: Do we need has-loaded anymore?
    this.container.classList.add('has-loaded');
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

  addNav(el) {
    // Set a data attribute assigning the nav to this slider.
    el.setAttribute('data-snap-slider-nav', this.id);

    // Get button selectors from data attribute or default to 'button'.
    // NOTE: Allow the nav's data attribute to override the parent container's options.
    const buttonSelector = el.getAttribute('data-snap-slider-buttons')
      || this.container.getAttribute('data-snap-slider-buttons')
      || 'button';

    const buttons = qsa(buttonSelector, el);

    const buttonCounter = { index: 1 };

    buttons.forEach((button) => this.addGotoButton(button, buttonCounter));

    return el;
  }

  addGotoButton(button, counter = { index: 1 }) {
    // Skip buttons that already have goto attributes.
    if (button.hasAttribute('data-snap-slider-goto')) {
      return;
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
  }

  getButtons() {
    return qsa(`
      [data-snap-slider="${this.id}"] [data-snap-slider-goto]:not([data-snap-slider-goto*=":"]),
      [data-snap-slider-nav="${this.id}"] [data-snap-slider-goto]:not([data-snap-slider-goto*=":"]),
      [data-snap-slider-goto^="${this.id}:"]
    `);
  }

  setCurrentAndWait(index, hasClicked) {
    // TODO: Where's a better place to handle this type conversion?
    index = parseInt(index, 10) || 1;

    this.current = index;
    this.hasClicked = hasClicked;

    // TODO: Update buttons helper?
    this.buttons.forEach((button) => {
      if (button.getAttribute('data-snap-slider-goto') === String(index)) {
        button.classList.add('is-current');
      } else {
        button.classList.remove('is-current');
      }
    });
  }

  waitToUpdateCurrentDebounce() {
    if (!this.hasClicked) {
      this.current = this.getFirstVisibleIndex();

      // TODO: Update buttons helper?
      const index = this.current;
      this.buttons.forEach((button) => {
        if (button.getAttribute('data-snap-slider-goto') === String(index)) {
          button.classList.add('is-current');
        } else {
          button.classList.remove('is-current');
        }
      });

      // TODO: Where should we handle is-current?
      const slide = this.getCurrentSlide();
      slide.classList.add('is-current');
    }

    // Reset click every time scrolling stops.
    this.hasClicked = false;
  }

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

    // Prev
    // TODO: Add other terms to support prev/next buttons.
    if (this.slides[0].classList.contains('is-visible')) {
      this.buttonsPrev.forEach((button) => button.classList.add('is-disabled'));
    } else {
      this.buttonsPrev.forEach((button) => button.classList.remove('is-disabled'));
    }

    // Next
    if (this.slides[this.slides.length - 1].classList.contains('is-visible')) {
      this.buttonsNext.forEach((button) => button.classList.add('is-disabled'));
    } else {
      this.buttonsNext.forEach((button) => button.classList.remove('is-disabled'));
    }

    // TODO: Add other callbacks for "change" events.
    this.waitToUpdateCurrent();
  }

  isRelative(button, index) {
    if (index) {
      return button.matches(`[data-snap-slider-goto$="${index}"]`);
    }
    return button.getAttribute('data-snap-slider-goto').matches(/first|middle|last|prev|next/);
  }

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

  getFirstVisibleIndex() {
    return this.slides.findIndex((slide) => slide.classList.contains('is-visible')) + 1;
  }

  getCurrentSlide() {
    return this.slides[this.current - 1];
  }

  goto(index, options = {}, event) {
    index = this.getIndexNumber(index);

    const slide = this.slides[index - 1];

    // If we can't find a matching slide, abort!
    if (!slide) {
      return;
    }

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

    // TODO: Better way to decide whether has clicked? Assuming there's an event?
    this.setCurrentAndWait(index, true);

    this.container.scroll(scrollOptions);
  }

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

    // Go to slide.
    slider.goto(index, {}, event);
  }

  /**
   * Destroy this slider. Stop any active transitions, remove its event
   * listeners, and delete it from our internal array of slider instances.
   *
   * @return {void}
   */
  destroy() {
    // Stop events, observers, etc.
    this.waitToUpdateCurrent.cancel();
    this.observer.disconnect();

    // Remove references to this slider.
    delete this.container.SnapSlider;
    delete window._SnapSliders[this.id];
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
  // window.addEventListener('resize', SnapSlider.handleResize);
});

export default SnapSlider;
