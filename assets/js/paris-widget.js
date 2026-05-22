(function () {
  "use strict";

  function pad(n) {
    return n < 10 ? "0" + n : String(n);
  }

  /** WMO weather code → emoji */
  function weatherEmoji(code) {
    if (code === 0) return "☀️";
    if (code === 1) return "🌤️";
    if (code === 2) return "⛅";
    if (code === 3) return "☁️";
    if (code === 45 || code === 48) return "🌫️";
    if (code >= 51 && code <= 57) return "🌦️";
    if (code >= 61 && code <= 67) return "🌧️";
    if (code >= 71 && code <= 77) return "❄️";
    if (code >= 80 && code <= 82) return "🌧️";
    if (code >= 85 && code <= 86) return "🌨️";
    if (code >= 95 && code <= 99) return "⛈️";
    return "🌡️";
  }

  function updateParisTime() {
    var el = document.getElementById("paris-time");
    if (!el) return;
    try {
      el.textContent = new Intl.DateTimeFormat("fr-FR", {
        timeZone: "Europe/Paris",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      }).format(new Date());
    } catch (e) {
      var d = new Date();
      el.textContent = pad(d.getHours()) + ":" + pad(d.getMinutes());
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    updateParisTime();
    setInterval(updateParisTime, 30000);

    var iconEl = document.getElementById("paris-weather-icon");
    var tempEl = document.getElementById("paris-weather-temp");
    if (!tempEl) return;

    fetch("https://api.open-meteo.com/v1/forecast?latitude=48.8566&longitude=2.3522&current=temperature_2m,weather_code")
      .then(function (r) { return r.json(); })
      .then(function (data) {
        var cur = data && data.current;
        if (!cur) return;
        var t = cur.temperature_2m;
        var code = cur.weather_code;
        if (iconEl && code != null) iconEl.textContent = weatherEmoji(code);
        if (t != null) tempEl.textContent = Math.round(t) + "°C";
      })
      .catch(function () {
        if (iconEl) iconEl.textContent = "🌤️";
        tempEl.textContent = "Paris";
      });
  });
})();
