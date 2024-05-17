const express = require('express');
const upload = require('../Middleware/upload');
const router = express.Router();

router.post('/upload', upload.single('file'), (req, res) => {
  // Handle file processing and saving to database
  res.send('File uploaded successfully');
});

module.exports = router;
