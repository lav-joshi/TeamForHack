const mongoose = require("mongoose");
const keys = require('../config/keys.js');

mongoose.connect(
    keys.mongoURI,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true },
    function(err){
        if(err) console.log(err);
        else console.log("MongoDB Connected");
    }
)