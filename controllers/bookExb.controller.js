const User = require("../models/user.model");
const BookExb = require("../models/bookExb.model");
const Applicant = require("../models/applicant.model");

/*exports.viewBookExb = (req, res, next) => {
    BookExb.find({isLive : true}, (fairs, err) => {
        if(err) {
            console.log(err);
            return next(err);
        }
        return res.render('fests/bookExb' , {fairs:fairs});
    })
} */
exports.viewBookExb = (req, res) => {
  BookExb.find({}, (err, exbs) => {
    var exbList = [];
    var n = 0;
    exbs.forEach((exb) => {
      exbList[n] = exb;
      n++;
    });

    res.render("fests/bookExb", { exbList: exbList });
  });
};

exports.viewBookExbForm = (req, res) => {
  res.render("fests/addBookExb");
};

exports.addBookExb = (req, res, next) => {
  let newBookExb = new BookExb({
    userId: req.user.id,
    name: req.body.name,
    organizer: req.body.organiser,
    location: req.body.location,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
  });

  newBookExb.save((err) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    console.log("New book exb added");
    return res.redirect("/bookExb");
  });
};

exports.viewDeletePage = (req, res) => {
  res.render("fests/deleteBookExb");
};

exports.deleteBookExb = (req, res) => {
  BookExb.findByIdAndDelete({ _id: req.params.id }, (err) => {
    if (err) {
      console.log("Error in deleting Book Exb");
      return next(err);
    }
    console.log("Book Exb deleted");
    return res.redirect("/bookExb");
  });
};

exports.viewApplicantForm = async (req, res, next) => {
  const exb = await BookExb.findById({ _id: req.params.id });
  if (exb) {
    return res.render("fests/addApplicantBE", { exb : exb })
  }
  console.log(err)
  return next(err)
};

exports.addApplicantBE = (req, res, next) => {

  let newApplicant = new Applicant({
    userId: req.user.id,
    exbId: req.params.id,
    appName: req.body.appName,
    itemName: req.body.itemName,
    itemDesc: req.body.description
  });

  newApplicant.save((err) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    console.log("Applicant added to Book Exb");
    return res.redirect("/bookExb");
  });

};

exports.viewBEById = async (req, res, next) => {
  const fair = await BookExb.findById({ _id: req.params.id });
  if (fair) {
    console.log(`Book exb view : ${fair.name}`);
    return res.render("fests/bookExbPage", { fair: fair });
  }
  console.log(err);
  return next(err);
};

exports.viewUpBookExb = (req, res, next) => {
  BookExb.find({ startDate: { $gt: Date.now() } }, (fairs, err) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    console.log("Showing upcoming Book Exb");
    return res.render("fests/bookExb", { fairs: fairs });
  });
};
