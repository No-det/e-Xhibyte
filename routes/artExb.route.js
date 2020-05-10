const express = require('express');

const router = express.Router();

const ArtExbModel = require('../models/artExb.model');


//Show all live art exb
router.get('/' ,(req,res,next) => {
    ArtExbModel.find({isLive : true} ,(fairs,err) => {
        if(err) {
            console.log(err);
            return next(err);
        }
        return res.render('fests/artExb' , {fairs:fairs});
    })
})

//Add a new art exb
router.get('/add' , (req,res) => {
    res.render('fests/addArtExb');
})

router.post('/add' , (req,res,next) => {
    let artExb = new ArtExbModel({

    });

    artExb.save(err => {
        if(err) {
            console.log(err);
            return next(err);
        }
        console.log('New Art Exb added');
        return res.redirect('/artExb');
    })
})

//Delete an art exb
router.delete('/delete/:id', (req,res) => {
    ArtExbModel.findByIdAndDelete({_id : req.params.id} ,err=> {
        if(err) {
            console.log('Error in deleting Art Exb');
            return next(err);
        }
        console.log('Art Exb deleted');
        return res.redirect('/artExb');
    })
})

//Add Applicants to art exb
router.post('/:id/addApplicant' ,(req,res,next) => {
    ArtExbModel.findById({_id : req.params.id} , (artExb , err ) => {
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
            console.log('Applicant added to Art Exb');
            return res.redirect('/artExb/:id');
        })
    })  
})

//View art exb by Id
router.get('/:id' , (req,res,next) => {
    ArtExbModel.findById({_id : req.params.id}, (fairs , err) => {
        if(err) {
            console.log(err);
            return next(err);
        }
        console.log('Art Exb found');
        return res.render('fests/artExb',{fairs:fairs})
    })
})

//View upcoming art exb
router.get('/upcoming' ,(req,res,next) => {
    ArtExbModel.find({startDate : {$gt : Date.now()}} , (fairs,err) => {
        if(err) {
            console.log(err);
            return next(err);
        }
        console.log('Showing upcoming Art Exb');
        return res.render('fests/artExb' , {fairs: fairs});
    })
})

