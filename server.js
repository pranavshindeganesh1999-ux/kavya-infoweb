const express = require('express');
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const cors = require('cors');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;

// ===== Middleware =====
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ===== Serve frontend =====
app.use(express.static(path.join(__dirname, 'frontend')));

// ===== File Upload Setup =====
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

app.post('/api/contact', (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res
      .status(400)
      .json({ success: false, message: 'Missing required fields' });
  }

  try {
    const filePath = path.join(__dirname, 'contacts.xlsx');
    let data = [];

    if (fs.existsSync(filePath)) {
      const wb = xlsx.readFile(filePath);
      const ws = wb.Sheets[wb.SheetNames[0]];
      data = xlsx.utils.sheet_to_json(ws);
    }

    data.push({
      Timestamp: new Date().toLocaleString(),
      Name: name,
      Email: email,
      Phone: phone || '',
      Subject: subject,
      Message: message
    });

    const ws = xlsx.utils.json_to_sheet(data);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Contacts');
    xlsx.writeFile(wb, filePath);

    res.json({ success: true, message: 'Message saved to Excel successfully!' });
  } catch (err) {
    console.error('Server error:', err);
    res
      .status(500)
      .json({ success: false, message: 'Internal server error (contact)' });
  }
});

// APPLY NOW FORM HANDLER
app.post('/api/apply', upload.single('resume'), (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      education,
      year,
      position,
      status,
      address,
      city,
      state,
      zip,
      message
    } = req.body;

    if (!name || !email || !phone || !education || !year || !position) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields!'
      });
    }

    const resumePath = req.file ? req.file.path : 'Not Uploaded';

    const filePath = path.join(__dirname, 'applications.xlsx');
    let data = [];

    if (fs.existsSync(filePath)) {
      const wb = xlsx.readFile(filePath);
      const ws = wb.Sheets[wb.SheetNames[0]];
      data = xlsx.utils.sheet_to_json(ws);
    }

    data.push({
      Timestamp: new Date().toLocaleString(),
      Name: name,
      Email: email,
      Phone: phone,
      Education: education,
      YearOfCompletion: year,
      Position: position,
      EmploymentStatus: status,
      Address: address,
      ResumePath: resumePath,
      Message: message || ''
    });

    const ws = xlsx.utils.json_to_sheet(data);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Applications');
    xlsx.writeFile(wb, filePath);

    res.json({ success: true, message: 'Application saved successfully!' });
  } catch (err) {
    console.error('Server error (apply):', err);
    res.status(500).json({ success: false, message: 'Internal server error (apply)' });
  }
});

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});


app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});






















// const express = require('express');
// const fs = require('fs');
// const path = require('path');
// const xlsx = require('xlsx');
// const cors = require('cors');
// const multer = require('multer');

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(cors());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// app.use(express.static(path.join(__dirname, 'forentend')));

// app.post('/api/contact', (req, res) => {
//   const { name, email, phone, subject, message } = req.body;

//   if (!name || !email || !subject || !message) {
//     return res.status(400).json({ success: false, message: 'Missing required fields' });
//   }

//   try {
//     const filePath = path.join(__dirname, 'contacts.xlsx');
//     let data = [];

//     if (fs.existsSync(filePath)) {
//       const wb = xlsx.readFile(filePath);
//       const ws = wb.Sheets[wb.SheetNames[0]];
//       data = xlsx.utils.sheet_to_json(ws);
//     }

//     data.push({
//       Name: name,
//       Email: email,
//       Phone: phone || "",
//       Subject: subject,
//       Message: message,
//       Timestamp: new Date().toLocaleString()
//     });

//     const ws = xlsx.utils.json_to_sheet(data);
//     const wb = xlsx.utils.book_new();
//     xlsx.utils.book_append_sheet(wb, ws, 'Contacts');
//     xlsx.writeFile(wb, filePath);

//     res.json({ success: true, message: 'Message saved to Excel successfully!' });
//   } catch (err) {
//     console.error("Server error:", err);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });



