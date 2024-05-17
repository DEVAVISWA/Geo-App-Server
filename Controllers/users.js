const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../Models/User");
const {  JWT_SECRET } = require("../Utils/config");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username, password });
    await user.save();
    res.status(201).send("User created");
  } catch (error) {
    res.status(400).send("Error creating user");
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
    // try {
    //   const user = await User.findOne({ username });
    //   if (!user || !(await bcrypt.compare(password, user.password))) {
    //     return res.status(400).send('Invalid credentials');
    //   }
    //   const token = jwt.sign({ id: user._id }, SECRET,{expiresIn:'6h'});
    //   res.json({ token });
    // } catch (error) {
    //   res.status(400).send('Error logging in');
    // }

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ messahe: "user does not exist" });
  }
  const isAuth = await bcrypt.compare(password, user.password);
  if (!isAuth) {
    return res.status(401).json({ message: "password wrong" });
  }
  const payload= {
    id:user._id,
    username
  }
  const token= jwt.sign(payload,JWT_SECRET,{expiresIn:'1h'})
  res.status(200).json({
    token,username
  })
});

module.exports = router;
