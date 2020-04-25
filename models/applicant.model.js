const mongoose = require('mongoose');

let applicantSchema = new mongoose.Schema({
    name: {type: String},
    college: {type: String},
    phone: {type : String},
    desc: {type : String},
})

module.exports = mongoose.model('applicant' , applicantSchema);