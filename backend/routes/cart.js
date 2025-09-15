const express = require('express');
const router = express.Router();
const { addToCart, getCart } = require('../controllers/cartcontroller');
const auth = require('../middlewares/auth');

router.post('/', auth, addToCart);
router.get('/', auth, getCart);

module.exports = router;
