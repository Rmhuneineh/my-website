/**
 * katex-autofit.js
 *
 * Dynamically shrinks block ("display") KaTeX equations that are wider
 * than their container, instead of letting them overflow or wrap.
 *
 * Place this file at:  assets/js/katex-autofit.js  (project root, NOT inside themes/LoveIt)
 * Enable it via config.toml:
 *
 *   [params.page.library.js]
 *     katexAutofit = "js/katex-autofit.js"
 *
 * It runs after KaTeX's auto-render pass (which the theme triggers on
 * page load), and re-runs on window resize.
 */
(function () {
  "use strict";

  var MIN_SCALE = 0.5; // never shrink below 50% — beyond this it becomes unreadable
  var RESIZE_DEBOUNCE_MS = 150;

  function fitOne(displayEl) {
    // Reset to natural size first so we measure the true width,
    // not a previously-applied scale (important on resize / zoom changes).
    displayEl.style.fontSize = "";

    var katexEl = displayEl.querySelector(".katex");
    if (!katexEl) return;

    var containerWidth = displayEl.clientWidth;
    var contentWidth = katexEl.scrollWidth;

    if (contentWidth > containerWidth && containerWidth > 0) {
      var scale = containerWidth / contentWidth;
      scale = Math.max(scale, MIN_SCALE);
      // KaTeX sizes itself in em units, so scaling font-size scales
      // the whole equation proportionally (symbols, fractions, etc.)
      displayEl.style.fontSize = (scale * 100).toFixed(2) + "%";
    }
  }

  function fitAll() {
    var displays = document.querySelectorAll(".katex-display");
    for (var i = 0; i < displays.length; i++) {
      fitOne(displays[i]);
    }
  }

  function debounce(fn, wait) {
    var timer = null;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(fn, wait);
    };
  }

  function run() {
    // KaTeX's auto-render happens synchronously during the theme's
    // init (on DOMContentLoaded), so by the time `load` fires the
    // markup is in place.
    fitAll();
  }

  if (document.readyState === "complete") {
    run();
  } else {
    window.addEventListener("load", run);
  }

  window.addEventListener("resize", debounce(fitAll, RESIZE_DEBOUNCE_MS));
})();
