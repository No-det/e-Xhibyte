import express from 'express';

const router = express.Router();

import BookFairModel from '../models/bookfair.model';

//Show all live fairs
router.get('/' ,(req,res,next) => {
    BookFairModel.find({isLive : true} ,(fairs,err) => {
        if(err) {
            console.log(err);
            return next(err);
        }
        return res.render('bookFair' , {fairs:fairs});
    })
})

//Add a new fair
router.get('/add' , (req,res) => {
    res.render('fests/addBookFair');
})

router.post('/add' , (req,res,next) => {
    let bookFair = new BookFairModel({

    });

    bookFair.save(err => {
        if(err) {
            console.log(err);
            return next(err);
        }
        console.log('New fair added');
        return res.redirect('/bookFair');
    })
})

//Delete a new fair
router.delete('/delete/:id', (req,res) => {
    BookFairModel.findByIdAndDelete({_id : req.params.id} ,err=> {
        if(err) {
            console.log('Error in deleting Fair');
            return next(err);
        }
        console.log('Fair deleted');
        return res.redirect('/bookFair');
    })
})

//Add Applicants to book fair
router.post('/:id/addApplicant' ,(req,res,next) => {
    BookFairModel.findById({_id : req.params.id} , (bookFair , err ) => {
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
            console.log('applicant added to book fair');
            return res.redirect('/bookFair/:id');
        })
    })  
})

//View Book fairs by Id
router.get('/:id' , (req,res,next) => {
    BookFairModel.findById({_id : req.params.id}, (fairs , err) => {
        if(err) {
            console.log(err);
            return next(err);
        }
        console.log('Book fair found');
        return res.render('/bookFair',{fairs:fairs})
    })
})

//View upcoming fairs
router.get('/upcoming' ,(req,res,next) => {
    BookFairModel.find({startDate : {$gt : Date.now()}} , (fairs,err) => {
        if(err) {
            console.log(err);
            return next(err);
        }
        console.log('Showing upcoming fairs');
        return res.render('/bookFair' , {fairs: fairs});
    })
})

