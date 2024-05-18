const { default: mongoose } = require("mongoose");
const express = require("express");
const cors = require("cors");
const { MONGODB_URL, PORT } = require("./Utils/config");
const bodyParser= require('body-parser');
const router = require("./Controllers/users");
const path= require('path');
const uploadRouter = require("./Controllers/uploads");

const app = express();

app.use(express.json());
app.use(bodyParser.json())
// app.use(cors);
app.get("/", (req, res) => {
  res.send("<h1>Geo Data App Server</h1>");
});
app.use('/api/users',router)

// app.use('/uploads', express.static(path.join(__dirname,'uploads')))
// app.use('/api', uploadRouter)

// app.use('/api', uploadRouter)

const multer= require('multer');
const Geojson = require("./Models/File");
const upload= multer({dest:'uploadedFile/'})
const fs= require('fs')

app.post('/api/upload', upload.single('file'),(req,res)=>{
  
  if(!req.file) {
    return res.status(400).send('no file uploaded')
  }
  fs.readFile(req.file.path, 'utf-8', async (err,data)=>{
    if(err){
      return res.status(500).send('err reading file')
    }
    try {
      const geoJsonData= JSON.parse(data)
      // if(geoJsonData.type !=='FeatureCollection' || Array.isArray(geoJsonData.features)) {
      //   return res.status(400).send('invalid GeoJson Format')
      // }
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

  // res.send('successfull')
})

mongoose.set("strictQuery", false);
mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("connected to DB");
    app.listen(PORT, () => {
      console.log(`server running on http://127.0.0.1:${PORT}`);
    });
  })
  .catch((e) => {
    console.log(e, "error connecting to DB");
  });
