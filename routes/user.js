const express = require('express');
const bodyParser = require('body-parser');
const User = require('../models/User');
const moment = require('moment');
const router = express.Router();
const auth = require('../middleware/authuser');
const Hackathon = require('../models/Hackathon');

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/dashboard', auth, (req, res) => {
  res.render('dashboard', { currentUser: req.user });
});

router.get('/hackathons', auth, (req, res) => {
  Hackathon.find({}, (err, hackathons) => {
    if (err) {
      Error(err);
    } else {
      res.render('hackathons', { hackathons: hackathons });
    }
  });
});

module.exports = router;
