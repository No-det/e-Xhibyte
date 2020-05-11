const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const BookFair = require('./bookFair.model');
const ArtExb = require('./artExb.model');
const ProductExb = require('./productExb.model');

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
    bookFair: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BookFair' }],
    artExb : [{type : mongoose.Schema.Types.ObjectId , ref: 'artExb'}],
    productExb : [{type : mongoose.Schema.Types.ObjectId , ref: 'productExb'}],

});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User',userSchema);