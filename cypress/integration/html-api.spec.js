describe('HTML API', () => {
  beforeEach(() => {
    cy.visit('/test-html-api.html');
  });

  it('`[data-snap-slider]` inits slider elements', () => {
    // If the slider loads, we know SnapSlider initialized...
    cy.getSlider('test').then(($el) => {
      // But just to be sure, let's also check that its
      // container property matches the slider element.
      const el = $el.get(0);
      expect(el.SnapSlider.container).to.equal(el);
    });
  });

  it('`[data-snap-slider]` copies the element\'s `id` when you leave it blank', () => {
    // Make sure the internal slider ID matches the element's `id`.
    cy.get('#copy-id.has-loaded').then(($el) => {
      const el = $el.get(0);
      expect(el.getAttribute('data-snap-slider')).to.equal('copy-id');
      expect(el.SnapSlider.id).to.equal('copy-id');
    });
  });

  it('`[data-snap-slider]` generates a new slider ID when you leave it blank and your element doesn\'t have an `id`', () => {
    // Make sure the internal slider ID matches the expected fallback ID.
    cy.get('#default-id .example.has-loaded').then(($el) => {
      const el = $el.get(0);
      expect(el.getAttribute('data-snap-slider')).to.equal('slider-1');
      expect(el.SnapSlider.id).to.equal('slider-1');
    });
  });

  it('`[data-snap-slider-slides]` specifies which elements should be treated as slides', () => {
    // Make sure the real slides are tracked, but not the non-slide element.
    cy.getSlider('slides').then(($el) => {
      const slider = $el.get(0).SnapSlider;
      const slides = Array.from(slider.container.querySelectorAll('.example__slide'));
      const fake = slider.container.querySelector('#ignore-me');

      expect(slider.slides).to.deep.equal(slides);
      expect(slider.slides).to.not.include(fake);
    });
  });

  it('`[data-snap-slider-nav]` inits nav elements', () => {
    // We know the nav loaded correctly if all its buttons
    // have `[data-snap-slider-goto]` attributes.
    cy.getSliderNav('test')
      .find('button')
      .should('have.attr', 'data-snap-slider-goto');
  });

  it('does not automatically treat buttons inside the slider as goto buttons', () => {
    // Make sure buttons inside the slider aren't treated as goto buttons.
    cy.getSlider('ignore-buttons')
      .find('button')
      .should('not.have.attr', 'data-snap-slider-goto');
  });

  it('`[data-snap-slider-buttons] inits goto buttons within the container and nav elements', () => {
    // Check buttons in the container.
    cy.getSlider('specify-buttons')
      .find('.only-these-buttons')
      .should('have.attr', 'data-snap-slider-goto');

    // Make sure buttons that don't match the selector are not treated as goto buttons.
    cy.getSlider('specify-buttons')
      .find('button:not(.only-these-buttons)')
      .should('not.have.attr', 'data-snap-slider-goto');

    // Check buttons in the nav.
    cy.getSliderNav('specify-buttons')
      .filter(':not(#override-buttons)')
      .find('.only-these-buttons')
      .should('have.attr', 'data-snap-slider-goto');

    // Make sure buttons that don't match the selector are not treated as goto buttons.
    cy.getSliderNav('specify-buttons')
      .filter(':not(#override-buttons)')
      .find('button:not(.only-these-buttons)')
      .should('not.have.attr', 'data-snap-slider-goto');

    // Make sure buttons outside the container and nav are not treated as goto buttons.
    cy.get('#ignore-specify-buttons')
      .find('.only-these-buttons')
      .should('not.have.attr', 'data-snap-slider-goto');
  });

  it('`[data-snap-slider-buttons] on a nav element overrides the setting from the container, but only affects elements in the nav', () => {
    // Wait til the slider loads.
    cy.getSlider('specify-buttons');

    // Make sure the buttons we specified are treated as goto buttons.
    cy.getSliderNav('specify-buttons')
      .filter('#override-buttons')
      .find('.override-buttons')
      .should('have.attr', 'data-snap-slider-goto');

    // But only apply the override to elements in the nav element.
    cy.get('#ignore-override-buttons button')
      .should('not.have.attr', 'data-snap-slider-goto');
  });

  // TODO: Prev/next buttons.
  // data-snap-slider-prev
  // data-snap-slider-next

  it('`[data-snap-slider-goto="<SLIDE>"]` inits goto buttons in a container or nav element', () => {
    // Make sure slider hasn't scrolled yet.
    cy.getSlider('goto-buttons').invoke('scrollLeft').should('equal', 0);

    // Click a goto button inside the slider.
    cy.getSlider('goto-buttons')
      .find('[data-snap-slider-goto="4"]')
      .click();

    // Confirm slider scrolled.
    cy.getSlider('goto-buttons').invoke('scrollLeft').should('not.equal', 0);
  });

  it('`[data-snap-slider-goto="<ID>:<SLIDE>"]` can target a specific slider anywhere on the page', () => {
    // Make sure slider hasn't scrolled yet.
    cy.getSlider('goto-buttons').invoke('scrollLeft').should('equal', 0);

    // Click a goto button outside the slider (and not in a nav).
    cy.get('#external-buttons [data-snap-slider-goto="goto-buttons:next"]').click();

    // Confirm slider scrolled.
    cy.getSlider('goto-buttons').invoke('scrollLeft').should('not.equal', 0);
  });

  it('`[data-snap-slider-start]` sets which slide to start on', () => {
    cy.getSlider('start').then(($el) => {
      const slider = $el.get(0).SnapSlider;
      const slide = slider.container.querySelector('.example__slide:nth-child(2)');

      expect(slider.current).to.equal(2);
      expect(slider.getCurrentSlide()).to.equal(slide);
    });
  });

  it('`[data-snap-slider-loop]` sets whether the slider should loop', () => {
    cy.getSlider('loop').then(($el) => {
      const slider = $el.get(0).SnapSlider;

      expect(slider.loop).to.equal(true);
      expect(slider.current).to.equal(1);

      slider.goto('prev');

      expect(slider.current).to.equal(4);
    });
  });
});
