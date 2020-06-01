const User = require("../models/user.model");

exports.viewProfile = (req, res) => {
  res.render("profile", { user: req.user });
};

exports.showEditProfile = (req, res) => {
  res.render("profileedit", { user: req.user });
};

exports.editProfile = (req, res, next) => {
  User.findByIdAndUpdate(
    { _id: req.user.id },
    {
      username: req.body.name,
      tag: req.body.tag,
      phone: req.body.phone,
      email: req.body.email,
    },
    (err) => {
      if (err) {
        console.log("error updating details");
        return next(err);
      }
      console.log("User details Updated");
      return res.redirect("/profile");
    }
  );
};

exports.showDeleteProfile = (req, res) => {
  res.render("deleteaccount", { user: req.user });
};
