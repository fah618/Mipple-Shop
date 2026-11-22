/* underline.js — draws the pink underline on .ul text when it scrolls into view */
(function () {
  var els = document.querySelectorAll('.ul');
  if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('in'); }); return; }
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { threshold: .6 });
  els.forEach(function (e) { io.observe(e); });
})();
