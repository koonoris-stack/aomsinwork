const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data.json');
const CONFIG_FILE = path.join(__dirname, 'config.json');

// สร้างโฟลเดอร์และไฟล์ที่ต้องการถ้ายังไม่มี
try {
  const uploadsDir = path.join(__dirname, 'uploads');
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]', 'utf8');
  if (!fs.existsSync(CONFIG_FILE)) fs.writeFileSync(CONFIG_FILE, '{}', 'utf8');
} catch (e) {
  console.error('Failed to ensure required files/directories:', e);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, 'uploads')),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

app.use(cors());
app.use(express.json());
// เสิร์ฟไฟล์ static 
app.use(express.static(__dirname));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ฟังก์ชันอ่านข้อมูล
const readData = () => {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeData = (data) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {}
};

const readConfig = () => {
  try {
    return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
  } catch (e) {
    return {};
  }
};

const writeConfig = (data) => {
  try {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (e) {}
};

// API: ดึงวิดีโอทั้งหมด
app.get('/api/videos', (req, res) => {
  const videos = readData();
  res.json(videos);
});

// API: Config
app.get('/api/config', (req, res) => {
  res.json(readConfig());
});

app.post('/api/config', (req, res) => {
  const newConfig = req.body;
  if (!newConfig || typeof newConfig !== 'object') {
    return res.status(400).json({ error: 'Invalid config format' });
  }
  writeConfig(newConfig);
  res.json({ message: 'Config updated successfully' });
});

// API: เพิ่มวิดีโอใหม่
app.post('/api/videos', upload.single('videoFile'), (req, res) => {
  let video;

  if (req.is('multipart/form-data')) {
    // Form submission from Admin Panel
    video = {
      id: req.body.ytId || ('local_' + Date.now()),
      t: req.body.t,
      s: req.body.s,
      d: req.body.d || '',   // ← เพิ่มคำอธิบาย
      sd: req.body.sd || ''  // short description for listing
    };
    if (req.body.ytId) {
      video.ytId = req.body.ytId;
    } else if (req.file) {
      video.fileUrl = '/uploads/' + req.file.filename;
    } else {
      return res.status(400).json({ error: 'ต้องมีลิงก์ YouTube หรือไฟล์วิดีโอ' });
    }
  } else {
    // Legacy JSON support
    video = req.body.video;
  }

  if (!video || !video.id || !video.t || !video.s) {
    return res.status(400).json({ error: 'ข้อมูลไม่ครบถ้วน' });
  }

  const videos = readData();
  // ป้องกันการแอดซ้ำ
  if (videos.some(v => v.id === video.id)) {
    return res.status(400).json({ error: 'วิดีโอนี้มีในระบบแล้ว' });
  }

  // เพิ่มไว้บนสุด
  videos.unshift(video);
  writeData(videos);
  
  res.status(201).json({ message: 'เพิ่มวิดีโอสำเร็จ', video });
});

// API: แก้ไขวิดีโอ (PATCH)
app.patch('/api/videos/:id', (req, res) => {
  const { id } = req.params;
  const { t, s, d, sd } = req.body;
  const videos = readData();
  const idx = videos.findIndex(v => v.id === id);
  if (idx === -1) return res.status(404).json({ error: 'ไม่พบวิดีโอนี้' });
  if (t) videos[idx].t = t;
  if (s) videos[idx].s = s;
  if (d !== undefined) videos[idx].d = d;
  if (sd !== undefined) videos[idx].sd = sd;
  if (req.body.ytId !== undefined) videos[idx].ytId = req.body.ytId;
  writeData(videos);
  res.json({ message: 'แก้ไขวิดีโอสำเร็จ', video: videos[idx] });
});

// API: ลบวิดีโอ
app.delete('/api/videos/:id', (req, res) => {
  const { id } = req.params;
  const videos = readData();
  const idx = videos.findIndex(v => v.id === id);
  if (idx === -1) return res.status(404).json({ error: 'ไม่พบวิดีโอนี้' });
  const removed = videos.splice(idx, 1)[0];
  writeData(videos);
  res.json({ message: 'ลบวิดีโอสำเร็จ', video: removed });
});

// ให้ Route /admin เปิดไฟล์ admin.html
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

// ทุก Route อื่นๆ ที่ไม่ใช่ /api ให้คืนค่า index.html (สำหรับการใช้งาน Single Page App)
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'Not Found' });
  }
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  console.log(`Admin Panel at http://localhost:${PORT}/admin`);
});
