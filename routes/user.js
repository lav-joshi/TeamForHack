const express = require('express');
const bodyParser = require('body-parser');
const User = require('../models/User');
const moment = require('moment');
const router = express.Router();
const auth = require('../middleware/authuser');
const Hackathon = require('../models/Hackathon');
const Suggestion = require('../models/Suggestion');

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/dashboard', auth, (req, res) => {
    User.findOne({_id: req.user._id})
    .populate({
        path: 'currentHacks'
    })
    .exec((err,user)=>{
        if(err) Error(err);
        else {
            // console.log(req.query);
            res.render('dashboard', { currentUser: user, query:req.query});
        }
    })
});

router.post('/dashboard/editprofile/',auth,(req,res)=>{
    User.findOne({_id: req.user._id},async (err,user)=>{
        if(err) Error(err);
        user.contact = req.body.contact;
        user.github = req.body.github;
        user.linkedin = req.body.linkedin;
        user.bio = req.body.bio;
        await user.save();
        res.redirect('/user/dashboard?section=editProfile');
    })
})
router.post('/dashboard/editprofile/addskill/',auth,(req,res)=>{
    User.findOne({_id: req.user._id},async(err,user)=>{
        if(err) Error(err);
        req.body.skills.split(",").forEach((skill)=>{
            user.skills.push(skill);
        })
        await user.save(); 
        res.redirect('/user/dashboard?section=editProfile');
    })
})
router.post('/dashboard/editprofile/del',auth,(req,res)=>{
    User.findOne({_id: req.user._id},async(err,user)=>{
        if(err) Error(err);
        user.skills.forEach((skill,i)=>{
            if(skill == req.body.skill){
                user.skills.splice(i,1);
            }
        })
        await user.save();
        res.redirect('/user/dashboard?section=editProfile');
    })
})

router.get('/hackathons', auth, (req, res) => {
    // const hackathonsFinished = [];
    const hackathonsCurrent = [];
    Hackathon.find({finished:false})
    .sort({
        end_date: "asc"
    })
    .populate({
        path:"participants"
    })
    .exec(async (err,hackathonsx)=>{
        if(err) Error(err);
        else{
            await hackathonsx.forEach((hackathon)=>{
                hackathonsCurrent.push(hackathon);
            })
            Hackathon.find({finished:true})
            .sort({
                end_date: "desc"
            })
            .populate({
                path:"participants"
            })
            .exec(async (err,hackathonsx)=>{
                if(err) Error(err);
                else{
                    await hackathonsx.forEach((hackathon)=>{
                        hackathonsCurrent.push(hackathon);
                    })
                    User.findOne({_id:req.user._id},(err,user)=>{
                        if(err) Error(err);
                        // console.log(user);
                        res.render('hackathons',{ hacksCurrent: hackathonsCurrent, user: user});
                    })
                }
            })
        }
    })
    
});
router.post('/hackathons/insert/:hackathonid/:userid',auth, (req,res)=>{
    Hackathon.findOne({_id: req.params.hackathonid},(err, hackathon)=>{
        if(err) Error("Could not process fetch request "+ err);
        else if(!hackathon) console.log("Hackathon id invalid");
        else {
            User.findOne({_id: req.params.userid},async (err, user)=>{
                if(err) Error("Could not process fetch request "+ err);
                else if(!user) console.log("User id invalid");
                else {
                    hackathon.participants.push(user);
                    user.currentHacks.push(hackathon);
                    
                    await hackathon.save();
                    await user.save();
                    console.log("Participation added");
                }
            })
        }
    })
    res.send("OK");
})
router.delete('/hackathons/insert/:hackathonid/:userid',auth, (req,res)=>{
    Hackathon.findOne({_id: req.params.hackathonid})
    .exec((err, hackathon)=>{
        if(err) Error("Could not process fetch request "+ err);
        else if(!hackathon) console.log("Hackathon id invalid");
        else {
            // console.log(hackathon.participants);
            User.findOne({_id: req.params.userid},async (err, user)=>{
                if(err) Error("Could not process fetch request "+ err);
                else if(!user) console.log("User id invalid");
                else {
                    // console.log(userr);
                    let flag = 1;
                    for(let i=0;i<hackathon.participants.length;i++){ 
                        if(hackathon.participants[i].toString() == user._id.toString()){
                            hackathon.participants.splice(i,1);
                            
                            console.log("Participation Removed");
                            flag = 0;
                        }
                    }
                    for(let i=0;i<user.currentHacks.length;i++){ 
                        if(user.currentHacks[i].toString() == hackathon._id.toString()){
                            user.currentHacks.splice(i,1);
                            
                        }
                    }
                    if(flag) console.log("User did not match");
                    else {
                        hackathon.save();
                        user.save();
                    }
                }
            })
        }
    })
    res.send("OK");
});

router.post('/suggestions',auth,(req,res)=>{
    console.log("here")
    Suggestion.create({
        name:req.user.name,
        email:req.user.email,
        subject:req.body.subject,
        message:req.body.message
    },async(err)=>{
        if(err) console.log(err);
        else {
            console.log("New Suggestion");
            res.redirect("/user/dashboard");
        }
    })
})

module.exports = router;
