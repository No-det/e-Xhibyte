const express = require('express');

const router = express.Router();

const artExbController = require('../controllers/artExb.controller');


router.get('/', artExbController.viewArtExb); // View all live AE
//router.get('/:id', artExbController.viewAEById); // View all AE by Id
//router.get('/upcoming', artExbController.viewUpArtExb); // View upcoming AE

router.get('/add', artExbController.viewArtExbForm); // View AE add form
router.post('/add', artExbController.addArtExb); // Add new AE

router.get('/addApplicant', artExbController.viewApplicantForm); // View Applicant add form
router.post('/:id/addApplicant', artExbController.addApplicantAE); // Add new applicant

//router.get('/delete', artExbController.viewDeletePage); // view AE delete form
//router.post('/delete/:id', artExbController.deleteArtExb); // delete AE


module.exports = router;