(function () {
  "use strict";

  function initHeroParallax() {
    var hero = document.querySelector("[data-hero-parallax]");
    if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    var slides = hero.querySelectorAll(".hero-slide__bg");
    hero.addEventListener("mousemove", function (e) {
      var rect = hero.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;
      slides.forEach(function (bg, i) {
        var depth = (i + 1) * 8;
        bg.style.transform =
          "scale(1.05) translate(" + x * depth + "px, " + y * depth + "px)";
      });
    });
  }

  function initSectionDepth() {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    document.querySelectorAll("[data-section-depth]").forEach(function (section) {
      var bg = section.querySelector(".section__bg-glow");
      if (!bg) {
        bg = document.createElement("div");
        bg.className = "section__bg-glow";
        bg.setAttribute("aria-hidden", "true");
        section.prepend(bg);
      }
      gsap.fromTo(
        bg,
        { opacity: 0.3, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1
          }
        }
      );
    });

    document.querySelectorAll(".service-card").forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        var px = ((e.clientX - r.left) / r.width) * 100;
        var py = ((e.clientY - r.top) / r.height) * 100;
        card.style.setProperty("--mouse-x", px + "%");
        card.style.setProperty("--mouse-y", py + "%");
        card.style.transform =
          "perspective(800px) rotateY(" + x * 8 + "deg) rotateX(" + -y * 8 + "deg) translateY(-6px)";
      });
      card.addEventListener("mouseleave", function () {
        card.style.transform = "";
      });
    });
  }

  function initHeroCounter() {
    document.addEventListener("hero:slidechange", function (e) {
      var cur = document.querySelector(".hero-slide-counter__cur");
      if (cur && e.detail && e.detail.index !== undefined) {
        cur.textContent = String(e.detail.index + 1).padStart(2, "0");
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initHeroParallax();
    initSectionDepth();
    initHeroCounter();
  });
})();
