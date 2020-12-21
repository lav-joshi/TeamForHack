const mongoose = require("mongoose");

mongoose.connect(
    process.env.mongoURI || require('../config/keys.js').mongoURI,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true },
    function(err){
        if(err) console.log(err);
        else console.log("MongoDB Connected");
    }
)