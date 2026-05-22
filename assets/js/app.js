(function () {
  "use strict";

  var base = (function () {
    var path = window.location.pathname.replace(/\\/g, "/");
    if (path.indexOf("/services/") !== -1) return "../";
    return "";
  })();

  var NAV_LABELS = {
    fr: { home: "Accueil", about: "À propos", services: "Services", counsel: "Conseil", contact: "Contact", call: "Appeler" },
    en: { home: "Home", about: "About", services: "Services", counsel: "Consulting", contact: "Contact", call: "Call" },
    es: { home: "Inicio", about: "Nosotros", services: "Servicios", counsel: "Consultoría", contact: "Contacto", call: "Llamar" },
    ar: { home: "الرئيسية", about: "من نحن", services: "الخدمات", counsel: "استشارات", contact: "اتصل", call: "اتصال" },
    zh: { home: "首页", about: "关于", services: "服务", counsel: "咨询", contact: "联系", call: "致电" }
  };

  var LANG_OPTIONS = [
    { code: "fr", flag: "🇫🇷", label: "Français" },
    { code: "en", flag: "🇬🇧", label: "English" },
    { code: "es", flag: "🇪🇸", label: "Español" },
    { code: "ar", flag: "🇸🇦", label: "العربية" },
    { code: "zh", flag: "🇨🇳", label: "简体中文" }
  ];

  var pages = [
    { href: base + "index.html", key: "nav.home", id: "home" },
    { href: base + "a-propos.html", key: "nav.about", id: "about" },
    { href: base + "services.html", key: "nav.services", id: "services" },
    { href: base + "conseil.html", key: "nav.counsel", id: "counsel" },
    { href: base + "contact.html", key: "nav.contact", id: "contact" }
  ];

  function navLabel(id) {
    var lang = window.SatinaI18n ? window.SatinaI18n.getLang() : "fr";
    var pack = NAV_LABELS[lang] || NAV_LABELS.fr;
    return pack[id] || NAV_LABELS.fr[id] || id;
  }

  function currentPageId() {
    var file = window.location.pathname.split("/").pop() || "index.html";
    if (file === "index.html" || file === "") return "home";
    if (file === "a-propos.html") return "about";
    if (file === "services.html") return "services";
    if (file === "conseil.html") return "counsel";
    if (file === "contact.html") return "contact";
    if (/assistance|formation|particuliers|professionnels|helpdesk/.test(file)) return "services";
    return "";
  }

  function navHtml(active) {
    return pages.map(function (p) {
      var cls = p.id === active ? ' class="is-active"' : "";
      return '<a href="' + p.href + '"' + cls + ' data-i18n="' + p.key + '">' + navLabel(p.id) + "</a>";
    }).join("");
  }

  function langPickerHtml() {
    var lang = window.SatinaI18n ? window.SatinaI18n.getLang() : "fr";
    var current = LANG_OPTIONS.find(function (o) { return o.code === lang; }) || LANG_OPTIONS[0];
    var menu = LANG_OPTIONS.map(function (o) {
      var cls = o.code === lang ? ' class="is-active"' : "";
      return '<li><button type="button" data-lang="' + o.code + '"' + cls + ">" + o.flag + " " + o.label + "</button></li>";
    }).join("");
    return (
      '<div class="lang-picker" data-lang-picker>' +
      '  <button type="button" class="lang-picker__btn" aria-expanded="false" aria-haspopup="listbox">' +
      '    <span class="lang-picker__flag">' + current.flag + "</span>" +
      '    <span class="lang-picker__code">' + current.code.toUpperCase() + "</span>" +
      "  </button>" +
      '  <ul class="lang-picker__menu" role="listbox">' + menu + "</ul>" +
      "</div>"
    );
  }

  function mobileNavHtml(active) {
    return (
      '<nav id="mobile-nav" class="mobile-nav" aria-hidden="true">' +
      '  <div class="mobile-nav__panel">' +
      navHtml(active) +
      '    <div class="mobile-nav__cta">' +
      '      <a href="tel:+33607094206" class="btn btn-primary" style="width:100%;text-align:center" data-i18n="nav.call">' +
      navLabel("call") +
      "</a>" +
      "    </div>" +
      "  </div>" +
      "</nav>"
    );
  }

  function headerHtml(active) {
    return (
      '<header class="site-header" role="banner">' +
      '  <div class="nav-ribbon crystal site-header__inner">' +
      '    <a href="' + base + 'index.html" class="site-header__brand">' +
      '      <img src="' + base + 'assets/images/logo-sat1.png" alt="Satina IT Paris" width="200" height="80">' +
      '      <span class="site-header__name">Satina IT Paris</span>' +
      '    </a>' +
      '    <nav class="site-nav" aria-label="Navigation principale">' + navHtml(active) + "</nav>" +
      '    <button type="button" class="nav-toggle" aria-expanded="false" aria-controls="mobile-nav" aria-label="Menu">' +
      '      <span></span><span></span><span></span>' +
      "    </button>" +
      '    <div class="site-header__actions">' +
      langPickerHtml() +
      '      <button type="button" class="theme-toggle" aria-label="Thème" data-i18n-title="theme.aria" title="Changer le thème">🌙</button>' +
      '      <a href="tel:+33607094206" class="btn btn-primary btn-sm" data-i18n="nav.call">' + navLabel("call") + "</a>" +
      "    </div>" +
      "  </div>" +
      "</header>" +
      mobileNavHtml(active)
    );
  }

  function injectPreloader() {
    if (document.getElementById("preloader")) return;
    var el = document.createElement("div");
    el.id = "preloader";
    el.className = "preloader";
    el.setAttribute("aria-hidden", "true");
    el.innerHTML =
      '<img src="' + base + 'assets/images/logo-sat1.png" alt="" class="preloader__logo" width="160" height="64">';
    document.body.insertBefore(el, document.body.firstChild);
  }

  function footerHtml() {
    return (
      '<footer class="site-footer" role="contentinfo">' +
      '  <div class="container">' +
      '    <div class="site-footer__grid">' +
      '      <div>' +
      '        <a href="' + base + 'index.html" class="site-header__brand site-footer__brand">' +
      '          <img src="' + base + 'assets/images/logo-sat1.png" alt="Satina IT Paris" width="190" height="76" class="site-footer__logo">' +
      "        </a>" +
      '        <p data-i18n="footer.tagline" style="margin-top:1rem;font-size:0.9rem">Satina IT Paris</p>' +
      "      </div>" +
      '      <div><h4 data-i18n="footer.company">Entreprise</h4><ul>' +
      '        <li><a href="' + base + 'a-propos.html" data-i18n="nav.about">À propos</a></li>' +
      '        <li><a href="' + base + 'conseil.html" data-i18n="nav.counsel">Conseil</a></li>' +
      '        <li><a href="' + base + 'contact.html" data-i18n="nav.contact">Contact</a></li>' +
      "      </ul></div>" +
      '      <div><h4 data-i18n="footer.services">Services</h4><ul>' +
      '        <li><a href="' + base + 'services/assistance.html" data-i18n="footer.assist">Assistance</a></li>' +
      '        <li><a href="' + base + 'services/formation.html" data-i18n="footer.train">Formation</a></li>' +
      '        <li><a href="' + base + 'services/particuliers.html" data-i18n="footer.home_svc">Particuliers</a></li>' +
      '        <li><a href="' + base + 'services/professionnels.html" data-i18n="footer.pro_svc">Professionnels</a></li>' +
      '        <li><a href="' + base + 'services/helpdesk.html" data-i18n="footer.helpdesk">Help desk</a></li>' +
      "      </ul></div>" +
      '      <div><h4 data-i18n="footer.contact">Contact</h4><ul>' +
      '        <li>16 rue de Vichy, Paris</li>' +
      '        <li><a href="mailto:info@satina.fr">info@satina.fr</a></li>' +
      '        <li><a href="tel:+33607094206">06 07 09 42 06</a></li>' +
      '        <li><a href="tel:+33145863296">01 45 86 32 96</a></li>' +
      "      </ul></div>" +
      "    </div>" +
      '    <div class="site-footer__bottom">' +
      '      <span>&copy; <span id="year"></span> Satina IT Paris — <span data-i18n="footer.rights">Tous droits réservés</span></span>' +
      '      <a href="https://parisitservices.com/" target="_blank" rel="noopener" data-i18n="footer.credits">Paris-It-Services</a>' +
      "    </div>" +
      "  </div>" +
      "</footer>"
    );
  }

  var WA_SVG =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';

  function floatWidgetsHtml() {
    return (
      '<div id="float-widgets" class="float-widgets" aria-hidden="false">' +
      '  <aside class="paris-capsule crystal" id="paris-capsule" aria-live="polite">' +
      '    <span class="paris-capsule__dot" aria-hidden="true"></span>' +
      '    <strong class="paris-capsule__city" data-i18n="widget.paris">Paris</strong>' +
      '    <span class="paris-capsule__sep" aria-hidden="true">·</span>' +
      '    <span class="paris-capsule__time" id="paris-time">--:--</span>' +
      '    <span class="paris-capsule__sep" aria-hidden="true">·</span>' +
      '    <span class="paris-capsule__weather-icon" id="paris-weather-icon" aria-hidden="true">🌤️</span>' +
      '    <span class="paris-capsule__temp" id="paris-weather-temp">—</span>' +
      '    <span class="paris-capsule__avail" data-i18n="widget.available">7j/7</span>' +
      "  </aside>" +
      '  <a href="https://wa.me/33607094206?text=' + encodeURIComponent("Bonjour Satina IT Paris, ") +
      '" class="whatsapp-float" id="whatsapp-float" target="_blank" rel="noopener noreferrer" data-i18n-title="widget.whatsapp_aria" title="WhatsApp Satina">' +
      '    <span class="whatsapp-float__pulse" aria-hidden="true"></span>' +
      WA_SVG +
      "</a>" +
      "</div>"
    );
  }

  function initLangPicker() {
    var picker = document.querySelector("[data-lang-picker]");
    if (!picker) return;
    var btn = picker.querySelector(".lang-picker__btn");
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = picker.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    picker.querySelectorAll("[data-lang]").forEach(function (b) {
      b.addEventListener("click", function () {
        if (window.SatinaI18n) window.SatinaI18n.setLang(b.getAttribute("data-lang"));
        picker.classList.remove("is-open");
        btn.setAttribute("aria-expanded", "false");
        updateLangPickerUI();
      });
    });
    document.addEventListener("click", function () {
      picker.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
    });
  }

  function updateLangPickerUI() {
    var picker = document.querySelector("[data-lang-picker]");
    if (!picker) return;
    var lang = window.SatinaI18n ? window.SatinaI18n.getLang() : "fr";
    var current = LANG_OPTIONS.find(function (o) { return o.code === lang; }) || LANG_OPTIONS[0];
    var flag = picker.querySelector(".lang-picker__flag");
    var code = picker.querySelector(".lang-picker__code");
    if (flag) flag.textContent = current.flag;
    if (code) code.textContent = current.code.toUpperCase();
    picker.querySelectorAll("[data-lang]").forEach(function (b) {
      b.classList.toggle("is-active", b.getAttribute("data-lang") === lang);
    });
  }

  function refreshNavLabels() {
    document.querySelectorAll(".site-nav a, .mobile-nav__panel > a").forEach(function (a) {
      var key = a.getAttribute("data-i18n");
      if (!key) return;
      var id = key.split(".")[1];
      if (id) a.textContent = navLabel(id);
    });
    var callBtn = document.querySelector(".site-header__actions .btn-sm");
    if (callBtn) callBtn.textContent = navLabel("call");
  }

  document.addEventListener("DOMContentLoaded", function () {
    injectPreloader();
    document.body.classList.add("js-ready");
    var active = currentPageId();
    var headerEl = document.getElementById("site-header");
    var footerEl = document.getElementById("site-footer");
    if (headerEl) headerEl.innerHTML = headerHtml(active);
    if (footerEl) footerEl.innerHTML = footerHtml();
    if (!document.getElementById("float-widgets")) {
      var dock = document.createElement("div");
      dock.innerHTML = floatWidgetsHtml();
      document.body.appendChild(dock.firstElementChild);
    }
    var yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    initLangPicker();
    if (window.SatinaI18n) {
      window.SatinaI18n.apply(window.SatinaI18n.getLang());
      updateLangPickerUI();
    }
    if (window.SatinaTheme) window.SatinaTheme.apply(window.SatinaTheme.get());
    document.querySelectorAll(".reveal").forEach(function (el) {
      requestAnimationFrame(function () { el.classList.add("visible"); });
    });
  });

  document.addEventListener("satina:langchange", function () {
    if (window.SatinaI18n) window.SatinaI18n.apply(window.SatinaI18n.getLang());
    refreshNavLabels();
    updateLangPickerUI();
  });
})();
