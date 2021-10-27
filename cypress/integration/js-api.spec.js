/* eslint-disable no-unused-expressions */

describe('JS API', () => {
  describe('Initialization', () => {
    beforeEach(() => {
      cy.visit('/test-js-api.html');
    });

    it('can init with a string selector', () => {
      cy.window().then((win) => {
        // Get Snap Slider + container element.
        const { document, SnapSlider } = win;
        const el = document.querySelector('.example');

        // Init slider.
        const slider = new SnapSlider('.example', { id: 'test' });

        // We know SnapSlider initialized if the slider's
        // container property matches the slider element.
        expect(slider.container).to.equal(el);
      });
    });

    it('can init with an element', () => {
      cy.window().then((win) => {
        // Get Snap Slider + container element.
        const { document, SnapSlider } = win;
        const el = document.querySelector('.example');

        // Init slider.
        const slider = new SnapSlider(el, { id: 'test' });

        // We know SnapSlider initialized if the slider's
        // container property matches the slider element.
        expect(slider.container).to.equal(el);
      });
    });

    it('can init the first element in an array', () => {
      cy.window().then((win) => {
        // Get Snap Slider + container element.
        const { document, SnapSlider } = win;
        const els = document.querySelectorAll('.example');

        // Init slider.
        const slider = new SnapSlider(els, { id: 'test' });

        // We know SnapSlider initialized if the slider's
        // container property matches the slider element.
        expect(slider.container).to.equal(els[0]);
      });
    });

    it('logs an error for missing elements', () => {
      cy.window().then((win) => {
        // Get Snap Slider.
        const { SnapSlider } = win;

        // Spy on calls to `console.log`.
        // @see https://github.com/cypress-io/cypress/issues/4808#issuecomment-514974175
        // @see https://medium.com/cypress-io-thailand/understand-stub-spy-apis-that-will-make-your-test-better-than-ever-on-cypress-io-797cb9eb205a
        cy.wrap(cy.spy(win.console, 'log')).as('spyWinConsoleLog');

        // Try to init slider.
        // eslint-disable-next-line no-new
        new SnapSlider('.fake');
      });

      // Expect log with "Whoops" message.
      // @see https://docs.cypress.io/guides/references/assertions.html#Sinon-Chai
      cy.get('@spyWinConsoleLog').should('be.called')
        .and('be.calledWithMatch', 'Whoops');
    });

    it('can set a custom slider ID', () => {
      cy.initSlider('.example', {
        id: 'custom-id',
      });

      // If we can get a slider with that ID, we know it worked.
      cy.getSlider('custom-id');
    });

    it('sets a default slider ID', () => {
      cy.initSlider('.example');

      // Check to see if the default slider ID is set.
      // Should be `slider-#`, where # is the count of generated slider IDs.
      cy.get('[data-snap-slider]')
        .invoke('attr', 'data-snap-slider')
        .should('equal', 'slider-1');
    });

    it('increments the default slider ID for new sliders', () => {
      // Create a slider.
      cy.initSlider('.example');

      // Make sure the slider ID starts at 1.
      cy.get('[data-snap-slider]')
        .invoke('attr', 'data-snap-slider')
        .should('equal', 'slider-1');

      // Destroy all sliders on the page.
      cy.window().then((win) => {
        Object.values(win._SnapSliders).forEach((slider) => {
          // NOTE: Forcefully remove data attribute since `destroy()` only handles listeners, etc.
          slider.container.removeAttribute('data-snap-slider');
          slider.destroy();
        });
      });

      // Recreate the slider.
      cy.initSlider('.example');

      // Make sure its ID incremented to 2.
      cy.get('[data-snap-slider]')
        .invoke('attr', 'data-snap-slider')
        .should('equal', 'slider-2');
    });

    it('considers the container\'s children slides by default', () => {
      cy.initSlider('.example', { id: 'test' });

      cy.getSlider('test').then(($el) => {
        const slider = $el.get(0).SnapSlider;
        const slides = Array.from(slider.container.children);

        expect(slider.slides).to.deep.equal(slides);
      });
    });

    it('can specify slide elements', () => {
      // Add a non-slide element to the slider.
      cy.get('.example').then(($el) => {
        $el.prepend('<li id="ignore-me">NOT a slide element.</li>');
      });

      // Init the slider, but specify which elements should be considered slides.
      cy.initSlider('.example', {
        id: 'test',
        slides: '.example__slide',
      });

      // Make sure the real slides are tracked, but not the non-slide element.
      cy.getSlider('test').then(($el) => {
        const slider = $el.get(0).SnapSlider;
        const slides = Array.from(slider.container.querySelectorAll('.example__slide'));
        const fake = slider.container.querySelector('#ignore-me');

        expect(slider.slides).to.deep.equal(slides);
        expect(slider.slides).to.not.include(fake);
      });
    });

    it('can specify the fallback alignment for older browsers', () => {
      // Init the slider, but specify which elements should be considered slides.
      cy.initSlider('.example', {
        id: 'test',
        align: 'end',
      });

      // Make sure the real slides are tracked, but not the non-slide element.
      cy.getSlider('test').then(($el) => {
        const slider = $el.get(0).SnapSlider;
        const align = slider.container.getAttribute('data-snap-slider-align');

        expect(align).to.equal('end');
      });
    });

    it('inits nav elements', () => {
      cy.initSlider('.example', {
        id: 'test',
        nav: '.example-nav',
      });

      // We know the nav loaded correctly if all its buttons
      // have `[data-snap-slider-goto]` attributes.
      cy.getSliderNav('test')
        .find('button')
        .should('have.attr', 'data-snap-slider-goto');
    });

    it('inits goto buttons', () => {
      cy.initSlider('.example', {
        id: 'test',
        nav: '.example-nav',
        buttons: '.only-these-buttons',
      });

      // Make sure slider hasn't scrolled yet.
      cy.getSlider('test').invoke('scrollLeft').should('equal', 0);

      // Click an inactive goto button and confirm slider did not scroll.
      cy.get('#buttons .example-nav__button').contains('4').click();
      cy.getSlider('test').invoke('scrollLeft').should('equal', 0);

      // Click an active goto button and confirm slider scrolled.
      cy.get('#buttons [data-snap-slider-goto="next"]').click();
      cy.getSlider('test').invoke('scrollLeft').should('not.equal', 0);
    });

    it('inits prev/next buttons', () => {
      cy.initSlider('.example', {
        id: 'test',
        nav: '.example-nav',
        buttons: '.selector-that-does-not-match-prev-next',
        prev: '#prev',
        next: '#next',
      });

      // Make sure slider hasn't scrolled yet.
      cy.getSlider('test').invoke('scrollLeft').should('equal', 0);

      // Click the next button and confirm slider scrolled.
      cy.get('#next').click();
      cy.getSlider('test').invoke('scrollLeft').should('not.equal', 0);

      // Click the prev button and confirm slider scrolled.
      cy.get('#prev').click();
      cy.getSlider('test').invoke('scrollLeft').should('equal', 0);
    });

    it('starts on the first slide by default', () => {
      cy.initSlider('.example', { id: 'test' });

      cy.getSlider('test').then(($el) => {
        const slider = $el.get(0).SnapSlider;

        expect(slider.current).to.equal(1);
        expect(slider.container.scrollLeft).to.equal(0);
      });
    });

    it('can start on a different slide', () => {
      cy.initSlider('.example', {
        id: 'test',
        start: 2,
      });

      cy.getSlider('test').then(($el) => {
        const slider = $el.get(0).SnapSlider;

        expect(slider.current).to.equal(2);
        expect(slider.container.scrollLeft).to.not.equal(0);
      });
    });

    it('can set `start` to any goto alias', () => {
      cy.initSlider('.example', {
        id: 'test',
        start: 'middle',
      });

      cy.getSlider('test').then(($el) => {
        const slider = $el.get(0).SnapSlider;

        expect(slider.current).to.equal(2);
        expect(slider.container.scrollLeft).to.not.equal(0);
      });
    });

    it('can loop', () => {
      cy.initSlider('.example', {
        id: 'test',
        nav: '.example-nav',
        loop: true,
      });

      // Make sure slider hasn't scrolled yet.
      cy.getSlider('test').then(($el) => {
        const slider = $el.get(0).SnapSlider;
        expect(slider.current).to.equal(1);
      });
      cy.getSlider('test').invoke('scrollLeft').should('equal', 0);

      // Click the prev button and confirm slider scrolled to last slide.
      cy.get('#prev').click();
      cy.getSlider('test').then(($el) => {
        const slider = $el.get(0).SnapSlider;
        expect(slider.current).to.equal(4);
      });
      cy.getSlider('test').invoke('scrollLeft').should('not.equal', 0);

      // Click the next button and confirm slider scrolled back to the first slide.
      cy.get('#next').click();
      cy.getSlider('test').then(($el) => {
        const slider = $el.get(0).SnapSlider;
        expect(slider.current).to.equal(1);
      });
      cy.getSlider('test').invoke('scrollLeft').should('equal', 0);
    });

    it('can add custom callbacks', () => {
      const fn = cy.stub();

      cy.initSlider('.example', {
        id: 'test',
        on: { load: fn },
      });

      cy.getSlider('test').then(() => {
        // eslint-disable-next-line no-unused-expressions
        expect(fn).to.be.called;
      });
    });
  });

  describe('Instance Methods', () => {
    beforeEach(() => {
      cy.visit('/test-js-api.html');
      cy.initSlider('.example', { id: 'test' });
    });

    it('`getSlide()` returns the slide element for a given index', () => {
      cy.getSlider('test').then(($el) => {
        const slider = $el.get(0).SnapSlider;
        const slides = Array.from(slider.container.children);

        // Invalid
        expect(slider.getSlide(999)).to.equal(undefined);
        expect(slider.getSlide('fake')).to.equal(undefined);

        // Numbers
        expect(slider.getSlide(1)).to.equal(slides[0]);

        // Aliases
        expect(slider.getSlide('middle')).to.equal(slides[1]);
        expect(slider.getSlide('next')).to.equal(slides[1]);

        // Loop Off
        expect(slider.getSlide('prev')).to.equal(undefined);

        // Loop On
        slider.loop = true;
        expect(slider.getSlide('prev')).to.equal(slides[3]);
      });
    });

    it('`getCurrentSlide()` returns the current slide element', () => {
      cy.getSlider('test').then(($el) => {
        const slider = $el.get(0).SnapSlider;
        const slides = Array.from(slider.container.children);

        // On load
        expect(slider.getCurrentSlide()).to.equal(slides[0]);

        // After changing slides
        slider.goto(2);
        expect(slider.getCurrentSlide()).to.equal(slides[1]);
      });
    });

    it('`goto()` works for any valid index', () => {
      cy.getSlider('test').then(($el) => {
        const slider = $el.get(0).SnapSlider;

        // Numbers
        slider.goto(2);
        expect(slider.current).to.equal(2);

        // Numeric Strings
        slider.goto('3');
        expect(slider.current).to.equal(3);

        // Aliases
        slider.goto('first');
        expect(slider.current).to.equal(1);
        slider.goto('middle');
        expect(slider.current).to.equal(2);
        slider.goto('last');
        expect(slider.current).to.equal(4);
        slider.goto('prev');
        expect(slider.current).to.equal(3);
        slider.goto('next');
        expect(slider.current).to.equal(4);
      });
    });

    it('`goto()` can force-update the current slide', () => {
      cy.getSlider('test').then(($el) => {
        // Setup a callback to test whether the force-update works.
        const slider = $el.get(0).SnapSlider;
        const callback = cy.spy();
        slider.on('change', callback);

        // Make sure callbacks aren't normally called.
        slider.goto('first');
        expect(callback).to.not.be.called;

        // But if we force-update then it is called.
        slider.goto('first', { force: true });
        expect(callback).to.be.called;
      });
    });

    it('`goto()` can scroll immediately instead of smooth scrolling', () => {
      cy.getSlider('test').then(($el) => {
        const slider = $el.get(0).SnapSlider;

        // Make sure smooth scrolling happens over time, that it
        // doesn't reach its final position in a single frame).
        slider.goto(2);
        expect(slider.container.scrollLeft).to.be.lessThan(304);

        // But immediate scrolling happens in a single frame.
        slider.goto(3, { immediate: true });
        expect(slider.container.scrollLeft).to.equal(608);
      });
    });

    it('`goto()` can ignore callbacks', () => {
      cy.getSlider('test').then(($el) => {
        // Setup a callback.
        const slider = $el.get(0).SnapSlider;
        const callback = cy.spy();
        slider.on('change', callback);

        // Make sure callbacks are normally called.
        slider.goto(2);
        expect(callback).to.be.called;

        // Reset spy so we can check that it's not called.
        // @see https://sinonjs.org/releases/latest/spies/#spyresethistory
        callback.resetHistory();

        // But if we ignore them they're not called.
        slider.goto(1, { ignoreCallbacks: true });
        expect(callback).to.not.be.called;
      });
    });

    it('`addGotoButtons()` inits goto buttons', () => {
      // Wait until slider has loaded.
      cy.getSlider('test');

      // Make sure buttons haven't been initialized.
      cy.get('#navigation button')
        .should('not.have.attr', 'data-snap-slider-goto');

      // Add goto buttons.
      cy.getSlider('test').then(($el) => {
        const slider = $el.get(0).SnapSlider;
        slider.addGotoButtons('#navigation button');
      });

      // Previous
      cy.get('#navigation button').contains('Previous')
        .invoke('attr', 'data-snap-slider-goto')
        .should('include', 'prev');
      // Next
      cy.get('#navigation button').contains('Next')
        .invoke('attr', 'data-snap-slider-goto')
        .should('include', 'next');
      // Numbers
      cy.get('#navigation button').contains('1')
        .invoke('attr', 'data-snap-slider-goto')
        .should('include', '1');
    });

    it('`addGotoButtons()` can also take options as the first argument', () => {
      // Wait until slider has loaded.
      cy.getSlider('test');

      // Make sure buttons haven't been initialized.
      cy.get('#navigation button')
        .should('not.have.attr', 'data-snap-slider-goto');

      // Add goto buttons.
      cy.getSlider('test').then(($el) => {
        const slider = $el.get(0).SnapSlider;

        // Just to be sure this really works, let's pick some
        // arbitrary buttons instead of the actual prev/next.
        slider.addGotoButtons({
          prev: '#navigation li:nth-child(5) button',
          next: '#navigation li:nth-child(2) button',
        });
      });

      // Previous (overriding the "4" button)
      cy.get('#navigation button').contains('4')
        .invoke('attr', 'data-snap-slider-goto')
        .should('include', 'prev');
      // Next (overriding the "1" button)
      cy.get('#navigation button').contains('1')
        .invoke('attr', 'data-snap-slider-goto')
        .should('include', 'next');
    });

    it('`getButtons()` returns all the buttons currently targeting this slider', () => {
      let buttons = [];

      // Get buttons so we can check for them later.
      cy.window().then((win) => {
        buttons = Array.from(win.document.querySelectorAll('#navigation button'));
      });

      // Wait til the slider loads, then check for buttons.
      cy.getSlider('test').then(($el) => {
        const slider = $el.get(0).SnapSlider;

        // Make sure we didn't start with any buttons.
        expect(slider.getButtons()).to.be.empty;

        // Add the buttons.
        slider.addGotoButtons('#navigation button');

        // Confirm we get back the real buttons.
        expect(slider.getButtons()).to.deep.equal(buttons);
      });
    });

    it('`addNav()` inits navs', () => {
      // Init all nav elements.
      cy.getSlider('test').then(($el) => {
        const slider = $el.get(0).SnapSlider;
        slider.addNav('.example-nav');
      });

      // Make sure they all have a `data-snap-slider-nav` attribute.
      cy.get('.example-nav')
        .invoke('attr', 'data-snap-slider-nav')
        .should('equal', 'test');

      // Make sure all their buttons have a `data-snap-slider-goto` attribute.
      cy.get('.example-nav button')
        .should('have.attr', 'data-snap-slider-goto');
    });

    it('`addNav()` also accepts options', () => {
      // Init all nav elements.
      cy.getSlider('test').then(($el) => {
        const slider = $el.get(0).SnapSlider;

        // To be sure this works, let's only initialize
        // the first button in each nav.
        slider.addNav('.example-nav', {
          buttons: 'li:first-child button',
        });
      });

      // Make sure the first button in each nav has a `data-snap-slider-goto` attribute.
      cy.get('.example-nav li:first-child button')
        .should('have.attr', 'data-snap-slider-goto');
      // And the rest do not.
      cy.get('.example-nav li:not(:first-child) button')
        .should('not.have.attr', 'data-snap-slider-goto');
    });

    it('`getNavs()` returns all the navs currently targeting this slider', () => {
      let navs = [];

      // Get navs so we can check for them later.
      cy.window().then((win) => {
        navs = Array.from(win.document.querySelectorAll('.example-nav'));
      });

      // Wait til the slider loads, then check for navs.
      cy.getSlider('test').then(($el) => {
        const slider = $el.get(0).SnapSlider;

        // Make sure we didn't start with any navs.
        expect(slider.getNavs()).to.be.empty;

        // Add the navs.
        slider.addNav('.example-nav');

        // Confirm we get back the real navs.
        expect(slider.getNavs()).to.deep.equal(navs);
      });
    });

    it('`update()` re-scrolls to the current slide', () => {
      cy.getSlider('test').then(($el) => {
        const slider = $el.get(0).SnapSlider;
        const callback = cy.spy();
        slider.on('change', callback);

        // Force current slide to get out of sync.
        slider.current = 4;
        expect(slider.container.scrollLeft).to.equal(0);

        // Update the slider to sync its position to the current slide,
        // then confirm the slider actually moved.
        slider.update();
        expect(slider.container.scrollLeft).to.equal(608);

        // But make sure no callbacks were fired.
        expect(callback).to.not.be.called;
      });
    });

    it('`destroy()` stops transitions, removes event listeners, and deletes slider references', () => {
      let slider;
      let slides;
      const scrollListener = cy.spy();
      const scrollEndListener = cy.spy();
      const arrowKeyListener = cy.spy();
      const focusListener = cy.spy();

      cy.getSlider('test').then(($el) => {
        slider = $el.get(0).SnapSlider;
        slides = slider.slides;

        // Spy on each event listener's callbacks to test whether they've been removed.
        slider.on('scroll', scrollListener);
        slider.on('scroll.end', scrollEndListener);
        slider.on('change.keydown', arrowKeyListener);
        slider.on('change.focusin', focusListener);

        // Make sure to stop transitions and observers.
        slider.stopTransition = cy.stub();
        slider.resizeObserver.disconnect = cy.stub();

        // Trigger focus and arrow key to fire every event listener.
        slides[1].focus();
        slider.container.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
      });

      // Wait so `expect` happens after the callback.
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.getSlider('test').wait(1000).then(() => {
        expect(scrollListener).to.be.called;
        expect(scrollEndListener).to.be.called;
        expect(arrowKeyListener).to.be.called;
        expect(focusListener).to.be.called;

        // Now reset and try again!
        scrollListener.resetHistory();
        scrollEndListener.resetHistory();
        arrowKeyListener.resetHistory();
        focusListener.resetHistory();

        // Kill it.
        slider.destroy();

        // Did we stop transitions and observers?
        expect(slider.stopTransition).to.be.called;
        expect(slider.resizeObserver.disconnect).to.be.called;

        // Trigger focus and arrow key to fire every event listener.
        slides[1].focus();
        slider.container.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
      });

      // Wait so `expect` happens after the callback.
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.getSlider('test').wait(1000).then(() => {
        expect(scrollListener).to.not.be.called;
        expect(scrollEndListener).to.not.be.called;
        expect(arrowKeyListener).to.not.be.called;
        expect(focusListener).to.not.be.called;
      });

      // Last but not least, make sure we can't find any references to this slider anymore.
      cy.window().then((win) => {
        const { SnapSlider, _SnapSliders } = win;
        const container = win.document.querySelector('.example');

        // It. Is. Gone.
        expect(SnapSlider.get('test')).to.be.undefined;
        expect(_SnapSliders.test).to.be.undefined;
        expect(container.SnapSlider).to.be.undefined;
      });
    });

    it('`reset()` re-initializes a slider', () => {
      cy.getSlider('test').then(($el) => {
        const slider = $el.get(0).SnapSlider;
        const init = cy.spy(slider, 'init');

        slider.reset();

        expect(init).to.be.called;
      });
    });

    it('`reset()` can apply new options', () => {
      cy.getSlider('test').then(($el) => {
        const slider = $el.get(0).SnapSlider;
        const slides = slider.slides.slice(0, 3);
        const nav = slider.container.closest('body').querySelector('#navigation');
        const button = nav.querySelector('li:nth-child(3) button');
        const prev = nav.querySelector('li:nth-child(2) button');
        const next = nav.querySelector('li:nth-child(4) button');
        const initialCallbacks = slider.callbacks;
        const newCallbacks = { change: () => console.log('new callback') };

        // Make sure default options are set.
        expect(slider.slides).to.not.deep.equal(slides);
        expect(slider.getNavs()).to.be.empty;
        expect(slider.getButtons()).to.be.empty;
        expect(slider.current).to.equal(1);
        expect(slider.loop).to.equal(false);

        // Change everything.
        slider.reset({
          slides: 'li:nth-child(-n+3)', // First 3 slides
          nav: '#navigation',
          buttons: 'li:nth-child(3) button', // "2" button
          prev: 'li:nth-child(2) button', // "1" button
          next: 'li:nth-child(4) button', // "3" button
          start: 2,
          loop: true,
          on: newCallbacks,
        });

        // Make sure it worked.
        expect(slider.slides).to.deep.equal(slides);
        expect(slider.getNavs()).to.include(nav);
        expect(slider.getButtons()).to.have.members([button, prev, next]);
        expect(slider.current).to.equal(2);
        expect(slider.loop).to.equal(true);

        // And that callbacks are preserved.
        expect(slider.callbacks).to.deep.equal(initialCallbacks);
        expect(slider.callbacks.change).to.include(newCallbacks.change);
      });
    });

    it('`reset()` can not change container or slider ID', () => {
      cy.getSlider('test').then(($el) => {
        const slider = $el.get(0).SnapSlider;
        const { container, id } = slider;

        slider.reset({
          container: '#navigation',
          id: 'fake',
        });

        expect(slider.container).to.equal(container);
        expect(slider.id).to.equal(id);
      });
    });

    it('`reset()` applies settings from data attributes if no initial option was set', () => {
      cy.getSlider('test').then(($el) => {
        const slider = $el.get(0).SnapSlider;
        const slides = slider.slides.slice(0, 3);

        slider.container.setAttribute('data-snap-slider-slides', 'li:nth-child(-n+3)');
        slider.container.setAttribute('data-snap-slider-start', 'middle');
        slider.container.setAttribute('data-snap-slider-loop', 'true');
        slider.container.setAttribute('data-snap-slider-buttons', '.test');
        slider.container.setAttribute('data-snap-slider-prev', '.test');
        slider.container.setAttribute('data-snap-slider-next', '.test');

        slider.reset();

        expect(slider.slides).to.deep.equal(slides);
        expect(slider.current).to.equal(2);
        expect(slider.loop).to.equal(true);
        expect(slider.options.buttons).to.equal('.test');
        expect(slider.options.prev).to.equal('.test');
        expect(slider.options.next).to.equal('.test');
      });
    });
  });

  describe('Static Methods', () => {
    let SnapSlider;
    let spyWinConsoleLog;
    let spyWinConsoleGroup;
    let spyWinConsoleGroupCollapsed;

    beforeEach(() => {
      cy.visit('/test-js-api.html');

      cy.window().then((win) => {
        // Get Snap Slider.
        SnapSlider = win.SnapSlider;

        // Spy on calls to `console.log`.
        // @see https://github.com/cypress-io/cypress/issues/4808#issuecomment-514974175
        // @see https://medium.com/cypress-io-thailand/understand-stub-spy-apis-that-will-make-your-test-better-than-ever-on-cypress-io-797cb9eb205a
        spyWinConsoleLog = cy.spy(win.console, 'log');
        spyWinConsoleGroup = cy.spy(win.console, 'group');
        spyWinConsoleGroupCollapsed = cy.spy(win.console, 'groupCollapsed');
        cy.wrap(spyWinConsoleLog).as('spyWinConsoleLog');
        cy.wrap(spyWinConsoleGroup).as('spyWinConsoleGroup');
        cy.wrap(spyWinConsoleGroupCollapsed).as('spyWinConsoleGroupCollapsed');
      });

      cy.initSlider('.example', { id: 'test' });
    });

    it('`getButtonTarget()` returns the slider ID and index for a goto button', () => {
      // Init nav and external goto buttons.
      cy.getSlider('test').then(($el) => {
        const slider = $el.get(0).SnapSlider;
        const body = slider.container.closest('body');
        slider.addNav('#navigation');
        slider.addGotoButtons('#buttons button');

        const internalButton = body.querySelector('#navigation [data-snap-slider-goto="prev"');
        const externalButton = body.querySelector('#buttons [data-snap-slider-goto="test:prev"');
        const unsetButton = body.querySelector('#prev');

        expect(SnapSlider.getButtonTarget(internalButton)).to.deep.equal({ sliderID: 'test', index: 'prev' });
        expect(SnapSlider.getButtonTarget(externalButton)).to.deep.equal({ sliderID: 'test', index: 'prev' });
        expect(SnapSlider.getButtonTarget(unsetButton)).to.deep.equal({});
      });
    });

    it('`get()` returns the SnapSlider instance for a slider ID', () => {
      cy.getSlider('test').then(($el) => {
        const slider = $el.get(0).SnapSlider;
        expect(SnapSlider.get('test')).to.deep.equal(slider);
      });
    });

    it('`debug()` prints slider information for different elements', () => {
      cy.getSlider('test').then(($el) => {
        const { any } = Cypress.sinon.match;
        const slider = $el.get(0).SnapSlider;
        const body = slider.container.closest('body');
        const nav = body.querySelector('#navigation');
        const button = body.querySelector('#navigation li:first-child button');
        slider.addNav('#navigation');

        // All Sliders
        SnapSlider.debug();
        expect(spyWinConsoleLog).to.be.calledWith(any, any, any, slider.container);
        spyWinConsoleLog.resetHistory();

        // Missing Slider
        SnapSlider.debug('fake');
        expect(spyWinConsoleLog).to.be.calledWithMatch('Oh no!');
        spyWinConsoleLog.resetHistory();

        // Slider ID
        SnapSlider.debug('test');
        expect(spyWinConsoleLog).to.be.calledWith(any, any, any, slider.container);
        spyWinConsoleLog.resetHistory();

        // Slider Selector
        SnapSlider.debug('.example');
        expect(spyWinConsoleLog).to.be.calledWith(any, any, any, slider.container);
        spyWinConsoleLog.resetHistory();

        // Slider Element
        SnapSlider.debug(slider.container);
        expect(spyWinConsoleLog).to.be.calledWith(any, any, any, slider.container);
        spyWinConsoleLog.resetHistory();

        // Nav Selector
        SnapSlider.debug('#navigation');
        expect(spyWinConsoleLog).to.be.calledWith(any, any, any, nav);
        spyWinConsoleLog.resetHistory();

        // Nav Element
        SnapSlider.debug(nav);
        expect(spyWinConsoleLog).to.be.calledWith(any, any, any, nav);
        spyWinConsoleLog.resetHistory();

        // Button Selector
        SnapSlider.debug('#navigation li:first-child button');
        expect(spyWinConsoleLog).to.be.calledWith(any, any, any, button);
        spyWinConsoleLog.resetHistory();

        // Button Element
        SnapSlider.debug(button);
        expect(spyWinConsoleLog).to.be.calledWith(any, any, any, button);
        spyWinConsoleLog.resetHistory();
      });
    });
  });
});
