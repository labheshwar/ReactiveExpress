import express from 'express';

import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
} from '../controllers/order.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/order/').post(protect, addOrderItems);
router.route('/order/:id').get(protect, getOrderById);
router.route('/order/:id/pay').put(protect, updateOrderToPaid);
router.route('/orders/myorders').get(protect, getMyOrders);

export default router;
