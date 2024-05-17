//handling route to upload file

const express = require('express');
const upload = require('../Middleware/upload');
const File = require('../Models/File');
const uploadRouter = express.Router();
const fs= require('fs');
const Geojson = require('../Models/File');

uploadRouter.post('/upload', upload.single('file'), async (req, res) => {
  // try {
  //   const file = new File({
  //     filename: req.file.filename,
  //     path: req.file.path,
  //     size: req.file.size
  //   });

  //   await file.save();
  //   res.send('File uploaded and saved to database successfully');
  // } catch (err) {
  //   res.status(500).send('Error uploading file');
  // }


  if(!req.file) {
    return res.status(400).send('no file uploaded')
  }
  fs.readFile(req.file.path, 'utf-8', async (err,data)=>{
    if(err){
      return res.status(500).send('err reading file')
    }
    try {
      const geoJsonData= JSON.parse(data)
      if(geoJsonData.type !=='FeatureCollection' || Array.isArray(geoJsonData.features)) {
        return res.status(400).send('invalid GeoJson Format')
      }
      const geojson= new Geojson(geoJsonData)
      await geojson.save()

      fs.unlink(req.file.path , (err)=>{
        if(err){
          console.log('Err deleting file', err)
        }
      })
      res.send('file uploaded and saved to DB')
    } catch (error) {
      res.status(500).send('err uploading file')
    }
  })
});

module.exports = uploadRouter;
            