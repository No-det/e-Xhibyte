const User = require("../models/user.model");
const BookExb = require("../models/bookExb.model");
const Applicant = require("../models/applicant.model");

exports.viewBookExb = (req, res) => {
  let date = new Date();
  date.setDate(date.getDate() - 1);
  BookExb.find({}, (err, exbList) => {
    exbList.map(exb => {
      if ( exb.startDate > date ) {
        BookExb.findByIdAndUpdate({ _id: exb.id },
          { $push: { status: 'upcoming' } },
          (err) => {
            if (err) {
              console.log(err);
              return next(err);
            }
            console.log("book exb updated.");
          }
        );
      }
      if ( exb.startDate <= date ) {
        BookExb.findByIdAndUpdate({ _id: exb.id },
          { $push: { status: 'live' } },
          (err) => {
            if (err) {
              console.log(err);
              return next(err);
            }
            console.log("book exb updated.");
          }
        );
      }
      if ( exb.endDate < date ) {
        BookExb.findByIdAndUpdate({ _id: exb.id },
          { $push: { status: 'past' } },
          (err) => {
            if (err) {
              console.log(err);
              return next(err);
            }
            console.log("book exb updated.");
          }
        );
      }
    });
    res.render("fests/bookExb", { exbList: exbList });
  });
};

exports.viewBookExbForm = (req, res) => {
  res.render("fests/addBookExb", { error: "" });
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
  let date = new Date();
  date.setDate(date.getDate() - 1);
  if (
    !newBookExb.name ||
    !newBookExb.organizer ||
    !newBookExb.location ||
    !newBookExb.startDate ||
    !newBookExb.endDate
  ) {
    return res.render("fests/addBookExb", {
      error: "Fields cannot be left empty!",
    });
  } else if (newBookExb.startDate < date || newBookExb.endDate < date) {
    return res.render("fests/addBookExb", {
      error: "The Dates cannot be of Past!",
    });
  } else if (newBookExb.startDate > newBookExb.endDate) {
    return res.render("fests/addBookExb", {
      error: "Start Date cannot be after End Date!",
    });
  }

  newBookExb.save((err, newBook) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    User.findByIdAndUpdate(
      { _id: req.user.id },
      { $push: { bookExbId: newBook._id } },
      (err) => {
        if (err) {
          console.log(err);
          return next(err);
        }
        console.log("New book exb added.");
        return res.redirect("/bookExb");
      }
    );
  });
};

exports.viewDeletePage = async (req, res, next) => {
  const exb = await BookExb.findById({ _id: req.params.id });
  if (exb) {
    return res.render("fests/deleteBookExb", { exb: exb });
  }
  console.log(err);
  return next(err);
};

exports.deleteBookExb = (req, res) => {
  BookExb.findByIdAndDelete({ _id: req.params.id }, (err) => {
    if (err) {
      console.log("Error in deleting Book Exb");
      return next(err);
    }
    console.log("Book Exb deleted");
    User.update(
      { _id: req.user.id },
      { $pull: { bookExbId: req.params.id } },
      (err) => {
        if (err) {
          console.log(err);
          return next(err);
        }
        return res.redirect("/profile");
      }
    );
  });
};

exports.viewApplicantForm = async (req, res, next) => {
  const exb = await BookExb.findById({ _id: req.params.id });
  if (exb) {
    return res.render("fests/addApplicantBE", { exb: exb });
  }
  console.log(err);
  return next(err);
};

exports.addApplicantBE = (req, res, next) => {
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
        console.log("Applicant added to Book Exb.");
        return res.redirect("/bookExb");
      }
    );
  });
};

exports.viewBEById = async (req, res, next) => {
  const fair = await BookExb.findById({ _id: req.params.id });
  if (fair) {
    console.log(`Book exb view : ${fair.name}`);
    const items = await Applicant.find({ exbId: fair._id });
    if (items) {
      return res.render("fests/viewBookExb", { fair: fair, items: items });
    }
  }
  const err = new Error("Fair not found");
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
