const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let bookFairSchema = new Schema({
    name : { type : String },
    organizer : { type : String },
    location : { type : String },
    startDate : { type : Date },
    endDate : { type : Date },
    isLive : { type : Boolean , default : true },
    applicant : [{type : mongoose.Schema.Types.ObjectId , ref: 'applicant'}],

});


module.exports = mongoose.model("bookFair",bookFairSchema);