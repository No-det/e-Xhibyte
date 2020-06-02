const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let bookExbSchema = new Schema({
    userId : { type : String },
    name : { type : String },
    organizer : { type : String },
    location : { type : String },
    startDate : { type : Date },
    endDate : { type : Date },
    imgUrl : { type : String, default : 'defaultExbPic.png' },
    status : { type : String, default : 'Upcoming'},
    isLive : { type : Boolean, default : false },
    applicantId : [{ type : String }],
});


module.exports = mongoose.model("bookExb",bookExbSchema);