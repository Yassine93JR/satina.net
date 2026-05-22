(function () {
  "use strict";

  var INTERVAL_MS = 3000;
  document.addEventListener("DOMContentLoaded", function () {
    var root = document.querySelector(".hero-cinematic");
    if (!root) return;

    var slides = Array.prototype.slice.call(root.querySelectorAll(".hero-slide"));
    var panels = Array.prototype.slice.call(root.querySelectorAll(".hero-slide-panel"));
    var dots = Array.prototype.slice.call(root.querySelectorAll(".hero-dot"));
    var total = slides.length;
    if (total < 2) return;

    var index = 0;
    var timerId = null;

    function resetDotFill(dot) {
      var fill = dot.querySelector(".hero-dot__fill");
      if (!fill) return;
      fill.style.animation = "none";
      void fill.offsetWidth;
      if (dot.classList.contains("is-active")) {
        fill.style.animation = "dotProgress 3s linear forwards";
      }
    }

    function emitChange() {
      document.dispatchEvent(
        new CustomEvent("hero:slidechange", { detail: { index: index } })
      );
    }

    function animatePanelText(panel) {
      if (!panel) return;
      var parts = panel.querySelectorAll(".tag, .hero-title, p, .hero-panel-cta > *");
      if (typeof gsap !== "undefined" && parts.length) {
        gsap.killTweensOf(parts);
        gsap.fromTo(
          parts,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: "power2.out", overwrite: true }
        );
      }
    }

    function setSlide(n) {
      index = ((n % total) + total) % total;

      slides.forEach(function (slide, i) {
        slide.classList.toggle("is-active", i === index);
      });

      panels.forEach(function (panel, i) {
        var on = i === index;
        panel.classList.toggle("is-active", on);
        if (on) animatePanelText(panel);
      });

      dots.forEach(function (dot, i) {
        dot.classList.toggle("is-active", i === index);
        resetDotFill(dot);
      });

      emitChange();
    }

    function nextSlide() {
      setSlide(index + 1);
    }

    function startLoop() {
      stopLoop();
      timerId = window.setInterval(nextSlide, INTERVAL_MS);
    }

    function stopLoop() {
      if (timerId) {
        window.clearInterval(timerId);
        timerId = null;
      }
    }

    dots.forEach(function (dot) {
      dot.addEventListener("click", function () {
        var n = parseInt(dot.getAttribute("data-goto"), 10);
        if (!isNaN(n)) setSlide(n);
        startLoop();
      });
    });

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        stopLoop();
      } else {
        startLoop();
      }
    });

    setSlide(0);
    startLoop();
  });
})();
