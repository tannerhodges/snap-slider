describe('Responsive', () => {
  beforeEach(() => {
    cy.visit('/test-responsive.html');
  });

  it('keeps current slide in position on window resize', () => {
    cy.getSlider('test').then(($el) => {
      const slider = $el.get(0).SnapSlider;

      // Confirm slider start position.
      expect(slider.container.scrollLeft).to.equal(0);

      // Try going to the last slide on desktop.
      slider.goto('last');
    });

    // Confirm the slider hasn't moved.
    cy.getSlider('test').invoke('scrollLeft').should('equal', 0);

    // Switch to mobile.
    cy.viewport('iphone-5');

    // Now the slider should be at the last slide.
    cy.getSlider('test').invoke('scrollLeft').should('equal', 576);
    cy.get('[data-snap-slider-goto="6"]').should('have.class', 'is-current');
  });
});
