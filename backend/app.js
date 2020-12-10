const express = require("express");
const http = require("http");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const methodOverride = require('method-override');

const port = process.env.PORT||3001;
const app = express();

const server=http.createServer(app);
app.use(express.json());
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(methodOverride('_method'));


app.get("/dashboard",(req,res)=>{
    console.log("Dashboard view opened");
    const names = [ "Moin" , "Harshit" , "Lav" , "Ashutosh" , "Ayushi" ];
    res.json(names);
});


server.listen(port,()=>{
    console.log("Backend Server started on "+ port + "!");
});