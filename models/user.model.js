const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
// const BookExb = require('./bookExb.model');
// const ArtExb = require('./artExb.model');
// const ProductExb = require('./productExb.model');

let applicantsSchema =mongoose.Schema({
    name: {type: String},
    workName: {type: String},
    workImgUrl: {type : String},
    desc: {type : String},
})

let bookExbSchema = mongoose.Schema({
    name : { type : String },
    organizer : { type : String },
    location : { type : String },
    startDate : { type : Date },
    endDate : { type : Date },
    imgUrl : {type : String , default : 'defaultEventPic.png'},
    status : { type : String, default : 'Upcoming'},
    isLive : { type : Boolean , default : false },
    applicants : [applicantsSchema],
})

let artExbSchema = mongoose.Schema({
    name : { type : String },
    organizer : { type : String },
    location : { type : String },
    startDate : { type : Date },
    endDate : { type : Date },
    imgUrl : {type : String , default : 'defaultEventPic.png'},
    status : { type : String, default : 'Upcoming' },
    isLive : { type : Boolean, default : false },
    applicants : [applicantsSchema],
})

let productExbSchema = mongoose.Schema({
    name : { type : String },
    organizer : { type : String },
    location : { type : String },
    startDate : { type : Date },
    endDate : { type : Date },
    imgUrl : {type : String , default : 'defaultEventPic.png'},
    status : { type : String, default : 'Upcoming' },
    isLive : { type : Boolean, default : false },
    applicants : [applicantsSchema],
})

let userSchema = mongoose.Schema({
    name : { type : String },
    tag : { type : String , default : 'artist'},
    username : { type : String },
    phone : { type : Number },
    email : { type : String },
    password : { type : String },
    isAdmin : { type : Boolean , default : false },
    registeringToken : { type : Number },
    isActive : {type : Boolean , default : false },
    passwordResetToken : { type : String },
    resetPasswordExpires : { type : Date },
    imgUrl : {type : String , default : 'defaultProPic.png'},
    bookExb: [bookExbSchema],
    artExb : [artExbSchema],
    productExb : [productExbSchema],
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('applicants',applicantsSchema);
module.exports = mongoose.model('bookExb',bookExbSchema);
module.exports = mongoose.model('artExb',artExbSchema);
module.exports = mongoose.model('productExb',productExbSchema);
module.exports = mongoose.model('User',userSchema);