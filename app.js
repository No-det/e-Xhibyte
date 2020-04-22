const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
const bodyParser = require("body-parser");
const flash = require("req-flash");
const expressSession = require("express-session");
const authController  = require('./controllers/auth.controller');
const middleWares = require('./middlewares/middlewares');
var cookieParser = require('cookie-parser');

const User = require('./models/user.model');

//Creating server
const server = express();

//Setting view engine
server.set("view engine","ejs");
server.use("/assets/css", express.static(__dirname + "/assets/css"));
server.use("/assets/img", express.static(__dirname + "/assets/img"));
server.use("/assets/js", express.static(__dirname + "/assets/js"));

//Connecting to the database
mongoose.connect("mongodb://localhost/e-Xhibyte");

//Using resources
server.use(expressSession({
    secret: "Polisaanam",
    resave: false,
    saveUninitialized: false
}));

server.use(bodyParser.urlencoded({extended : false}));
server.use(bodyParser.json());
server.use(passport.initialize());
server.use(passport.session());
server.use(cookieParser());
server.use(flash());

//Setting up Passport 
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//Route Path
const adminRoute = require('./routes/admin.route');
const userRoute = require("./routes/user.route");

//Routing
server.use('/polisaanam', middleWares.hasAdminPrivs, adminRoute);
server.use('/profile', middleWares.isLoggedIn , userRoute);

authController(server);


//Static pages

server.get('/' , (req,res) => {
    if(req.user)
    return res.render('home');

    return res.render('index')
})

server.get('/home' , middleWares.isLoggedIn , (req,res) => {
    res.render('home',{user:req.user})
})

server.get('/exhibitions', (req,res) => {
    res.render('exhibition');
})

server.get('/bookfair',middleWares.isLoggedIn , (req,res) => {
    res.render('bookfair');
})





const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Listening to PORT: ${PORT}`));
