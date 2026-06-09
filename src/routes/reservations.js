const { Router } = require('express');
const reservationController = require('../controllers/reservationController');
const authentidateToken = require('../middlewares/auth');

const router = Router();

router.post('/', authentidateToken, reservationController.createReservation);
router.get('/:id', authentidateToken, reservationController.getReservation);
router.put('/:id', authentidateToken, reservationController.updateReservation);
router.delete('/:id', authentidateToken, reservationController.deleteReservation);

module.exports = router;
