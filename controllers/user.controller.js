const User = require('../models/user.model');

exports.viewProfile = (req,res)  => {
    res.render('profile',{user:req.user});
}

exports.showEditProfile = (req,res) => {
    res.render('profileedit', {user:req.user});
}

exports.showEditPassword = (req,res) => {
    res.render('passedit',{user:req.user});
}