/* content/queue.js — queue table data. Edit this file, commit, push: the website updates itself.

   status : "wait" ยังไม่เริ่ม | "wip" กำลังทำ | "done" เสร็จแล้ว | "no" ยกเลิก
   payment: "full" เต็มจำนวน  | "dep" มัดจำ   | "none" ยังไม่ชำระ
   date   : expected finish date, YYYY-MM-DD
   updated: set to today's date when you change something (shown above the table), or null */
window.MIPPLE_QUEUE = {
  "updated": "2026-11-22T08:32:25.646Z",
  "rows": [
    {"id":"MP251029-02","name":"lucky roux","type":"ชุดหมวกแมลงวาฬ วุธดาว","status":"done","date":"2026-11-01","payment":"full"},
    {"id":"MP251029-03","name":"Mahoraga","type":"เซต 70 ต่าย","status":"done","date":"2026-11-03","payment":"full"},
    {"id":"MP251029-04","name":"Black Magician","type":"แฟผีต่าย","status":"done","date":"2026-11-05","payment":"full"},
    {"id":"MP251030-01","name":"Gon","type":"เซตแมลงวาน","status":"done","date":"2026-11-07","payment":"full"},
    {"id":"MP251030-02","name":"Shinobu","type":"ชุดหมวกแมลงคาว","status":"done","date":"2026-11-09","payment":"full"},
    {"id":"MP251031-01","name":"irelia LOL","type":"เซตแมลงแมว + ประดับ","status":"done","date":"2026-11-11","payment":"full"},
    {"id":"MP251101-01","name":"elaina","type":"เซตแฟผีต่าย","status":"done","date":"2026-11-13","payment":"full"},
    {"id":"MP251102-01","name":"inoue orihime","type":"เซตแมลงแกะ","status":"done","date":"2026-11-15","payment":"full"},
    {"id":"MP251102-02","name":"Sailor moon","type":"เซตแมลงแกะ","status":"done","date":"2026-11-17","payment":"full"},
    {"id":"MP251106-01","name":"Makima suit","type":"เซตแมลงแกะ","status":"done","date":"2026-11-19","payment":"dep"},
    {"id":"MP251106-02","name":"Makima private","type":"เซต 60 แกะ","status":"wip","date":"2026-11-21","payment":"dep"},
    {"id":"MP251107-02","name":"ยังไม่บรีฟ","type":"เซตแมลงแมว","status":"wait","date":"2026-11-23","payment":"dep"}
  ]
};
