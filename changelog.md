# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.0.0] - 2020-08-10

### Added

- Add build process.
- Multiple builds: full, lite, and minified versions of each.
- Cypress tests.
- More robust browser support.
- Add `package-lock.json`.
- New event callbacks: `load`, `change`, `change.click`, `change.scroll`, `change.keydown`, `change.focusin`, `scroll`, `scroll.start`, `scroll.end`.
- New instance methods: `getSlide()`, `getCurrentSlide()`, `goto()`, `addNav()`, `addGotoButtons()`, `update()`, `reset()`, `destroy()`, `on()`.
- New static methods: `SnapSlider.get()`, `SnapSlider.debug()`.
- Attach `SnapSlider` prop to DOM elements for easy access.
- Debugger for easier development.

### Changed

- Auto-init sliders with `data-snap-slider` attributes on page load (instead of requiring JS initialization).
- Replace JSON object syntax. Now `data-snap-slider` only defines the slider ID, and each option has its own data attribute.
- Rename `initial` option to `start`. Use the `data-snap-slider-start` attribute instead.
- Change default start slide from `middle` to `1`. Use `data-snap-slider-start="middle"` to keep the v1 start position.
- Rename `items` option to `slides`. Use the `data-snap-slider-slides` attribute to define custom slides.
- Remove `off` option. Responsive changes should be entirely handled by CSS now.
- Replace `arrows` and `pagination` options with the `data-snap-slider-nav` attribute. Instead of targeting navigation elements from the slider, tell nav elements what slider to target.
- Remove `arrows` and `pagination` properties from `SnapSlider` instances.
- Make `current` slide index 1-index instead of 0-index.
- Rename `items` property to `slides`.
- Remove `previous` property from `SnapSlider` instances.
- Rename `goTo` to all lowercase `goto()`.
- Change `goto()` second parameter `immediately` to an object `options`. For example, `goTo(1, true)` becomes `goto(2, { immediate: true })`.
- Improve docs with better getting started notes & examples.
- Move starter CSS to demos.

### Fixed

- Fix slider `change` events firing multiple times per transition. Now change events should only fire once, until the next change fires.
- Fix misc `package.json` errors (e.g., incorrect bugs URL).

## 1.2.4 - 2019-08-07

### Fixed

- Use ES5 syntax so script works in IE by default.
- Hide scrollbar in IE with `-ms-overflow-style: -ms-autohiding-scrollbar;`
- Fix missing styles/scripts in demo `index.html`.
- Fix pagination classes missing is-current class because this.current was undefined

## 1.2.3 - 2019-02-12

### Added

- Add readme with getting started instructions and examples.
- Add changelog.
- Add linting and formatting tools.

### Changed

- Move project from [CodePen](https://codepen.io/tannerhodges/pen/pKeqbj?editors=0010) to [GitHub](https://github.com/tannerhodges/snap-slider).
- Set default slide width to 100%.

## 1.2.2 - 2018-10-01

### Fixed

- Fix `window.matchMedia(this.options.off)` failing in IE when `off` is an empty string (like for sliders that are always active).
- Always add `resizeHandler` so it still slides to the active slide on resize, even if there's no `off` option defined.

## 1.2.1 - 2018-10-01

### Fixed

- Fixed `getClosest` breaking in Edge and IE because [`getBoundingClientRect` doesn’t return contain x and y properties](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect#Browser_compatibility). 🙃

### Changed

- Change `vw` units to `%` since, you know, percentages work and support older browsers.
- Move smoothscroll-polyfill to JS panel so it's easier to copy/paste from CodePen into new projects.

## 1.2.0 - 2018-09-27

### Changed

- Automatically detect `items` (use children by default).
    - If you want to include other non-slide elements in your slider, you can still use the `items` option to specify which elements should be used as items.

## 1.1.0 - 2018-09-20

### Added

- `options` param for initializing SnapSlider from JavaScript.

### Changed

- Allow `container` param to be Element, string, or any array-like object (NodeList, jQuery, etc.).
- Replace `Array.from` polyfill with `qsa` helper using `Array.prototype.slice.call()`.

### Removed

- Remove `console.log` from `updateNavigation`.
- Remove unused `margin` option.

## 1.0.0 - 2018-09-20

### Added

- Add JavaScript hooks for CSS-only sliders.
- Use `on` method to add events on slide changes.
- Configure slider settings with HTML attribute `data-snap-slider`.
- Add option for slider arrow buttons.
- Add option for slider pagination buttons.
- Center slider items by default.
- Update slider on scroll and window resize.
- Use `off` param to toggle slider at a media query.
- Change items on click and focus for keyboard accessibility.
- CSS falls back to simple `overflow: scroll` section.

[Unreleased]: https://github.com/tannerhodges/snap-slider/compare/v2.0.0...HEAD
[2.0.0]: https://github.com/tannerhodges/snap-slider/releases/tag/v2.0.0
