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

router.get("/logout",async (req,res)=>{
    if(req.session.client==="user"){
        await User.updateOne(
            { email: req.user.email },
            { $pull: { accessToken: { $in: [req.session.token] } } }
        );
    }
    req.logout();
    req.session = null;
    req.token = null;
    res.cookie("token", "");
    res.redirect("/");
});

module.exports = router;