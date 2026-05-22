(function () {
  "use strict";

  function initFixedHeaderScroll() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    function onScroll() {
      header.classList.toggle("is-scrolled", window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function initPreloader() {
    var el = document.getElementById("preloader");
    if (!el) return;
    var hide = function () {
      el.classList.add("is-done");
      setTimeout(function () {
        el.remove();
      }, 550);
    };
    if (document.readyState === "complete") {
      setTimeout(hide, 400);
    } else {
      window.addEventListener("load", function () {
        setTimeout(hide, 350);
      });
    }
  }

  function initMobileNav() {
    var toggle = document.querySelector(".nav-toggle");
    var panel = document.getElementById("mobile-nav");
    if (!toggle || !panel) return;

    function close() {
      panel.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }

    function open() {
      panel.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    }

    toggle.addEventListener("click", function () {
      if (panel.classList.contains("is-open")) close();
      else open();
    });

    panel.addEventListener("click", function (e) {
      if (e.target === panel) close();
    });

    panel.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", close);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
  }

  function initContactForms() {
    document.querySelectorAll("#contact-form").forEach(function (form) {
      if (form.dataset.bound) return;
      form.dataset.bound = "1";
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var ok = document.getElementById("form-success");
        if (ok) ok.classList.add("is-visible");
        form.reset();
      });
    });
  }

  function initMagneticButtons() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.querySelectorAll(".btn-primary, .nav-ribbon .btn-primary").forEach(function (btn) {
      btn.addEventListener("mousemove", function (e) {
        var r = btn.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) * 0.08;
        var y = (e.clientY - r.top - r.height / 2) * 0.08;
        btn.style.transform = "translate(" + x + "px, " + y + "px)";
      });
      btn.addEventListener("mouseleave", function () {
        btn.style.transform = "";
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initFixedHeaderScroll();
    initPreloader();
    initMobileNav();
    initContactForms();
    initMagneticButtons();
  });
})();
