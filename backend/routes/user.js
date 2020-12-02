const express = require("express");
const bodyParser = require("body-parser");
const Student = require("../../models/User");
const moment = require("moment");
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
app.use("/user", user);

router.get("/dashboard",(req,res)=>{
    
});

module.exports = router;
