describe('Scroll Offset', () => {
  beforeEach(() => {
    cy.visit('/test-scroll-offset.html');
  });

  it('works with vertical sliders', () => {
    // Confirm slider start position, then go to the last slide.
    cy.getSlider('vertical-example').then(($el) => {
      const slider = $el.get(0).SnapSlider;

      expect(slider.container.scrollLeft).to.equal(0);
      expect(slider.container.scrollTop).to.equal(0);

      slider.goto('last');
    });

    // Confirm slider position.
    cy.getSlider('vertical-example').invoke('scrollLeft').should('equal', 0);
    cy.getSlider('vertical-example').invoke('scrollTop').should('equal', 320);
  });

  it('works with 2D sliders', () => {
    // Confirm slider start position, then go to the last slide.
    cy.getSlider('2d-example').then(($el) => {
      const slider = $el.get(0).SnapSlider;

      expect(slider.container.scrollLeft).to.equal(320);
      expect(slider.container.scrollTop).to.equal(240);

      slider.goto('last');
    });

    // Confirm slider position.
    cy.getSlider('2d-example').invoke('scrollLeft').should('equal', 640);
    cy.getSlider('2d-example').invoke('scrollTop').should('equal', 480);
  });

  it('works with nested sliders', () => {
    // Confirm slider start positions.
    cy.getSlider('nested-example', 'outer').then(($el) => {
      const slider = $el.get(0).SnapSlider;
      expect(slider.container.scrollLeft).to.equal(152);
      expect(slider.container.scrollTop).to.equal(0);
    });

    cy.getSlider('nested-example-inner-1', 'inner').then(($el) => {
      const slider = $el.get(0).SnapSlider;
      expect(slider.container.scrollLeft).to.equal(0);
      expect(slider.container.scrollTop).to.equal(160);

      // Now go to the last slide in the inner slider.
      slider.goto('last');
    });

    // This should move both the inner and outer slider.
    cy.get('@outer').invoke('scrollLeft').should('equal', 0);
    cy.get('@outer').invoke('scrollTop').should('equal', 0);
    cy.get('@inner').invoke('scrollLeft').should('equal', 0);
    cy.get('@inner').invoke('scrollTop').should('equal', 320);
  });
});
