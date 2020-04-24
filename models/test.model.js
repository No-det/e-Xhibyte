const mongoose = require('mongoose');

let testSchema  = mongoose.Schema ({
    img : {data : Buffer , contentType : String},
})

module.exports = mongoose.model('test' , testSchema);