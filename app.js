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
const cookieParser = require('cookie-parser');
const multer = require('multer');


const Test = require('./models/test.model');
const User = require('./models/user.model');

//Creating server
const server = express();

//Setting view engine
server.set("view engine","ejs");
server.use("/assets/css", express.static(__dirname + "/assets/css"));
server.use("/assets/img", express.static(__dirname + "/assets/img"));
server.use("/assets/js", express.static(__dirname + "/assets/js"));

//connect to mongo db
mongoose.connect(
    "mongodb+srv://ajal:ajal123@e-xhibyte-3krkl.mongodb.net/test?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    }
  );

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


//Testing to upload image
//Path to save files
const upload = multer({dest : __dirname+'/uploads/profileImages'});

server.get('/upload' ,(req,res) => {
    res.render('testUpload');
    // Test.find(images => res.sendFile(images.toString('base64')));

})

server.post('/upload',upload.single('photo'),(req,res,next) => {
    console.log(req.file)
    // if(req.file) {
    //     let newTest = new Test;
    //     newTest.img.data = req.file;
    //     newTest.img.contentType = 'image/png'
    //     newTest.save(err => {
    //         if(err)
    //         console.log(err);

    //         console.log('Image saved');
    //     })
    // }
    // else {
    //     console.log('No file uploaded');
    //     return next(err);
    // }
})


const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Listening to PORT: ${PORT}`));
