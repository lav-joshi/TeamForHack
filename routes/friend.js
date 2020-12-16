const express = require('express');
const bodyParser = require('body-parser');
const User = require('../models/User');
const moment = require('moment');
const router = express.Router();
const auth = require('../middleware/authuser');
const Hackathon = require('../models/Hackathon');

router.use(bodyParser.urlencoded({ extended: true }));


router.get("/chat",auth,(req,res)=>{
    User.findOne({email:req.user.email},(err,user)=>{
        let currentUser = req.user;
        currentUser.friends = user.friends;
        res.render("chatapp",{currentUser});
    });
});


router.get("/chat/addfriend/:ui",auth,(req,res)=>{
   User.findOne({email:req.user.email},async (err,user)=>{
       User.findOne({_id:req.params.ui},async (err,friend)=>{
            const x ={
                friend_id:req.params.ui,
                name: friend.name,
                email:friend.email
            }
            const y = {
                friend_id:user._id,
                name:user.name,
                email:user.email
            }
            user.friends.push(x);
            await user.save();
            friend.friends.push(y);
            await friend.save();
            res.send("hi");
       });
   });
});
module.exports = router;
