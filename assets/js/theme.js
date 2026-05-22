(function () {
  "use strict";
  var STORAGE_KEY = "satina-theme";
  var root = document.documentElement;

  function getPreferred() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "light" || saved === "dark") return saved;
    } catch (e) {}
    return "dark";
  }

  function apply(theme) {
    root.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {}
    var btn = document.querySelector(".theme-toggle");
    if (btn) {
      btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
      btn.textContent = theme === "dark" ? "\u263E" : "\u2600";
    }
  }

  apply(getPreferred());

  document.addEventListener("click", function (e) {
    if (!e.target.closest(".theme-toggle")) return;
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    apply(next);
  });

  window.SatinaTheme = { apply: apply, get: getPreferred };
})();
