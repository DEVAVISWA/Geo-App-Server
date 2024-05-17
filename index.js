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

app.use('/api', uploadRouter)

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
