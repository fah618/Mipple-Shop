/* gallery.js — work strips: drift on their own (pause while touched), arrows + mouse drag on desktop */
(function () {
  var calm = matchMedia('(prefers-reduced-motion:reduce)').matches;
  if (!calm) document.querySelectorAll('.sc').forEach(function (sc) {
    var pos = 0, dir = 1, hold = 0, down = false, vis = false, last = performance.now();
    function rest() { hold = performance.now() + 2500; }
    ['touchstart', 'mouseenter'].forEach(function (e) { sc.addEventListener(e, function () { down = true; }, { passive: true }); });
    ['touchend', 'touchcancel', 'mouseleave'].forEach(function (e) { sc.addEventListener(e, function () { down = false; rest(); }, { passive: true }); });
    sc.addEventListener('wheel', rest, { passive: true });
    sc.addEventListener('scroll', function () { if (Math.abs(sc.scrollLeft - pos) > 2) { pos = sc.scrollLeft; rest(); } });
    new IntersectionObserver(function (x) { vis = x[0].isIntersecting; }).observe(sc);
    function step(t) {
      var dt = Math.min(t - last, 50); last = t;
      if (vis && !down && t > hold) {
        var max = sc.scrollWidth - sc.clientWidth; pos += dir * dt * .035;
        if (pos >= max) { pos = max; dir = -1; } else if (pos <= 0) { pos = 0; dir = 1; }
        sc.scrollLeft = pos;
      }
      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });

  document.querySelectorAll('.work:not(.fit)').forEach(function (w) {
    var sc = w.querySelector('.sc'), im = sc.querySelector('img');
    sc.tabIndex = 0; sc.setAttribute('role', 'region'); sc.setAttribute('aria-label', 'ผลงาน เลื่อนซ้าย-ขวาได้');
    function mkb(c, l, d) {
      var b = document.createElement('button'); b.type = 'button'; b.className = 'nb ' + c; b.setAttribute('aria-label', l);
      b.innerHTML = '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="' + d + '"/></svg>';
      w.appendChild(b); return b;
    }
    var P = mkb('prev', 'ก่อนหน้า', 'M11 3L5 9l6 6'), N = mkb('next', 'ถัดไป', 'M7 3l6 6-6 6');
    function upd() { P.disabled = sc.scrollLeft <= 2; N.disabled = sc.scrollLeft >= sc.scrollWidth - sc.clientWidth - 2; }
    P.onclick = function () { sc.scrollBy({ left: -sc.clientWidth * .75, behavior: 'smooth' }); };
    N.onclick = function () { sc.scrollBy({ left: sc.clientWidth * .75, behavior: 'smooth' }); };
    sc.addEventListener('scroll', upd, { passive: true }); addEventListener('resize', upd); im.addEventListener('load', upd); upd();
    var sx = 0, sl = 0, dr = false;
    sc.addEventListener('pointerdown', function (e) { if (e.pointerType !== 'mouse' || e.button) return; dr = true; sx = e.clientX; sl = sc.scrollLeft; });
    addEventListener('pointermove', function (e) { if (!dr) return; var dx = e.clientX - sx; if (Math.abs(dx) > 3) sc.classList.add('drag'); sc.scrollLeft = sl - dx; });
    addEventListener('pointerup', function () { dr = false; sc.classList.remove('drag'); });
    sc.addEventListener('dragstart', function (e) { e.preventDefault(); });
  });
})();
