(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
      document.querySelectorAll(".reveal").forEach(function (el) {
        el.classList.add("visible");
      });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    document.querySelectorAll(".reveal").forEach(function (el) {
      if (el.closest(".hero-cinematic")) return;
      gsap.fromTo(
        el,
        { opacity: 0, y: 60, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
          onComplete: function () {
            el.classList.add("visible");
          }
        }
      );
    });

    document.querySelectorAll(".section-head h2").forEach(function (h2) {
      gsap.from(h2, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: h2,
          start: "top 88%"
        }
      });
    });

    document.querySelectorAll(".crystal-stat").forEach(function (card, i) {
      gsap.from(card, {
        opacity: 0,
        y: 40,
        scale: 0.9,
        duration: 0.8,
        delay: 0.1 + i * 0.07,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#stats",
          start: "top 75%"
        }
      });
    });

    document.querySelectorAll(".hero-orb").forEach(function (orb, i) {
      gsap.to(orb, {
        y: "+=40",
        x: i % 2 ? "-=28" : "+=28",
        duration: 7 + i * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

    var hero = document.querySelector(".hero-cinematic");
    if (hero) {
      gsap.to(hero.querySelector(".hero-fx__grid"), {
        backgroundPosition: "64px 64px",
        duration: 20,
        repeat: -1,
        ease: "none"
      });
    }

    document.querySelectorAll(".vision-visual img, .glass-card img").forEach(function (img) {
      gsap.to(img, {
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: img,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2
        }
      });
    });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      ScrollTrigger.getAll().forEach(function (t) {
        t.kill();
      });
    }
  });
})();
