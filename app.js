//Importing npm packages
const express = require("express");
const http = require("http");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const methodOverride = require('method-override');
const passport = require("passport");
const keys = require("./config/keys");
const socketio = require("socket.io");
const formatMessage = require('./utils/messages');
//Importing MongoDB models
require("./db/mongoose");
const User = require("./models/User");
const webScraper = require("./db/webScraper");

//Importing Routes
const user = require("./routes/user");
const auth = require("./routes/auth");
const friend = require("./routes/friend");

//Variables
const port = process.env.PORT||3000;

const app = express();
const server=http.createServer(app);

const io = socketio(server);

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
app.use("/friend",friend);

app.get("/",(req,res)=>{
    webScraper();
    // console.log(req.user);
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



io.on('connection',(socket)=>{
  console.log("hi");
  
  console.log("New Web Socket Connection");
   
  socket.on('joinRoom',({room_id})=>{

    socket.join(room_id);
    console.log("Room Joined");
    // Welcome currentUser
    // socket.emit("message",formatMessage('Chat BOT',"Welcomr to ChatCord"));

    //Broadcast when a user connects
    // socket.broadcast.to().emit('message',formatMessage('Chat BOT',"User joined"));
  });
  
  // Listen for chat message
  socket.on('chatMessage',({msg,friend_id})=>{
    io.to(friend_id).emit('message',formatMessage('USER',msg));
  });

  socket.on('disconnect',()=>{
    io.emit('message',formatMessage('Chat BOT',"User Disconnected"))
  });


})


server.listen(port,()=>{
    console.log("Server started on "+ port + "!");
});