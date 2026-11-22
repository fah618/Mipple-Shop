/* hero.js — polaroids fade in like a watercolour wash: colour blooms out of white through
   a soft noise mask. Starts in sync with the handwritten "mipple" title. */
(function () {
  var canvases = [].slice.call(document.querySelectorAll('.pol canvas[data-src]'));
  if (!canvases.length) return;
  var load = function (u) { return new Promise(function (r) { var i = new Image(); i.onload = function () { r(i); }; i.src = u; }); };
  var calm = matchMedia('(prefers-reduced-motion:reduce)').matches;

  // smooth value noise (3 octaves), values 0..1
  function noise(w, h, seed) {
    var z = seed * 9301 + 49297, r = function () { return (z = (z * 9301 + 49297) % 233280) / 233280; }, out = new Float32Array(w * h);
    [[5, .5], [11, .3], [23, .2]].forEach(function (o) {
      var g = o[0], wt = o[1], G = [];
      for (var i = 0; i <= g + 1; i++) { G.push([]); for (var k = 0; k <= g + 1; k++) G[i].push(r()); }
      for (var y = 0; y < h; y++) for (var x = 0; x < w; x++) {
        var fx = x / w * g, fy = y / h * g, ix = fx | 0, iy = fy | 0, tx = fx - ix, ty = fy - iy,
            sx = tx * tx * (3 - 2 * tx), sy = ty * ty * (3 - 2 * ty),
            a = G[iy][ix], b = G[iy][ix + 1], c = G[iy + 1][ix], d = G[iy + 1][ix + 1], top = a + (b - a) * sx;
        out[y * w + x] += wt * (top + ((c + (d - c) * sx) - top) * sy);
      }
    });
    return out;
  }

  Promise.all(canvases.map(function (c) { return load(c.dataset.src); })).then(function (im) {
    var p = document.querySelector('#ttl path'), ta = p && p.getAnimations && p.getAnimations()[0];
    var t0 = ta && ta.startTime != null ? ta.startTime : performance.now();
    canvases.forEach(function (cv, n) {
      var col = im[n], W = cv.width = col.width, H = cv.height = col.height, g = cv.getContext('2d');
      var full = function () { g.globalCompositeOperation = 'source-over'; g.clearRect(0, 0, W, H); g.drawImage(col, 0, 0); cv.style.filter = ''; };
      if (calm) { full(); return; }
      var mw = 80, mh = Math.round(80 * H / W), mk = document.createElement('canvas'); mk.width = mw; mk.height = mh;
      var mg = mk.getContext('2d'), id = mg.createImageData(mw, mh), nz = noise(mw, mh, n + 1), bias = new Float32Array(mw * mh);
      for (var y = 0; y < mh; y++) for (var x = 0; x < mw; x++) {
        var d = Math.min(1, Math.hypot((x / mw - .5) * 1.1, y / mh - .55) / .8);
        bias[y * mw + x] = nz[y * mw + x] * .72 + d * .5;
      }
      g.imageSmoothingEnabled = true; g.imageSmoothingQuality = 'high';
      var step = function (now) {
        var x = Math.min(1, Math.max(0, (now - t0) / 1000 - .3 - n * .12) / 3.4);
        if (x >= 1) { full(); return; }
        var e = x * x * (3 - 2 * x), T = e * 1.6, px = id.data;
        for (var i = 0; i < bias.length; i++) { var a = (T - bias[i]) / .2; a = a < 0 ? 0 : a > 1 ? 1 : a; px[i * 4 + 3] = (a * a * (3 - 2 * a)) * 255; }
        mg.putImageData(id, 0, 0);
        g.globalCompositeOperation = 'source-over'; g.clearRect(0, 0, W, H); g.drawImage(col, 0, 0);
        g.globalCompositeOperation = 'destination-in'; g.drawImage(mk, 0, 0, W, H); g.globalCompositeOperation = 'source-over';
        cv.style.filter = 'blur(' + ((1 - e) * 5).toFixed(1) + 'px) saturate(' + (.4 + .6 * e).toFixed(2) + ')';
        requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  });
})();
