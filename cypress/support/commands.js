/* eslint-disable arrow-body-style */

/**
 * Get a slider element by its slider ID.
 *
 * @param  {String}  sliderID
 * @param  {String}  alias
 */
Cypress.Commands.add('getSlider', (sliderID, alias = 'slider') => {
  return cy.get(`[data-snap-slider="${sliderID}"].has-loaded`).as(alias);
});

/**
 * Init a slider element.
 *
 * @param  {String}  selector
 * @param  {Object}  options
 */
Cypress.Commands.add('initSlider', (selector, options = {}) => {
  return cy.window().then((win) => {
    // Get Snap Slider + container element.
    const { document, SnapSlider } = win;
    const el = document.querySelector(selector);

    // Init slider.
    const slider = new SnapSlider(el, options);

    return slider;
  });
});

/**
 * Get a slider nav element by its slider ID.
 *
 * @param  {String}  sliderID
 * @param  {String}  alias
 */
Cypress.Commands.add('getSliderNav', (sliderID, alias = 'nav') => {
  return cy.get(`[data-snap-slider-nav="${sliderID}"]`).as(alias);
});
