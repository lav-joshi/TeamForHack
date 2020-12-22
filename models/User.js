const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  accessToken: [String],
  name: {
    type: String,
    trim: true,
    required: true
  },
  bio: {
    type: String,
    trim: true
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
  skills:{
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
  },
  friends:[{
      friend_id:{
         type:String
      },
      name:{
        type:String,
        trim:true,
        required:true
      },
      email:{
        type:String,
        trim:true,
        required:true
      }
      ,
      chats:[Object]
  }]
});

module.exports = mongoose.model("User", UserSchema);