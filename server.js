const express = require("express");
const path = require("path");
const app = express();

// Render يوفر لك متغير PORT تلقائي
const PORT = process.env.PORT || 3000;

// يخلي مجلد "public" متاح كملفات ثابتة (HTML, CSS, JS, Images)
app.use(express.static(path.join(__dirname, "public")));

// الصفحة الرئيسية
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// تشغيل السيرفر
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});