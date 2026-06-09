const { Router } = require('express');
const { createTimeBlock, listReservations } = require('../controllers/adminController');

const authentidateToken = require('../middlewares/auth');
const router = Router();

router.post('/time-blocks', authentidateToken, createTimeBlock);
router.get('/reservations', authentidateToken, listReservations);

module.exports = router;