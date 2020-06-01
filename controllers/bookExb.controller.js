const { User, BookExb } = require("../models/user.model");
// const BookExb = require("../models/bookExb.model");

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
  User.find({}, function (err, users) {
    var userList = [];
    var n = 0;
    users.forEach(function (user) {
      userList[n] = user;
      n++;
    });

    res.render("fests/bookExb", { userList: userList });
  });
};

exports.viewBookExbForm = (req, res) => {
  res.render("fests/addBookExb");
};

exports.addBookExb = (req, res, next) => {
  let newBookExb = {
    name: req.body.name,
    organizer: req.body.organiser,
    location: req.body.location,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
  };
  User.findByIdAndUpdate(
    { _id: req.user.id },
    { $push: { bookExb: newBookExb } },
    (err) => {
      if (err) {
        console.log("Error in adding book exb.");
        return next(err);
      }
      console.log("New book exb added.");
      return res.redirect("/bookExb");
    }
  );
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

exports.viewApplicantForm = (req, res) => {
  res.render("fests/addApplicant");
};

/*exports.addApplicantBE = (req, res, next) => {
    let newApplicant = {
        name: req.body.applicant,
        workName: req.body.work,
        desc: req.body.description
    }
    User.bookExb.findByIdAndUpdate({_id : req.fairs.id}, {$push : {applicant : newApplicant}}, err => {
        if(err) {
            console.log('Error in adding new applicant');
            return next(err);
        }
        console.log('New Applicant to Book Exb added. ');
        return res.redirect('/bookExb');
    });
}*/
exports.addApplicantBE = (req, res, next) => {
  BookExb.findById({ _id: req.params.id }, (bookExb, err) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    let newApplicant = new applicant({
      name: req.body.applicant,
      workName: req.body.work,
      desc: req.body.description,
    });
    newApplicant.save((err) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      console.log("Applicant added to Book Exb");
      return res.redirect("/bookExb/:id");
    });
  });
};

/*exports.viewBEById = (req, res, next) => {
    BookExb.findById({_id : req.params.id}, (fairs , err) => {
        if(err) {
            console.log(err);
            return next(err);
        }
        console.log('Book exb found');
        return res.render('fests/bookExbPage',{fairs:fairs})
    })
}*/
exports.viewBEById = async (req, res, next) => {
  const fairs = await BookExb.findById({ _id: req.params.id });
  console.log(fairs);
  res.render("fests/bookExbPage", { fairs, fairs });
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