const express = require("express");
const passport = require("passport");
const User = require("../models/User");
const router = express.Router();

router.get(
    "/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
);

router.get("/google/callback",
passport.authenticate("google", { failureRedirect: "/" }),
    (req,res)=>{
      req.session.token = req.user.accessToken[req.user.accessToken.length-1];
      res.cookie("token",req.session.token);
      User.findOne({email:req.user.email},async (err,user)=>{
            if(user){
                res.redirect("/user/dashboard");
            }else{
                res.redirect("/");
            }
      });
  }
);

router.get("/logout", (req,res)=>{
    User.findOne({ email: req.user.email },async(err,user)=>{
        user.accessToken.splice(user.accessToken.length-1,1);
        await user.save();
    })
    req.logout();
    req.session = null;
    req.token = null;
    res.cookie("token", "");
    res.redirect("/");
    
}); 

module.exports = router;