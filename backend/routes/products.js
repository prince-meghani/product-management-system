const express = require('express');
const router = express.Router();

// Destructure only the exported controller functions you need:
const { getAllProducts, addProduct, updateProduct ,deleteProduct} = require('../controllers/productController');
const auth = require('../middlewares/auth');

router.get('/', getAllProducts);
router.post('/', auth, addProduct);
router.put('/:id', auth, updateProduct);  
router.delete('/:id', auth, deleteProduct);  
module.exports = router;
