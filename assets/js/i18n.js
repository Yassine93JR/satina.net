(function () {
  "use strict";

  var STORAGE_KEY = "satina-lang";
  var DEFAULT_LANG = "fr";
  var SUPPORTED = ["fr", "en", "es", "ar", "zh"];
  var RTL_LANGS = ["ar"];

  function getNested(obj, path) {
    var parts = path.split(".");
    var cur = obj;
    for (var i = 0; i < parts.length; i++) {
      if (!cur || typeof cur !== "object") return null;
      cur = cur[parts[i]];
    }
    return typeof cur === "string" ? cur : null;
  }

  function getLocales() {
    return window.SATINA_LOCALES || {};
  }

  function getLang() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (SUPPORTED.indexOf(saved) !== -1) return saved;
    } catch (e) {}
    return DEFAULT_LANG;
  }

  function setLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1) lang = DEFAULT_LANG;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}
    document.documentElement.lang = lang;
    document.documentElement.dir = RTL_LANGS.indexOf(lang) !== -1 ? "rtl" : "ltr";
    applyTranslations(lang);
    var sel = document.querySelector(".lang-select");
    if (sel) sel.value = lang;
    document.dispatchEvent(new CustomEvent("satina:langchange", { detail: { lang: lang } }));
  }

  function applyTranslations(lang) {
    var locales = getLocales();
    var dict = locales[lang] || locales[DEFAULT_LANG] || {};
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var val = getNested(dict, key);
      if (val == null) return;
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        if (el.hasAttribute("placeholder")) el.placeholder = val;
      } else if (el.tagName === "OPTION") {
        el.textContent = val;
      } else {
        el.textContent = val;
      }
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-placeholder");
      var val = getNested(dict, key);
      if (val != null) el.placeholder = val;
    });
    document.querySelectorAll("[data-i18n-title]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-title");
      var val = getNested(dict, key);
      if (val != null) el.title = val;
    });
    var titleEl = document.querySelector("title[data-i18n]");
    if (titleEl) {
      var t = getNested(dict, titleEl.getAttribute("data-i18n"));
      if (t) document.title = t;
    }
    var descMeta = document.querySelector('meta[name="description"][data-i18n]');
    if (descMeta) {
      var d = getNested(dict, descMeta.getAttribute("data-i18n"));
      if (d) descMeta.setAttribute("content", d);
    }
  }

  function init() {
    var lang = getLang();
    document.documentElement.lang = lang;
    document.documentElement.dir = RTL_LANGS.indexOf(lang) !== -1 ? "rtl" : "ltr";
    applyTranslations(lang);
    var sel = document.querySelector(".lang-select");
    if (sel) sel.value = lang;
  }

  document.addEventListener("change", function (e) {
    if (e.target && e.target.matches && e.target.matches(".lang-select")) {
      setLang(e.target.value);
    }
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.SatinaI18n = { getLang: getLang, setLang: setLang, apply: applyTranslations, t: function (key) {
    return getNested(getLocales()[getLang()] || {}, key) || key;
  }};
})();
