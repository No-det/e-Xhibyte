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
const path = require('path');
const fs = require('fs');
const uuid = require('uuid/v4');


const User = require('./models/user.model');

//Creating server
const server = express();

//Setting view engine
server.set("view engine","ejs");
server.use("/assets/css", express.static(__dirname + "/assets/css"));
server.use("/assets/img", express.static(__dirname + "/assets/img"));
server.use("/uploads", express.static(__dirname + "/uploads"));
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

const bookFairRoute = require('./routes/bookFair.route');
const artExbRoute = require('./routes/artExb.route');
const productExbRoute = require('./routes/productExb.route');


//Routing
server.use('/polisaanam', middleWares.hasAdminPrivs, adminRoute);
server.use('/profile', middleWares.isLoggedIn , userRoute);

server.use('/bookFair', middleWares.isLoggedIn, bookFairRoute);
server.use('/artExb', middleWares.isLoggedIn, artExbRoute);
server.use('/productExb', middleWares.isLoggedIn, productExbRoute);


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



                //Uploading profile Image
                //Path to save files
const upload = multer({dest : __dirname+'/uploads/'});

server.get('/upload' ,(req,res) => {
    res.render('profileImageUploader');
})

  
  server.post(
    "/upload", middleWares.isLoggedIn , 
    upload.single("file" /* name attribute of <file> element in your form */),
    (req, res) => {
      const tempPath = req.file.path;
      const imageName = uuid().toString()+'.png';
      const targetPath = path.join(__dirname, "./uploads/"+imageName);
  
      if (path.extname(req.file.originalname).toLowerCase() === ".png" || path.extname(req.file.originalname).toLowerCase() === ".jpeg") {
        fs.rename(tempPath, targetPath, err => {
          if (err) return handleError(err, res);
          User.findByIdAndUpdate({_id : req.user.id} , {imgUrl :  imageName} , err => {
              if(err) {
                  console.log(err);
                  return res.redirect('/profile');
              }
              console.log('Image added.');
              return res.redirect('/profile');
          })
        });
      } else {
        fs.unlink(tempPath, err => {
          if (err) return handleError(err, res);
  
          res
            .status(403)
            .contentType("text/plain")
            .end("Only .png and .jpeg files are allowed!");
        });
      }
    }
  );
            // Profile Image Uploading done

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Listening to PORT: ${PORT}`));
