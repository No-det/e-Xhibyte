const User = require("../models/user.model");
const ProductExb = require("../models/productExb.model");
const Applicant = require("../models/applicant.model");

exports.viewProductExb = (req, res) => {
  ProductExb.find({}, (err, exbs) => {
    var exbList = [];
    var n = 0;
    exbs.forEach((exb) => {
      exbList[n] = exb;
      n++;
    });

    res.render("fests/productExb", { exbList: exbList });
  });
};

exports.viewProductExbForm = (req, res) => {
  res.render("fests/addProductExb");
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

  newProductExb.save((err) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    console.log("New product exb added");
    return res.redirect("/productExb");
  });
};

exports.viewDeletePage = (req, res) => {
  res.render("fests/deleteProductExb");
};

exports.deleteProductExb = (req, res) => {
  ProductExb.findByIdAndDelete({ _id: req.params.id }, (err) => {
    if (err) {
      console.log("Error in deleting Product Exb");
      return next(err);
    }
    console.log("Product Exb deleted");
    return res.redirect("/productExb");
  });
};

exports.viewApplicantForm = async (req, res, next) => {
  const exb = await ProductExb.findById({ _id: req.params.id });
  if (exb) {
    return res.render("fests/addApplicantPE", { exb : exb })
  }
  console.log(err)
  return next(err)
};

exports.addApplicantPE = (req, res, next) => {

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
      console.log("Applicant added to Product Exb");
      return res.redirect("/productExb");
    });

};

exports.viewPEById = async (req, res, next) => {
  const fair = await ProductExb.findById({ _id: req.params.id });
  if (fair) {
    console.log(`Product exb view : ${fair.name}`);
    return res.render("fests/productExbPage", { fair: fair });
  }
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
