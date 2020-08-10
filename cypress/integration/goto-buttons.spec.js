describe('Goto Buttons', () => {
  beforeEach(() => {
    cy.visit('/test-goto-buttons.html');
  });

  describe('Indexes', () => {
    it('can set indexes based on each button\'s content', () => {
      const indexes = ['prev', '1', '2', '3', '4', 'next'];

      cy.get('#auto-content button').each(($button, i) => {
        expect($button.attr('data-snap-slider-goto')).to.equal(indexes[i]);
      });
    });

    it('can set indexes based on content, even if their order is all mixed up', () => {
      const indexes = ['4', '2', 'next', '1', '3', 'prev'];

      cy.get('#mixed-content button').each(($button, i) => {
        expect($button.attr('data-snap-slider-goto')).to.equal(indexes[i]);
      });
    });

    it('sets prev/next indexes based on common terms', () => {
      cy.get('#prev-terms button')
        .invoke('attr', 'data-snap-slider-goto')
        .should('equal', 'prev');

      cy.get('#next-terms button')
        .invoke('attr', 'data-snap-slider-goto')
        .should('equal', 'next');
    });

    it('checks classes for prev/next terms if the button content is empty', () => {
      cy.get('#prev-terms-class button')
        .invoke('attr', 'data-snap-slider-goto')
        .should('equal', 'prev');

      cy.get('#next-terms-class button')
        .invoke('attr', 'data-snap-slider-goto')
        .should('equal', 'next');
    });

    it('can override the default index with a `[data-snap-slider-goto]` attribute', () => {
      const indexes = ['next', '4', '3', '2', '1', 'prev'];

      cy.get('#override button').each(($button, i) => {
        expect($button.attr('data-snap-slider-goto')).to.equal(indexes[i]);
      });
    });

    it('can target sliders outside of a standard nav', () => {
      // Make sure slider hasn't scrolled yet.
      cy.getSlider('test').invoke('scrollLeft').should('equal', 0);

      // Click a button.
      cy.get('[data-snap-slider-goto="test:next"]').click();

      // Confirm slider scrolled.
      cy.getSlider('test').invoke('scrollLeft').should('not.equal', 0);
    });

    it('ignores buttons that target a slider but without an index', () => {
      // Make sure slider hasn't scrolled yet.
      cy.getSlider('test').invoke('scrollLeft').should('equal', 0);

      // Click an INVALID button.
      cy.get('[data-snap-slider-goto="test"]').click();

      // Confirm slider did NOT scroll.
      cy.getSlider('test').invoke('scrollLeft').should('equal', 0);
    });

    it('ignores buttons with an invalid index', () => {
      // Make sure slider hasn't scrolled yet.
      cy.getSlider('test').invoke('scrollLeft').should('equal', 0);

      // Click all the invalid buttons.
      cy.get('#invalid [data-snap-slider-goto]').each(($button) => {
        $button.click();

        // Wait to ensure scroll really, really didn't happen.
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(10);

        // Confirm slider did NOT scroll.
        cy.getSlider('test').invoke('scrollLeft').should('equal', 0);
      });
    });
  });

  describe('Classes', () => {
    it('adds a current class to numeric buttons when their slide is current', () => {
      // Slide to the 3rd item.
      cy.getSlider('test').children(':nth-child(3)').scrollIntoView();

      // Current buttons should have the class.
      cy.get('#standard [data-snap-slider-goto*="3"]')
        .should('have.class', 'is-current');

      // Everything else should not.
      cy.get('#standard [data-snap-slider-goto]:not([data-snap-slider-goto*="3"])')
        .should('not.have.class', 'is-current');
    });

    it('never adds a current class to relative buttons', () => {
      // Click next until you reach the end of the slider.
      for (let i = 0; i < 3; i += 1) {
        cy.get('[data-snap-slider-goto*="next"]').first().click();

        // Make sure the button never has a current class.
        cy.get('[data-snap-slider-goto*="next"]')
          .should('not.have.class', 'is-current');
      }
    });

    it('adds a disabled class to relative buttons when you reach the end of the slider', () => {
      // Make sure prev buttons are disabled.
      cy.get('[data-snap-slider-goto*="prev"]')
        .should('have.class', 'is-disabled');

      // Click next until you reach the end of the slider.
      for (let i = 0; i < 3; i += 1) {
        cy.get('[data-snap-slider-goto*="next"]').first().click();

        // Make sure prev buttons are NOT disabled anymore.
        cy.get('[data-snap-slider-goto*="prev"]')
          .should('not.have.class', 'is-disabled');

        if (i === 2) {
          // On the last slide, make sure next buttons are disabled.
          cy.get('[data-snap-slider-goto*="next"]')
            .should('have.class', 'is-disabled');
        } else {
          // Make sure next buttons are NOT disabled until the last slide.
          cy.get('[data-snap-slider-goto*="next"]')
            .should('not.have.class', 'is-disabled');
        }
      }
    });

    it('does not disable relative buttons if you have loop enabled', () => {
      // Make sure relative buttons are NOT disabled.
      cy.get('#loop [data-snap-slider-goto*="prev"], #loop [data-snap-slider-goto*="next"]')
        .should('not.have.class', 'is-disabled');

      // Click next until you reach the end of the slider.
      for (let i = 0; i < 3; i += 1) {
        cy.get('#loop [data-snap-slider-goto*="next"]').first().click();

        // Make sure relative buttons are NOT disabled.
        cy.get('#loop [data-snap-slider-goto*="prev"], #loop [data-snap-slider-goto*="next"]')
          .should('not.have.class', 'is-disabled');
      }
    });
  });
});
