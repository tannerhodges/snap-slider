/* eslint-disable no-unused-expressions, quote-props */

describe('Events', () => {
  beforeEach(() => {
    cy.visit('/test-events.html');
  });

  it('load', () => {
    const fn = cy.stub();

    cy.initSlider('.example', {
      id: 'test',
      on: { 'load': fn },
    });

    // Wait until slider has loaded, then confirm callback fired.
    cy.getSlider('test').then(() => expect(fn).to.be.calledOnce);
  });

  it('change', () => {
    const fn = cy.stub();

    cy.initSlider('.example', {
      id: 'test',
      on: { 'change': fn },
    });

    // Make sure callback hasn't fired yet.
    cy.getSlider('test').then(() => expect(fn).to.not.be.called);

    // Scroll to trigger a change, then confirm the callback fired.
    // NOTE: Need extra `.wait()` so `expect` happens after the callback has debounced.
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.getSlider('test').scrollTo('right')
      .wait(350)
      .then(() => expect(fn).to.be.calledOnce);
  });

  it('change.click', () => {
    const fn = cy.stub();

    cy.initSlider('.example', {
      id: 'test',
      nav: '.example-nav',
      on: { 'change.click': fn },
    });

    // Make sure callback hasn't fired yet.
    cy.getSlider('test').then(() => expect(fn).to.not.be.called);

    // Click a goto button to trigger the change, then confirm callback fired.
    cy.get('.example-nav [data-snap-slider-goto="4"]').click()
      .then(() => expect(fn).to.be.calledOnce);
  });

  it('change.scroll', () => {
    const fn = cy.stub();

    cy.initSlider('.example', {
      id: 'test',
      nav: '.example-nav',
      on: { 'change.scroll': fn },
    });

    // Make sure callback hasn't fired yet.
    cy.getSlider('test').then(() => expect(fn).to.not.be.called);

    // Click a goto button to trigger the change.

    // Scroll to trigger a change, then confirm the callback fired.
    cy.getSlider('test').scrollTo('right', { duration: 100 })
      .then(() => expect(fn).to.be.calledOnce);
  });

  it('change.keydown', () => {
    const fn = cy.stub();

    cy.initSlider('.example', {
      id: 'test',
      on: { 'change.keydown': fn },
    });

    // Focus on the first slide, then make sure callback hasn't fired yet.
    cy.get('.example__slide').first().as('slide')
      .focus()
      .then(() => expect(fn).to.not.be.called);

    // Press an arrow key to go to the next slide, then confirm the callback fired.
    // @see https://docs.cypress.io/api/commands/trigger.html
    cy.getSlider('test').trigger('keydown', { key: 'ArrowRight' })
      .then(() => expect(fn).to.be.calledOnce);
  });

  it('change.focusin', () => {
    const fn = cy.stub();

    cy.initSlider('.example', {
      id: 'test',
      on: { 'change.focusin': fn },
    });

    // Make sure callback hasn't fired yet.
    cy.getSlider('test').then(() => expect(fn).to.not.be.called);

    // Focus on the link in the 2nd slide, then confirm callback fired.
    // TODO: When Cypress adds tab support, test tabbing into the slide.
    // There's a plugin for `.tab()`, but given the open issues I'd rather wait for core support.
    // @see https://github.com/cypress-io/cypress/issues/299
    // @see https://github.com/Bkucera/cypress-plugin-tab#readme
    cy.get('.example__slide:nth-child(2) a').focus()
      .then(() => expect(fn).to.be.calledOnce);
  });

  it('scroll, scroll.start, and scroll.end', () => {
    const scrollFn = cy.stub();
    const scrollStartFn = cy.stub();
    const scrollEndFn = cy.stub();

    cy.initSlider('.example', {
      id: 'test',
      on: {
        'scroll': scrollFn,
        'scroll.start': scrollStartFn,
        'scroll.end': scrollEndFn,
      },
    });

    // Make sure callback hasn't fired yet.
    cy.getSlider('test').then(() => expect(scrollFn).to.not.be.called);

    // Scroll to the end of the slider, then confirm callback fired multiple times.
    // Wait until `debounce()` finishes before checking for the `scroll.end` event.`
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.getSlider('test').scrollTo('right', { duration: 500 })
      .wait(250).then(() => {
        // Make sure each event fired the correct number of times.
        expect(scrollFn).to.have.callCount(2);
        expect(scrollStartFn).to.be.calledOnce;
        expect(scrollEndFn).to.be.calledOnce;

        // Make sure the events fired in the right order.
        expect(scrollStartFn).to.be.calledBefore(scrollFn);
        expect(scrollEndFn).to.be.calledAfter(scrollFn);
      });
  });
});
