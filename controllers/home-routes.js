const path = require("path");
const sequelize = require('../config/connection');
const router = require('express').Router();


router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});  

router.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/signup.html"));
});  

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.sendFile()
});

module.exports = router