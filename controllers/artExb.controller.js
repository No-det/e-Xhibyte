const User = require('../models/user.model');
const ArtExb = require('../models/artExb.model');

/*exports.viewArtExb = (req, res, next) => {
    ArtExb.find({isLive : true} ,(fairs,err) => {
        if(err) {
            console.log(err);
            return next(err);
        }
        return res.render('fests/artExb' , {fairs:fairs});
    })
}*/
exports.viewArtExb = (req, res) => {
    res.render('fests/artExb');
}

exports.viewArtExbForm = (req, res) => {
    res.render('fests/addArtExb');
}

exports.addArtExb = (req, res, next) => {
    let artExb = new ArtExb({

    });

    artExb.save(err => {
        if(err) {
            console.log(err);
            return next(err);
        }
        console.log('New Art Exb added');
        return res.redirect('/artExb');
    })
}

exports.viewDeletePage = (req, res) => {
    res.render('fests/deleteArtExb')
}

exports.deleteArtExb = (req, res) => {
    ArtExb.findByIdAndDelete({_id : req.params.id} ,err=> {
        if(err) {
            console.log('Error in deleting Art Exb');
            return next(err);
        }
        console.log('Art Exb deleted');
        return res.redirect('/artExb');
    })
}

exports.viewApplicantForm = (req, res) => {
    res.render('fests/addApplicant');
}

exports.addApplicantAE = (req, res, next) => {
    ArtExb.findById({_id : req.params.id} , (artExb , err ) => {
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
}

exports.viewAEById = (req, res, next) => {
    ArtExb.findById({_id : req.params.id}, (fairs , err) => {
        if(err) {
            console.log(err);
            return next(err);
        }
        console.log('Art Exb found');
        return res.render('fests/artExb',{fairs:fairs})
    })
}

exports.viewUpArtExb = (req, res, next) => {
    ArtExb.find({startDate : {$gt : Date.now()}} , (fairs,err) => {
        if(err) {
            console.log(err);
            return next(err);
        }
        console.log('Showing upcoming Art Exb');
        return res.render('fests/artExb' , {fairs: fairs});
    })
}