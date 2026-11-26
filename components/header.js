/* components/header.js
   Renders the shared site header into <header class="bar" id="site-header" data-page="…"></header>
   and wires up: mobile menu, active link, white pill on scroll.
   Links are built from this script's own URL, so it works from any page depth,
   on GitHub Pages sub-paths and when opening the files directly (file://). */
(function () {
  var host = document.getElementById('site-header');
  if (!host) return;
  var root = document.currentScript.src.replace(/components\/header\.js.*$/, '');
  var page = host.getAttribute('data-page') || 'home';
  var DISCORD = 'https://discordapp.com/users/692067760498409603';
  // A menu entry is either a link  {id, label, href}  or a dropdown group  {id, label, items:[links]}
  var LINKS = [
    { id: 'home',  label: 'หน้าหลัก',  href: 'index.html' },
    { id: 'works', label: 'รวมผลงาน',  href: 'pages/works/index.html' },
    { id: 'ready', label: 'ไฟล์ชุดสำเร็จ', href: 'pages/ready/index.html' },
    { id: 'guide', label: 'คู่มือการใช้งานผลงาน', items: [
      { id: 'hire',   label: 'รายละเอียดการจ้างงานและการนำผลงานไปใช้', href: 'pages/hire/index.html' },
      { id: 'resale', label: 'การขายต่อและโอนสิทธิ์ไฟล์สกิน',          href: 'pages/resale/index.html' }
    ] }
  ];
  var CHEVRON = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 5l4 4 4-4"></path></svg>';
  function link(l) {
    var here = l.id === page;
    return '<a href="' + root + l.href + '"' + (here ? ' class="on" aria-current="page"' : '') + '>' + l.label + '</a>';
  }
  var nav = LINKS.map(function (l) {
    if (!l.items) return link(l);
    var inside = l.items.some(function (i) { return i.id === page; });
    return '<div class="dd">' +
      '<button class="dd-btn' + (inside ? ' on' : '') + '" type="button" aria-expanded="false" aria-haspopup="true" aria-controls="dd-' + l.id + '">' + l.label + CHEVRON + '</button>' +
      '<div class="dd-panel" id="dd-' + l.id + '">' + l.items.map(link).join('') + '</div></div>';
  }).join('');

  host.className = 'bar';
  host.innerHTML =
    '<a class="brand" href="' + root + 'index.html" aria-label="mipple home">' +
      '<img class="mini" alt="" aria-hidden="true" src="' + root + 'assets/images/logo.png"><span>mipple</span></a>' +
    '<div class="act">' +
      '<a class="cta" href="' + DISCORD + '" target="_blank" rel="noopener noreferrer">' +
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="M3 7l9 6 9-6"></path></svg>' +
        '<span>สั่งทำชุดเลย!</span></a>' +
      '<button class="mb" type="button" aria-expanded="false" aria-controls="menu" aria-label="เมนู">' +
        '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M3 6h16M3 11h16M3 16h16"></path></svg></button></div>' +
    '<nav id="menu" aria-label="เมนูหลัก">' + nav + '</nav>';

  var mb = host.querySelector('.mb'), menu = host.querySelector('#menu');
  mb.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    mb.setAttribute('aria-expanded', open);
  });
  // dropdown groups: click / tap to open, click outside or Esc to close
  var groups = [].slice.call(host.querySelectorAll('.dd'));
  function closeGroups(except) {
    groups.forEach(function (g) {
      if (g === except) return;
      g.classList.remove('open'); g.querySelector('.dd-btn').setAttribute('aria-expanded', 'false');
    });
  }
  groups.forEach(function (g) {
    var b = g.querySelector('.dd-btn');
    b.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = g.classList.toggle('open');
      b.setAttribute('aria-expanded', open); closeGroups(g);
    });
  });
  document.addEventListener('click', function () { closeGroups(null); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeGroups(null); });

  var f = function () { host.classList.toggle('stuck', window.scrollY > 12); };
  addEventListener('scroll', f, { passive: true });
  f();
})();
