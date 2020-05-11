const express = require('express');

const router = express.Router();

const bookFairController = require('../controllers/bookFair.controller');


router.get('/', bookFairController.viewBookFair); // View all live BF
//router.get('/:id', bookFairController.viewBFById); // View all BF by Id
//router.get('/upcoming', bookFairController.viewUpBookFairs); // View upcoming BF

router.get('/add', bookFairController.viewBookFairForm); // View BF add form
router.post('/add', bookFairController.addBookFair); // Add new BF

router.get('/addApplicant', bookFairController.viewApplicantForm); // View Applicant add form
router.post('/:id/addApplicant', bookFairController.addApplicantBF); // Add new applicant

//router.get('/delete', bookFairController.viewDeletePage); // view BF delete form
//router.post('/delete/:id', bookFairController.deleteBookFair); // delete BF


module.exports = router;
