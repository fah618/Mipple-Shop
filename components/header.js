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
  var LINKS = [
    ['home',  'หน้าหลัก',                 'index.html'],
    ['works', 'รวมผลงาน',            'pages/works/index.html'],
    ['ready', 'ไฟล์ชุดสำเร็จ',          'pages/ready/index.html'],
    ['hire',  'รายละเอียดการจ้างงาน',   'pages/hire/index.html']
  ];
  var nav = LINKS.map(function (l) {
    return '<a href="' + root + l[2] + '"' + (l[0] === page ? ' class="on" aria-current="page"' : '') + '>' + l[1] + '</a>';
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
  var f = function () { host.classList.toggle('stuck', window.scrollY > 12); };
  addEventListener('scroll', f, { passive: true });
  f();
})();
