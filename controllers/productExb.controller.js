const User = require('../models/user.model');
const ProductExb = require('../models/productExb.model');

/*exports.viewProductExb = (req, res, next) => {
    ProductExb.find({isLive : true} ,(fairs,err) => {
        if(err) {
            console.log(err);
            return next(err);
        }
        return res.render('fests/productExb' , {fairs:fairs});
    })
}*/
exports.viewProductExb = (req, res) => {
    res.render('fests/productExb');
}

exports.viewProductExbForm = (req, res) => {
    res.render('fests/addProductExb');
}

exports.addProductExb = (req, res, next) => {
    let productExb = new ProductExb({

    });

    productExb.save(err => {
        if(err) {
            console.log(err);
            return next(err);
        }
        console.log('New product Exb added');
        return res.redirect('/productExb');
    })
}

exports.viewDeletePage = (req, res) => {
    res.render('fests/deleteProductExb')
}

exports.deleteProductExb = (req, res) => {
    ProductExb.findByIdAndDelete({_id : req.params.id} ,err=> {
        if(err) {
            console.log('Error in deleting Product Exb');
            return next(err);
        }
        console.log('Product Exb deleted');
        return res.redirect('/productExb');
    })
}

exports.viewApplicantForm = (req, res) => {
    res.render('fests/addApplicant');
}

exports.addApplicantPE = (req, res, next) => {
    ProductExb.findById({_id : req.params.id} , (productExb , err ) => {
        if(err) {
            console.log(err);
            return next(err);
        }
        let newApplicant = new applicant({

        })
        newApplicant.save(err => {
            if(err) {
                console.log(err);
                return next(err);
            }
            console.log('Applicant added to Product Exb');
            return res.redirect('/productExb/:id');
        })
    })  
}

exports.viewPEById = (req, res, next) => {
    ProductExb.findById({_id : req.params.id}, (fairs , err) => {
        if(err) {
            console.log(err);
            return next(err);
        }
        console.log('Product Exb found');
        return res.render('fests/productExb',{fairs:fairs})
    })
}

exports.viewUpProductExb = (req, res, next) => {
    ProductExb.find({startDate : {$gt : Date.now()}} , (fairs,err) => {
        if(err) {
            console.log(err);
            return next(err);
        }
        console.log('Showing upcoming Product Exb');
        return res.render('fests/productExb' , {fairs: fairs});
    })
}