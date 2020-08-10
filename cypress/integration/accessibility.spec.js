describe('Accessibility', () => {
  beforeEach(() => {
    cy.visit('/test-accessibility.html');
  });

  it('sets all slides to `tabindex="-1"` so they\'re focusable', () => {
    cy.getSlider('a11y-example').then(($el) => {
      const slider = $el.get(0).SnapSlider;

      // Confirm all slides have correct `tabindex`.
      slider.slides.forEach((slide) => {
        expect(slide.getAttribute('tabindex')).to.equal('-1');
      });
    });
  });

  it('focuses the slide you go to', () => {
    // Confirm the slide is not already in focus.
    cy.get('.example__slide:nth-child(2)').should('not.have.focus');
    // Then go to the slide.
    cy.get('[data-snap-slider-goto="2"]').click();
    // Make sure the slide is focused now.
    cy.get('.example__slide:nth-child(2)').should('have.focus');
  });

  it('can disable focus when you call `goto()`', () => {
    // Confirm the slide is not already in focus.
    cy.get('.example__slide:nth-child(2)').should('not.have.focus');

    // Then go to the next slide, but without focusing it.
    cy.getSlider('a11y-example').then(($el) => {
      const slider = $el.get(0).SnapSlider;
      slider.goto('next', { focus: false });
    });

    // Make sure the slide still is not focused.
    cy.get('.example__slide:nth-child(2)').should('not.have.focus');
  });

  it('does not focus when you click relative prev/next buttons', () => {
    // Start on the middle slide and confirm it has focus.
    cy.get('[data-snap-slider-goto="2"]').click();
    cy.get('.example__slide:nth-child(2)').should('have.focus');

    // Click "Next" and confirm the button (not the slide) has focus.
    cy.get('[data-snap-slider-goto="next"]').click();
    cy.get('[data-snap-slider-goto="next"]').should('have.focus');

    // Click "Prev" and confirm the button (not the slide) has focus.
    cy.get('[data-snap-slider-goto="prev"]').click();
    cy.get('[data-snap-slider-goto="prev"]').should('have.focus');

    // Go to the first slide and confirm it has focus now.
    cy.get('[data-snap-slider-goto="1"]').click();
    cy.get('.example__slide:nth-child(1)').should('have.focus');
  });
});
