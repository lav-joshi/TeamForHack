//Importing npm packages
const express = require("express");
const http = require("http");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const methodOverride = require('method-override');
const passport = require("passport");
const keys = require("./config/keys");

//Importing MongoDB models
require("./db/mongoose");
const User = require("./models/User");
const webScraper = require("./db/webScraper");

//Importing Routes
const user = require("./routes/user");
const router = require("./routes/user");
const auth = require("./routes/auth");

//Variables
const port = process.env.PORT||3000;

const app = express();
const server=http.createServer(app);
app.use(express.json());
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.static("./assets"));

app.use(
    cookieSession({
      name: "session",
      keys: [keys.sessionSecret]
    })
  );

app.use(cookieParser());

//Passport Middleware

require("./middleware/PassportMiddleware");
app.use(passport.initialize());
app.use(passport.session());

app.use("/user",user);
app.use("/auth",auth);

app.get("/",(req,res)=>{
    webScraper();
    console.log(req.user);
    if(req.session.token == null){
      res.render("home",{
         currentUser:req.user
      });
    }else{
      User.findOne({email:req.user.email},(err,user)=>{
          if(err) Error(err);
          if(user){
            res.redirect("/user/dashboard");
          }
      });
    }
});



server.listen(port,()=>{
    console.log("Server started on "+ port + "!");
});