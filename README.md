# 🦈 YOLOv8 Shark Detection Web App

เว็บแอปพลิเคชันที่สามารถอัปโหลดภาพและตรวจจับฉลามด้วยโมเดล YOLOv8 ขนาดเล็ก พร้อมแสดงภาพผลลัพธ์การตรวจจับบนหน้าเว็บ

## 📸 ความสามารถหลัก
- อัปโหลดภาพผ่านหน้าเว็บ
- ประมวลผลด้วย YOLOv8 (Nano model)
- แสดงผลการตรวจจับวัตถุในรูปภาพ
- ตรวจจับเฉพาะฉลามสายพันธุ์ต่อไปนี้:
  - Blue Shark  
  - Bull Shark  
  - Mako Shark  
  - Sand Tiger Shark  
  - White Shark  
  - Whitetip Shark  
  - Hammerhead Shark  
  - Nurse Shark  
  - Tiger Shark  
  - Whale Shark  

> 📝 *หมายเหตุ: โมเดลที่ใช้เป็นเวอร์ชัน Nano (`yolov8n`) ซึ่งมีขนาดเล็กที่สุด เพื่อให้เหมาะสมกับการรันบน Server ฟรีเช่น Render หรือ Vercel*

## 🛠️ เทคโนโลยีที่ใช้
- Frontend: React.js, TailwindCSS, Framer Motion, React Icons
- Backend: Node.js, Express.js
- AI Model: [Ultralytics YOLOv8 Nano](https://github.com/ultralytics/ultralytics)
- Hosting: Vercel (Frontend), Render (Backend)

## 🚀 การติดตั้งและรันแอป (Local)
### Front End
```bash
cd client
npm install
npm run dev

### Back End
```bash
cd server
npm install
pip install ultralytics
node index.js

