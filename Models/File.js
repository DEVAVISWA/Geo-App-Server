//to save the uploaded geo json file in mongo db

// const { default: mongoose } = require("mongoose");

// const fileSchema= new mongoose.Schema({
//     fileName:{
//         type: String,
//         required: true
//     },
//     path: {
//         type: String,
//         required: true
//       },
//       size: {
//         type: Number,
//         required: true
//       },
//       createdAt: {
//         type: Date,
//         default: Date.now
//       }
// })

// const File= mongoose.model('File', fileSchema)

// module.exports= File

const { default: mongoose } = require("mongoose");

const geojsonSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["FeatureCollection"],
  },
  features: {
    type: Array,
    required: true,
  },
  fileName: {
    type: String,
    // required: true,
  },
  path: {
    type: String,
    // required: true,
  },
  size: {
    type: Number,
    // required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Geojson = mongoose.model("Geojson", geojsonSchema);

module.exports = Geojson;
