const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  Admin.findOne({ username }).then(admin => {
    if (!admin) return res.send("Invalid login");

    bcrypt.compare(password, admin.password).then(isMatch => {
      if (!isMatch) return res.send("Invalid login");

      res.redirect('/home.html');
    }).catch(err => {
      res.status(500).send("Server error");
    });
  }).catch(err => {
    res.status(500).send("Server error");
  });
});


module.exports = router;
