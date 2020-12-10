const express = require("express");
const bodyParser = require("body-parser");
const User = require("../../models/User");
const moment = require("moment");
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
app.use("/user", user);

router.get("/profile",(req,res)=>{
    
});

module.exports = router;
