const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin.controller')

router.get('/' , adminController.viewHome);
router.get('/admin', adminController.showAdminForm);
router.get('/active' , adminController.nonActiveForm);
router.post('/admin', adminController.makeAdmin);
router.post('/active' , adminController.removeNonActive);

module.exports = router;