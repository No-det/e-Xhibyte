const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let paintingExhibitionSchema = new Schema({
    name : { type : String },
    organizer : { type : String },
    location : { type : String },
    startDate : { type : Date },
    endDate : { type : Date },
    isLive : { type : Boolean }
});


module.exports = mongoose.model("paintingExhibition",paintingExhibitionSchema);