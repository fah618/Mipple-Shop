/* cast.js — "latest works" carousel: 7 characters, the middle one is in front.
   Wheel / swipe / arrow keys / click a character to bring another to the front. */
(function () {
  var c = document.getElementById('cast'); if (!c) return;
  var im = [].slice.call(c.querySelectorAll('.ch')), N = im.length;
  // natural height factor of each character (so different crops look the same size)
  var nat = [.86,.95,.96,1,.78,.93,.94], SC = [1,.78,.72,.68], BL = [0,2.2,3.8,5.2], OP = [1,.8,.6,.4], BR = [1,1.18,1.38,1.6], CT = [1,.85,.72,.6];
  var act = 3, live = false, last = 0;
  function render() {
    im.forEach(function (e, i) {
      var d = ((i - act + 3 + N * 3) % N) - 3, a = Math.abs(d), s = e.style;
      s.setProperty('--x', (50 + d * 15.8) + '%'); s.setProperty('--s', ((nat[i] || 1) * SC[a]).toFixed(3));
      s.setProperty('--b', BL[a] + 'px'); s.setProperty('--o', OP[a]); s.setProperty('--br', BR[a]); s.setProperty('--ct', CT[a]); s.setProperty('--z', 10 - a);
      s.cursor = a ? 'pointer' : 'default';
    });
  }
  function go(n) { act = ((n % N) + N) % N; render(); }
  render();
  function start() { c.classList.add('in'); setTimeout(function () { live = true; c.classList.add('live'); }, 1900); }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (e) { if (e[0].isIntersecting) { start(); io.disconnect(); } }, { threshold: .3 });
    io.observe(c);
  } else start();
  c.addEventListener('wheel', function (e) {
    if (!live) return;
    var d = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX; if (!d) return;
    e.preventDefault();
    var t = performance.now(); if (t - last < 420) return; last = t;
    go(act + (d > 0 ? 1 : -1));
  }, { passive: false });
  im.forEach(function (e, i) { e.addEventListener('click', function () { if (live) go(i); }); });
  var sx = null;
  c.addEventListener('pointerdown', function (e) { if (e.pointerType !== 'mouse') sx = e.clientX; });
  c.addEventListener('pointerup', function (e) {
    if (sx === null || !live) return;
    var dx = e.clientX - sx; sx = null; if (Math.abs(dx) > 40) go(act + (dx < 0 ? 1 : -1));
  });
  c.tabIndex = 0;
  c.addEventListener('keydown', function (e) {
    if (!live) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); go(act + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(act - 1); }
  });
})();
