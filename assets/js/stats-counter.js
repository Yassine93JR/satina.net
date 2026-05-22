(function () {
  "use strict";

  function animateValue(el, from, to, duration, formatter) {
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = from + (to - from) * eased;
      el.textContent = formatter(val, p);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = formatter(to, 1);
    }
    requestAnimationFrame(step);
  }

  function runCounters(root) {
    var items = root.querySelectorAll("[data-count-to]");
    items.forEach(function (item, idx) {
      var valueEl = item.querySelector(".stat-item__value");
      if (!valueEl) return;
      var mode = item.getAttribute("data-count-mode") || "number";
      var to = parseFloat(item.getAttribute("data-count-to") || "0");
      var suffix = item.getAttribute("data-suffix") || "";
      var prefix = item.getAttribute("data-prefix") || "";
      var delay = idx * 100;

      setTimeout(function () {
        if (mode === "fraction") {
          animateValue(valueEl, 0, to, 1400, function (v) {
            return prefix + Math.round(v) + "/" + (item.getAttribute("data-denom") || "7");
          });
        } else {
          animateValue(valueEl, 0, to, 1600, function (v) {
            return prefix + Math.round(v) + suffix;
          });
        }
      }, delay);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var band = document.querySelector(".crystal-stats, .stats-band--hero, .stats-band");
    if (!band) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      band.querySelectorAll("[data-count-to]").forEach(function (item) {
        var valueEl = item.querySelector(".stat-item__value");
        if (!valueEl) return;
        var to = item.getAttribute("data-count-to");
        var suffix = item.getAttribute("data-suffix") || "";
        if (item.getAttribute("data-count-mode") === "fraction") {
          valueEl.textContent = to + "/" + (item.getAttribute("data-denom") || "7");
        } else {
          valueEl.textContent = to + suffix;
        }
      });
      return;
    }

    setTimeout(function () { runCounters(band); }, 180);
  });
})();
