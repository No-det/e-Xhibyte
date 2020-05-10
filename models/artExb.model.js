const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let artExbSchema = new Schema({
    name : { type : String },
    organizer : { type : String },
    location : { type : String },
    startDate : { type : Date },
    endDate : { type : Date },
    imgUrl : {type : String , default : 'defaultEventPic.png'},
    status : { type : String, default : 'Upcoming' },
    isLive : { type : Boolean, default : false },
    applicant : [{type : mongoose.Schema.Types.ObjectId , ref: 'applicant'}],
});


module.exports = mongoose.model("artExb", artExbSchema);