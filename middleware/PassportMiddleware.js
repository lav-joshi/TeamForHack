const GoogleStrategy = require("passport-google-oauth2").Strategy;
const passport = require("passport");
const keys = require("../config/keys");

const User = require("../models/User");

passport.use(new GoogleStrategy({
    clientID:     keys.clientID,
    clientSecret: keys.clientSecret,
    callbackURL: "http://localhost:3000/auth/google/callback",
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({ googleId: profile.id }, async (err, user)=> {
       if(err){
           return done(err);
       }
       if(user){
            user.accessToken.push(accessToken);
            await user.save();
            return done(err,user);
       }else if(!user){
            User.create({googleId:profile.id},async (err,user)=>{
                user.accessToken.push(accessToken);
                await user.save();
                return done(err,user);
            });
       }
    });  
  }
));

passport.serializeUser(function (user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function (user, done) {
    done(null, user);
  });