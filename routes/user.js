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
    const hackathonsFinished = [];
    const hackathonsCurrent = [];
    Hackathon.find({finished:false})
    .sort({
        end_date: "asc"
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
            .exec(async (err,hackathonsx)=>{
                if(err) Error(err);
                else{
                    await hackathonsx.forEach((hackathon)=>{
                        hackathonsFinished.push(hackathon);
                    })
                    res.render('hackathons',{ hacksFinished: hackathonsFinished, hacksCurrent: hackathonsCurrent});
                }
            })
        }
    })
    
    
});

module.exports = router;
