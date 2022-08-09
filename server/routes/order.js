import express from 'express';

import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
} from '../controllers/order.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/order/').post(protect, addOrderItems);
router.route('/order/:id').get(protect, getOrderById);
router.route('/order/:id/pay').post(protect, updateOrderToPaid);
router
  .route('/order/:id/deliver')
  .put(protect, isAdmin, updateOrderToDelivered);
router.route('/orders/myorders').get(protect, getMyOrders);
router.route('/orders').get(protect, isAdmin, getOrders);

export default router;
