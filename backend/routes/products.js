const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const upload = require('../middleware/upload');
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

// Public route - get all products
router.get('/', getAllProducts);

// Public route - get single product
router.get('/:id', getProductById);

// Protected routes - require authentication
router.post('/', authenticateToken, upload.single('image'), createProduct);
router.put('/:id', authenticateToken, upload.single('image'), updateProduct);
router.delete('/:id', authenticateToken, deleteProduct);

module.exports = router;


