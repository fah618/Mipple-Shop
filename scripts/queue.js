/* queue.js — renders the queue table from content/queue.js (window.MIPPLE_QUEUE) */
(function () {
  var data = window.MIPPLE_QUEUE, tb = document.getElementById('qtb'); if (!data || !tb) return;
  var STATUS = { wait: 'ยังไม่เริ่ม', wip: 'กำลังทำ', done: 'เสร็จแล้ว', no: 'ยกเลิก' };
  var PAYMENT = { full: 'เต็มจำนวน', dep: 'มัดจำ', none: 'ยังไม่ชำระ' };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var fmt = function (iso) { var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || ''); return m ? (+m[3]) + '/' + (+m[2]) + '/' + m[1] : ''; };
  var rows = data.rows || [];
  tb.innerHTML = rows.length ? rows.map(function (r) {
    return '<tr><td><span class="qid">' + esc(r.id) + '</span></td><td>' + esc(r.name) + '</td><td>' + esc(r.type) + '</td>' +
      '<td><span class="qp qs-' + esc(r.status) + '">' + esc(STATUS[r.status] || r.status) + '</span></td>' +
      '<td class="qd">' + fmt(r.date) + '</td><td class="qnote">' + esc(r.note) + '</td>' +
      '<td><span class="qp qp-' + esc(r.payment) + '">' + esc(PAYMENT[r.payment] || r.payment) + '</span></td></tr>';
  }).join('') : '<tr><td colspan="7" class="qempty">ยังไม่มีคิว</td></tr>';
  var cnt = document.getElementById('qcnt'); if (cnt) cnt.textContent = 'ทั้งหมด ' + rows.length + ' คิว';
  if (data.updated) {
    var u = document.getElementById('qupd');
    try { u.textContent = 'อัปเดตล่าสุด ' + new Date(data.updated).toLocaleDateString('th-TH-u-ca-gregory', { day: 'numeric', month: 'short', year: 'numeric' }); } catch (e) {}
  }
})();
