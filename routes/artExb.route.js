const express = require('express');

const router = express.Router();

const artExbController = require('../controllers/artExb.controller');


router.get('/add', artExbController.viewArtExbForm); // View AE add form
router.post('/add', artExbController.addArtExb); // Add new AE

router.get('/', artExbController.viewArtExb); // View all live AE
router.get('/viewArtExb/:id', artExbController.viewAEById); // View all AE by Id
//router.get('/upcoming', artExbController.viewUpArtExb); // View upcoming AE

router.get('/addApplicant/:id', artExbController.viewApplicantForm); // View Applicant add form
router.post('/addApplicant/:id', artExbController.addApplicantAE); // Add new applicant

router.get('/delete/:id', artExbController.viewDeletePage); // view AE delete form
router.post('/delete/:id', artExbController.deleteArtExb); // delete AE


module.exports = router;