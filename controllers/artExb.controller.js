const User = require("../models/user.model");
const ArtExb = require("../models/artExb.model");

/*exports.viewArtExb = (req, res, next) => {
    ArtExb.find({isLive : true} ,(fairs,err) => {
        if(err) {
            console.log(err);
            return next(err);
        }
        return res.render('fests/artExb' , {fairs:fairs});
    })
}*/
exports.viewArtExb = (req, res) => {
  ArtExb.find({}, (err, exbs) => {
    var exbList = [];
    var n = 0;
    exbs.forEach((exb) => {
      exbList[n] = exb;
      n++;
    });

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

  newArtExb.save((err) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    console.log("New art exb added");
    return res.redirect("/artExb");
  });
};

exports.viewDeletePage = (req, res) => {
  res.render("fests/deleteArtExb");
};

exports.deleteArtExb = (req, res) => {
  ArtExb.findByIdAndDelete({ _id: req.params.id }, (err) => {
    if (err) {
      console.log("Error in deleting Art Exb");
      return next(err);
    }
    console.log("Art Exb deleted");
    return res.redirect("/artExb");
  });
};

exports.viewApplicantForm = (req, res) => {
  res.render("fests/addApplicant");
};

exports.addApplicantAE = (req, res, next) => {
  ArtExb.findById({ _id: req.params.id }, (artExb, err) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    let newApplicant = new applicant({});
    newApplicant.save((err) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      console.log("Applicant added to Art Exb");
      return res.redirect("/artExb/:id");
    });
  });
};

exports.viewAEById = async (req, res, next) => {
  const fair = await ArtExb.findById({ _id: req.params.id });
  if (fair) {
    console.log(fair);
    return res.render("fests/artExbPage", { fair: fair });
  }
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
