const User = require('../models/user.model');
const BookFair = require('../models/bookFair.model');

/*exports.viewBookFair = (req, res, next) => {
    BookFair.find({isLive : true}, (fairs, err) => {
        if(err) {
            console.log(err);
            return next(err);
        }
        return res.render('fests/bookFair' , {fairs:fairs});
    })
} */
exports.viewBookFair = (req, res) => {
    User.find({}, function(err, users) {
        var userList = [];
        var n = 0;
        users.forEach(function(user) {
          userList[n] = user;
          n++;
        });
    
        res.render('fests/bookFair', {userList : userList});
      });
}

exports.viewBookFairForm = (req, res) => {
    res.render('fests/addBookFair');
}

exports.addBookFair = (req, res, next) => {
    let newBookFair = {
        name : req.body.name,
        organizer : req.body.organiser,
        location : req.body.location,
        startDate : req.body.startDate,
        endDate : req.body.endDate,
    }
    User.findByIdAndUpdate({_id : req.user.id}, {$push: {bookFair : newBookFair}}, err => {
       if(err) {
           console.log('Error in adding book fair.');
           return next(err);
       }
       console.log('New book fair added.');
       return res.redirect('/bookFair');
   });
}

exports.viewDeletePage = (req, res) => {
    res.render('fests/deleteBookFair')
}
exports.deleteBookFair = (req, res) => {
    BookFair.findByIdAndDelete({_id : req.params.id} ,err=> {
        if(err) {
            console.log('Error in deleting Book Fair');
            return next(err);
        }
        console.log('Book Fair deleted');
        return res.redirect('/bookFair');
    })
}

exports.viewApplicantForm = (req, res) => {
    res.render('fests/addApplicant');
}

exports.addApplicantBF = (req, res, next) => {
    BookFair.findById({_id : req.params.id} , (bookFair , err ) => {
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
            console.log('Applicant added to Book Fair');
            return res.redirect('/bookFair/:id');
        })
    })  
}

exports.viewBFById = (req, res, next) => {
    BookFair.findById({_id : req.params.id}, (fairs , err) => {
        if(err) {
            console.log(err);
            return next(err);
        }
        console.log('Book fair found');
        return res.render('fests/bookFair',{fairs:fairs})
    })
}

exports.viewUpBookFairs = (req, res, next) => {
    BookFair.find({startDate : {$gt : Date.now()}} , (fairs,err) => {
        if(err) {
            console.log(err);
            return next(err);
        }
        console.log('Showing upcoming Book Fairs');
        return res.render('fests/bookFair' , {fairs: fairs});
    })
}