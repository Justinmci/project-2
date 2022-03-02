const path = require("path");
const router = require('express').Router();


router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});    

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.sendFile()
});

module.exports = router