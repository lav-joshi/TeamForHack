const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  accessToken: [String],
  name: {
    type: String,
    trim: true,
    required: true
  },
  googleId:{
     type:String,
     trim:true,
     required:true
  },
  email: {
    type: String,
    trim: true,
    required: true
  },
  displayPicture: {
    type: String,
    trim: true
  },
  contact:{
      type:Number,
      trim:true
  },
  yourSkills:{
      type:[String]
  },
  currentHacks:{
    type:[String]
  }
});

module.exports = mongoose.model("user", UserSchema);