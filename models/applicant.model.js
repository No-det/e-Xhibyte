const mongoose = require('mongoose');

let applicantSchema = new mongoose.Schema({
    userId : { type : String },
    exbId : { type : String },
    appName : { type : String },
    itemName : { type : String },
    itemDesc : { type : String },
    imgUrl : { type : String, default : "defaultItemPic.png" }
});