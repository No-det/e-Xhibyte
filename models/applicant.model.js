const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let applicantSchema = new mongoose.Schema({
    userId : { type : String },
    exbId : { type : String },
    appName : { type : String },
    itemName : { type : String },
    itemDesc : { type : String },
    imgUrl : { type : String, default : "defaultItemPic.png" }
});


module.exports = mongoose.model("applicant",applicantSchema);