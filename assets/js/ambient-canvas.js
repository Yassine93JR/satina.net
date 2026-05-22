(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var canvas = document.getElementById("ambient-canvas");
    if (!canvas) return;
    var ctx = canvas.getContext("2d");
    if (!ctx) return;

    var particles = [];
    var count = document.body.classList.contains("page-home") ? 72 : 40;
    var w, h;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }

    function init() {
      particles = [];
      for (var i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 2 + 0.5,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          hue: Math.random() > 0.5 ? 187 : 239
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      var theme = document.documentElement.getAttribute("data-theme") || "dark";
      var alpha = theme === "dark" ? 0.35 : 0.2;

      particles.forEach(function (p, i) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "hsla(" + p.hue + ", 80%, 60%, " + alpha + ")";
        ctx.fill();

        for (var j = i + 1; j < particles.length; j++) {
          var q = particles[j];
          var dx = p.x - q.x;
          var dy = p.y - q.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = "hsla(" + p.hue + ", 70%, 55%, " + (alpha * 0.25 * (1 - dist / 120)) + ")";
            ctx.stroke();
          }
        }
      });
      requestAnimationFrame(draw);
    }

    resize();
    init();
    window.addEventListener("resize", function () {
      resize();
      init();
    });
    draw();
  });
})();
