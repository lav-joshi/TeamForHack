const express = require("express");
const bodyParser = require("body-parser");
const User = require("../models/User");
const moment = require("moment");
const router = express.Router();
const auth = require("../middleware/authuser");


router.use(bodyParser.urlencoded({ extended: true }));

router.get("/dashboard",auth,(req,res)=>{
    res.render("dashboard",{currentUser:req.user});
});

router.get("/hackathon",auth,(req,res)=>{
      
});

module.exports = router;