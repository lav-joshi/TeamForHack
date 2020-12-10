const express = require("express");
const bodyParser = require("body-parser");
const User = require("../models/User");
const moment = require("moment");
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use("/user", User);

router.get("/profile",(req,res)=>{
    
});

module.exports = router;