//to handle GeoJSON file
const { default: mongoose } = require("mongoose");

const locationSchema = new mongoose.Schema({
  type: {
    type: String,
    default: "Point",
  },
  coordinates: {
    type: [Number],
    index: "2dsphere", //2d will not take its cicumferance of the index will be 2dSphere
  },
});

const GeoSchema = new mongoose.Schema({
  //insted of multiple nesting i saving it in a seperate variable and giving its value to the geometry
  geometry: locationSchema,
});

const Geo = mongoose.model("Geo", GeoSchema);

module.exports = Geo;
