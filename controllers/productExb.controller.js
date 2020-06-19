const User = require("../models/user.model");
const ProductExb = require("../models/productExb.model");
const Applicant = require("../models/applicant.model");

exports.viewProductExb = (req, res) => {
  ProductExb.find({}, (err, exbList) => {
    res.render("fests/productExb", { exbList: exbList });
  });
};

exports.viewProductExbForm = (req, res) => {
  res.render("fests/addProductExb", { error: "" });
};

exports.addProductExb = (req, res, next) => {
  let newProductExb = new ProductExb({
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
    !newProductExb.name ||
    !newProductExb.organizer ||
    !newProductExb.location ||
    !newProductExb.startDate ||
    !newProductExb.endDate
  ) {
    return res.render("fests/addProductExb", {
      error: "Fields cannot be left empty!",
    });
  } else if (newProductExb.startDate < date || newProductExb.endDate < date) {
    return res.render("fests/addProductExb", {
      error: "The Dates cannot be of Past!",
    });
  } else if (newProductExb.startDate > newProductExb.endDate) {
    return res.render("fests/addProductExb", {
      error: "Start Date cannot be after End Date!",
    });
  }

  newProductExb.save((err, newProduct) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    User.findByIdAndUpdate(
      { _id: req.user.id },
      { $push: { productExbId: newProduct._id } },
      (err) => {
        if (err) {
          console.log(err);
          return next(err);
        }
        console.log("New product exb added.");
        return res.redirect("/productExb");
      }
    );
  });
};

exports.viewDeletePage = async (req, res, next) => {
  const exb = await ProductExb.findById({ _id: req.params.id });
  if (exb) {
    return res.render("fests/deleteProductExb", { exb: exb });
  }
  console.log(err);
  return next(err);
};

exports.deleteProductExb = (req, res) => {
  ProductExb.findByIdAndDelete({ _id: req.params.id }, (err) => {
    if (err) {
      console.log("Error in deleting Product Exb");
      return next(err);
    }
    console.log("Product Exb deleted");
    User.update(
      { _id: req.user.id },
      { $pull: { productExbId: req.params.id } },
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
  const exb = await ProductExb.findById({ _id: req.params.id });
  if (exb) {
    return res.render("fests/addApplicantPE", { exb: exb });
  }
  console.log(err);
  return next(err);
};

exports.addApplicantPE = (req, res, next) => {
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
        console.log("Applicant added to Product Exb.");
        return res.redirect("/productExb");
      }
    );
  });
};

exports.viewPEById = async (req, res, next) => {
  const fair = await ProductExb.findById({ _id: req.params.id });
  if (fair) {
    console.log(`Product exb view : ${fair.name}`);
    const items = await Applicant.find({ exbId: fair._id });
    if (items) {
      return res.render("fests/viewProductExb", { fair: fair, items: items });
    }
  }
  const err = new Error("Fair not found");
  console.log(err);
  return next(err);
};

exports.viewUpProductExb = (req, res, next) => {
  ProductExb.find({ startDate: { $gt: Date.now() } }, (fairs, err) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    console.log("Showing upcoming Product Exb");
    return res.render("fests/productExb", { fairs: fairs });
  });
};
