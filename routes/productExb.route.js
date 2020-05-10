const express = require('express');

const router = express.Router();

const ProductExbModel = require('../models/productExb.model');


//Show all live product exb
router.get('/' ,(req,res,next) => {
    ProductExbModel.find({isLive : true} ,(fairs,err) => {
        if(err) {
            console.log(err);
            return next(err);
        }
        return res.render('fests/productExb' , {fairs:fairs});
    })
})

//Add a new product exb
router.get('/add' , (req,res) => {
    res.render('fests/addProductExb');
})

router.post('/add' , (req,res,next) => {
    let productExb = new ProductExbModel({

    });

    productExb.save(err => {
        if(err) {
            console.log(err);
            return next(err);
        }
        console.log('New product Exb added');
        return res.redirect('/productExb');
    })
})

//Delete an product exb
router.delete('/delete/:id', (req,res) => {
    ProductExbModel.findByIdAndDelete({_id : req.params.id} ,err=> {
        if(err) {
            console.log('Error in deleting Product Exb');
            return next(err);
        }
        console.log('Product Exb deleted');
        return res.redirect('/productExb');
    })
})

//Add Applicants to product exb
router.post('/:id/addApplicant' ,(req,res,next) => {
    ProductExbModel.findById({_id : req.params.id} , (productExb , err ) => {
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
})

//View Book product exb by Id
router.get('/:id' , (req,res,next) => {
    ProductExbModel.findById({_id : req.params.id}, (fairs , err) => {
        if(err) {
            console.log(err);
            return next(err);
        }
        console.log('Product Exb found');
        return res.render('fests/productExb',{fairs:fairs})
    })
})

//View upcoming product exb
router.get('/upcoming' ,(req,res,next) => {
    ProductExbModel.find({startDate : {$gt : Date.now()}} , (fairs,err) => {
        if(err) {
            console.log(err);
            return next(err);
        }
        console.log('Showing upcoming Product Exb');
        return res.render('fests/productExb' , {fairs: fairs});
    })
})

