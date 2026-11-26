/* copylink.js — copy-link box on the resale page */
(function () {
  var inp = document.getElementById('cp-url'), btn = document.getElementById('cp-bt'), tx = document.getElementById('cp-tx');
  if (!inp || !btn || !tx) return;
  if (/^https?:$/.test(location.protocol)) inp.value = location.origin + location.pathname;
  var timer;
  function done() {
    tx.textContent = 'คัดลอกแล้ว'; btn.classList.add('ok');
    clearTimeout(timer);
    timer = setTimeout(function () { tx.textContent = 'คัดลอก'; btn.classList.remove('ok'); }, 2000);
  }
  function fallback() {
    inp.focus(); inp.select(); inp.setSelectionRange(0, inp.value.length);
    try { if (document.execCommand('copy')) done(); } catch (e) {}
  }
  btn.addEventListener('click', function () {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(inp.value).then(done, fallback);
    } else fallback();
  });
  inp.addEventListener('focus', function () { inp.select(); });
})();
