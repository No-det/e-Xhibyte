const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let exhibitionSchema = new Schema({
    name : { type : String },
    organizer : { type : String },
    location : { type : String },
    startDate : { type : Date },
    endDate : { type : Date },
    status : { type : String}
});


module.exports = mongoose.model("exhibition",exhibitionSchema);