const User = require("../models/user.model");
const ArtExb = require("../models/artExb.model");
const Applicant = require("../models/applicant.model");


exports.viewArtExb = (req, res) => {
  ArtExb.find({}, (err, exbList) => {
    res.render("fests/artExb", { exbList: exbList });
  });
};

exports.viewArtExbForm = (req, res) => {
  res.render("fests/addArtExb");
};

exports.addArtExb = (req, res, next) => {
  let newArtExb = new ArtExb({
    userId: req.user.id,
    name: req.body.name,
    organizer: req.body.organiser,
    location: req.body.location,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
  });

  newArtExb.save((err, newArt) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    User.findByIdAndUpdate(
      { _id: req.user.id },
      { $push: { artExbId: newArt._id } },
      (err) => {
        if (err) {
          console.log(err);
          return next(err);
        }
        console.log("New art exb added.");
        return res.redirect("/artExb");
      }
    );
  });
};

exports.viewDeletePage = async (req, res, next) => {
  const exb = await ArtExb.findById({ _id: req.params.id });
  if (exb) {
    return res.render("fests/deleteArtExb", { exb: exb });
  }
  console.log(err);
  return next(err);
};

exports.deleteArtExb = (req, res) => {
  ArtExb.findByIdAndDelete({ _id: req.params.id }, (err) => {
    if (err) {
      console.log("Error in deleting Art Exb");
      return next(err);
    }
    console.log("Art Exb deleted");
    return res.redirect("/profile");
  });
};

exports.viewApplicantForm = async (req, res, next) => {
  const exb = await ArtExb.findById({ _id: req.params.id });
  if (exb) {
    return res.render("fests/addApplicantAE", { exb: exb });
  }
  console.log(err);
  return next(err);
};

exports.addApplicantAE = (req, res, next) => {
  let newApplicant = new Applicant({
    userId: req.user.id,
    exbId: req.params.id,
    appName: req.body.appName,
    itemName: req.body.itemName,
    itemDesc: req.body.description,
  });

  newApplicant.save((err, newApp) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    User.findByIdAndUpdate(
      { _id: req.user.id },
      { $push: { exbItemId: newApp._id } },
      (err) => {
        if (err) {
          console.log(err);
          return next(err);
        }
        console.log("Applicant added to Art Exb.");
        return res.redirect("/artExb");
      }
    );
  });
};

exports.viewAEById = async (req, res, next) => {
  const fair = await ArtExb.findById({ _id: req.params.id });
  if (fair) {
    console.log(`Art exb view : ${fair.name}`);
    const items = await Applicant.find({ exbId: fair._id });
    if (items) {
      return res.render("fests/viewArtExb", { fair: fair, items: items });
    }
  }
  const err = new Error("Fair not found");
  console.log(err);
  return next(err);
};

exports.viewUpArtExb = (req, res, next) => {
  ArtExb.find({ startDate: { $gt: Date.now() } }, (fairs, err) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    console.log("Showing upcoming Art Exb");
    return res.render("fests/artExb", { fairs: fairs });
  });
};
