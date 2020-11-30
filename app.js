const express = require("express");
const http = require("http");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const methodOverride = require('method-override');

const port = process.env.PORT||3000;
const app = express();

const server=http.createServer(app);
app.use(express.json());
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(methodOverride('_method'));


app.get("/",(req,res)=>{
    res.render("home");
});

server.listen(port,()=>{
    console.log("Sever started");
});