const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

let userSchema = mongoose.Schema({
  name: { type: String },
  tag: { type: String, default: "artist" },
  username: { type: String },
  phone: { type: Number },
  email: { type: String },
  password: { type: String },
  isAdmin: { type: Boolean, default: false },
  isActive: { type: Boolean, default: false },
  registeringToken: { type: Number },
  passwordResetToken: { type: String },
  resetPasswordExpires: { type: Date },
  imgUrl: { type: String, default: "defaultProPic.png" },
  bookExbId: [{ type: String }],
  artExbId: [{ type: String }],
  productExbId: [{ type: String }],
  exbItemId: [{ type: String }],
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);
