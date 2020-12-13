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
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hack" }]
  },
  github:{
    type:String
  },
  linkedin:{
    type:String
  }
});

module.exports = mongoose.model("User", UserSchema);