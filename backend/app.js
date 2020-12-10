const express = require("express");
const http = require("http");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const methodOverride = require('method-override');
const user = require("./routes/user");
const router = require("./routes/user");
const port = process.env.PORT||3001;
const app = express();
const auth = require("./routes/auth");
const User = require("./models/User");
const server=http.createServer(app);
const passport = require("passport");
require("./db/mongoose");
app.use(express.json());
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(methodOverride('_method'));

app.use("/user",user);
app.use("/auth",auth);
app.get("/",(req,res)=>{
    console.log("hi");
});

require("./middleware/PassportMiddleware");

app.use(passport.initialize());

app.use(passport.session());

router.post("/details",()=>{
    
});

server.listen(port,()=>{
    console.log("Sever started on "+ port + "!");
});