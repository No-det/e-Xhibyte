const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const expressSession = require("express-session");
const authController  = require('./controllers/auth.controller');

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
server.use(flash());

//Setting up Passport 
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


authController(server);

server.get('/' , (req,res) => {
    res.render('index')
});

const PORT = process.env.PORT || 8001;

server.listen(PORT, () => console.log(`Listening to PORT: ${PORT}`));
