const mongoose = require('mongoose');

let applicantSchema = new mongoose.Schema({
    name: {type: String},
    workName: {type: String},
    workImgUrl: {type : String},
    desc: {type : String},
})

module.exports = mongoose.model('applicant' , applicantSchema);