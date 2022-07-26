import express from 'express';

import { addOrderItems, getOrderById } from '../controllers/order.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/order/').post(protect, addOrderItems);
router.route('/order/:id').get(protect, getOrderById);

export default router;
