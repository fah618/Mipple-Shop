/* scroll-fx.js — while scrolling the hero: polaroids slide away, logo butterflies fly across */
(function () {
  if (matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  var flies = [].slice.call(document.querySelectorAll('.fly')), root = document.documentElement;
  var F = [{x0:-.15,x1:1.1,y:.2,a:.1,f:3.2,t:.04},{x0:1.15,x1:-.1,y:.4,a:.12,f:2.4,t:.12},{x0:-.2,x1:1.15,y:.6,a:.09,f:3.8,t:.2},{x0:1.2,x1:-.15,y:.78,a:.1,f:2.8,t:.28}];
  var tick = false;
  function frame() {
    tick = false;
    var vh = innerHeight, vw = innerWidth, y = scrollY;
    var p = Math.min(1, Math.max(0, y / (vh * .7)));
    root.style.setProperty('--e', (p * p * (3 - 2 * p)).toFixed(3));
    flies.forEach(function (el, i) {
      var c = F[i % F.length], u = Math.min(1, Math.max(0, (y / (vh * .9) - c.t) / .9)), dir = c.x1 > c.x0 ? 1 : -1;
      var x = (c.x0 + (c.x1 - c.x0) * u) * vw, yy = (c.y + Math.sin(u * Math.PI * c.f) * c.a) * vh, rot = Math.cos(u * Math.PI * c.f) * 16 + dir * 14;
      el.style.opacity = (u <= 0 || u >= 1 ? 0 : Math.min(1, u * 5, (1 - u) * 5)).toFixed(2);
      el.style.transform = 'translate(' + x.toFixed(1) + 'px,' + yy.toFixed(1) + 'px) rotate(' + rot.toFixed(1) + 'deg) scaleX(' + dir + ')';
    });
  }
  function ask() { if (!tick) { tick = true; requestAnimationFrame(frame); } }
  addEventListener('scroll', ask, { passive: true }); addEventListener('resize', ask); frame();
})();
