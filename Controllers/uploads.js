//handling route to upload file

const express = require('express');
const upload = require('../Middleware/upload');
const File = require('../Models/File');
const uploadRouter = express.Router();

uploadRouter.post('/upload', upload.single('recfile'), async (req, res) => {
  try {
    const file = new File({
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size
    });

    await file.save();
    res.send('File uploaded and saved to database successfully');
  } catch (err) {
    res.status(500).send('Error uploading file');
  }
});

module.exports = uploadRouter;
            