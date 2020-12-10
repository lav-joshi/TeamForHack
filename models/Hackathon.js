const mongoose = require("mongoose");
const HackSchema = new.mongoose.Schema({
    title:{
        type:String,
        trim:true,
        required:true
    },
    start_date:{
        type:Date,
        trim:true,
        required:true,
    },
    end_date:{
        type:Date,
        trim:true,
        required:true,
    },
    link:{
        type:String,
        trim:true,
        required:true,
    },
    participants:[{type:Schema.Types.ObjectId,ref:'User'}]
});

module.exports = mongoose.model("hack", HackSchema);
