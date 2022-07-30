import express from 'express';

import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
} from '../controllers/product.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/products', getProducts);
router.get('/product/:id', getProductById);
router.post('/product', protect, isAdmin, createProduct);
router
  .route('/product/:id')
  .delete(protect, isAdmin, deleteProduct)
  .put(protect, isAdmin, updateProduct);

export default router;
