const express = require('express');

const router = express.Router();

const productExbController = require('../controllers/productExb.controller');


router.get('/', productExbController.viewProductExb); // View all live PE
router.get('/productExbPage', productExbController.viewPEById); // View all PE by Id
//router.get('/upcoming', productExbController.viewUpProductExb); // View upcoming PE

router.get('/add', productExbController.viewProductExbForm); // View PE add form
router.post('/add', productExbController.addProductExb); // Add new PE

router.get('/addApplicant', productExbController.viewApplicantForm); // View Applicant add form
router.post('/:id/addApplicant', productExbController.addApplicantPE); // Add new applicant

//router.get('/delete', productExbController.viewDeletePage); // view PE delete form
//router.post('/delete/:id', productExbController.deleteProductExb); // delete PE


module.exports = router;