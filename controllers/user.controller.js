const User = require("../models/user.model");
const ArtExb = require("../models/artExb.model");
const BookExb = require("../models/bookExb.model");
const ProductExb = require("../models/productExb.model");

exports.viewProfile = async (req, res) => {
  const user = await User.findById({ _id: req.user.id });
  if (user) {
    const artExb = await ArtExb.find({ _id: { $in: user.artExbId } });
    const bookExb = await BookExb.find({ _id: { $in: user.bookExbId } });
    const productExb = await ProductExb.find({
      _id: { $in: user.productExbId },
    });
    res.render("profile", {
      user: req.user,
      artExb: artExb,
      bookExb: bookExb,
      productExb: productExb,
    });
  }
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
