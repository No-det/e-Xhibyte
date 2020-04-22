const User = require('../models/user.model');

exports.viewHome = (req,res) => {
    res.render('admin/admin');
};

exports.showAdminForm = (req,res) => {
    res.render('admin/adminForm');
}

exports.nonActiveForm = (req,res) => {
    res.render('admin/nonActive');
}

exports.makeAdmin = (req,res, next) => {
    User.findOneAndUpdate({username : req.body.username} , {isAdmin : true} , err => {
        if(err) {
            console.log('Error in adding as admin');
            next(err);
        }
        console.log(`${req.body.username} has succesfully got admin privilages.`);
    })
}

exports.removeNonActive = (req,res , next) => {
    User.deleteMany({isActive : false} , err => {
        if(err) {
            console.log('Error in deleting non active users');
            next(err);
        }
        console.log('Non active users deleted');
    })
}