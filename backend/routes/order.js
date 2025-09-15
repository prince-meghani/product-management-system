const express = require('express');
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} = require('../controllers/ordercontroller');
const auth = require('../middlewares/auth');

router.post('/', auth, createOrder);
router.get('/mine', auth, getMyOrders);
router.get('/', auth, getAllOrders);
router.put('/:id/status', auth, updateOrderStatus);

module.exports = router;
