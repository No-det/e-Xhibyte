const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const bookFair = require('./bookfair.model');
const exhibition = require('./exhibition.model');

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
    bookFair: [{ type: mongoose.Schema.Types.ObjectId, ref: 'bookFair' }],
    exhibition : [{type : mongoose.Schema.Types.ObjectId , ref: 'exhibition'}],

});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User',userSchema);