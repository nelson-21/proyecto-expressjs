const { Router } = require('express');
const appoinmentController = require('../controllers/appoinmentController');
const authenticateToken = require('../middlewares/auth');
const router = Router();

router.get('/:id/appoinments', appoinmentController.getUserAppoinments);

module.exports = router

