const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

let bookFairSchema = new Schema({
    name : { type : String },
    organizer : { type : String },
    location : { type : String },
    startDate : { type : Date },
    endDate : { type : Date },
    status : { type : String }
});

module.exports = mongoose.model("bookFair",bookFairSchema);