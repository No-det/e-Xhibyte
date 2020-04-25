import express from 'express';

const router = express.Router();

import PaintingFairModel from '../models/paintingExhibition.model';

//Show all live fairs
router.get('/' ,(req,res,next) => {
    PaintingFairModel.find({isLive : true} ,(fairs,err) => {
        if(err) {
            console.log(err);
            return next(err);
        }
        return res.render('paintingFair' , {fairs:fairs});
    })
})

//Add a new fair
router.get('/add' , (req,res) => {
    res.render('fests/paintingFair');
})

router.post('/add' , (req,res,next) => {
    let paintingFair = new PaintingFairModel({

    });

    bookFair.save(err => {
        if(err) {
            console.log(err);
            return next(err);
        }
        console.log('New fair added');
        return res.redirect('/paintingFair');
    })
})

//Delete a new fair
router.delete('/delete/:id', (req,res) => {
    PaintingFairModel.findByIdAndDelete({_id : req.params.id} ,err=> {
        if(err) {
            console.log('Error in deleting Fair');
            return next(err);
        }
        console.log('Fair deleted');
        return res.redirect('/paintingFair');
    })
})

//Add Applicants to book fair
router.post('/:id/addApplicant' ,(req,res,next) => {
    PaintingFairModel.findById({_id : req.params.id} , (bookFair , err ) => {
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
            console.log('applicant added to painting fair');
            return res.redirect('/paintingFair/:id');
        })
    })  
})

//View Book fairs by Id
router.get('/:id' , (req,res,next) => {
    PaintingFairModel.findById({_id : req.params.id}, (fairs , err) => {
        if(err) {
            console.log(err);
            return next(err);
        }
        console.log('Painting fair found');
        return res.render('/paintingFair',{fairs:fairs})
    })
})

//View upcoming fairs
router.get('/upcoming' ,(req,res,next) => {
    PaintingFairModel.find({startDate : {$gt : Date.now()}} , (fairs,err) => {
        if(err) {
            console.log(err);
            return next(err);
        }
        console.log('Showing upcoming fairs');
        return res.render('/paintingFair' , {fairs: fairs});
    })
})

