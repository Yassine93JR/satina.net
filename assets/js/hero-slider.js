(function () {
  "use strict";

  var INTERVAL_MS = 3000;

  document.addEventListener("DOMContentLoaded", function () {
    var root = document.querySelector(".hero-cinematic");
    if (!root) return;

    var slides = root.querySelectorAll(".hero-slide");
    var panels = root.querySelectorAll(".hero-slide-panel");
    var dots = root.querySelectorAll(".hero-dot");
    var total = slides.length;
    if (!total) return;

    var index = 0;
    var timer = null;
    var hasGsap = typeof gsap !== "undefined";

    function resetDotFill(dot) {
      var fill = dot.querySelector(".hero-dot__fill");
      if (!fill) return;
      fill.style.animation = "none";
      void fill.offsetWidth;
      fill.style.animation = "";
    }

    function emitChange() {
      document.dispatchEvent(
        new CustomEvent("hero:slidechange", { detail: { index: index } })
      );
    }

    function animatePanel(panel) {
      if (!panel || !hasGsap) return;
      var parts = panel.querySelectorAll(".tag, .hero-title, p, .hero-panel-cta > *");
      gsap.killTweensOf(parts);
      gsap.fromTo(
        parts,
        { opacity: 0, y: 32, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.75,
          stagger: 0.08,
          ease: "power3.out",
          overwrite: true
        }
      );
    }

    function applySlideVisuals() {
      slides.forEach(function (s, n) {
        var active = n === index;
        s.classList.toggle("is-active", active);
        if (hasGsap) {
          gsap.killTweensOf(s);
          gsap.set(s, { opacity: active ? 1 : 0, visibility: active ? "visible" : "hidden" });
          var bg = s.querySelector(".hero-slide__bg");
          if (bg && active) {
            gsap.killTweensOf(bg);
            gsap.fromTo(bg, { scale: 1.14 }, { scale: 1, duration: 9, ease: "power1.out" });
          }
        }
      });
    }

    function goTo(i) {
      index = ((i % total) + total) % total;

      applySlideVisuals();

      panels.forEach(function (p, n) {
        var active = n === index;
        p.classList.toggle("is-active", active);
        if (active) animatePanel(p);
      });

      dots.forEach(function (d, n) {
        d.classList.toggle("is-active", n === index);
        resetDotFill(d);
      });

      emitChange();
    }

    function next() {
      goTo(index + 1);
    }

    function startAutoplay() {
      stopAutoplay();
      timer = setInterval(next, INTERVAL_MS);
    }

    function stopAutoplay() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    dots.forEach(function (dot) {
      dot.addEventListener("click", function () {
        var goto = parseInt(dot.getAttribute("data-goto"), 10);
        if (!isNaN(goto)) goTo(goto);
        startAutoplay();
      });
    });

    root.addEventListener("mouseenter", stopAutoplay);
    root.addEventListener("mouseleave", startAutoplay);

    if (hasGsap) {
      slides.forEach(function (s, n) {
        gsap.set(s, { opacity: n === 0 ? 1 : 0, visibility: n === 0 ? "visible" : "hidden" });
      });
    }

    goTo(0);
    startAutoplay();
  });
})();
