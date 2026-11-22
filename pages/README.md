# pages/
แต่ละหน้าเป็นโฟลเดอร์ที่มี `index.html` (หน้าแรกอยู่ที่ `../index.html`)

| หน้า | ไฟล์ | CSS / JS ที่ใช้ |
|---|---|---|
| ผลงานอื่นๆ | `works/index.html` | `styles/gallery.css` · `scripts/gallery.js` |
| ไฟล์ชุดสำเร็จ (เร็วๆ นี้) | `ready/index.html` | `styles/ready.css` |
| รายละเอียดการจ้างงาน | `hire/index.html` | `styles/hire.css` · `scripts/underline.js` |

เพิ่มหน้าใหม่: สร้างโฟลเดอร์ใหม่ + คัดลอก `<head>` จากหน้าที่มี แล้วเพิ่มลิงก์ใน `components/header.js`
(ใช้พาธแบบ relative เช่น `../../styles/base.css` เสมอ)
