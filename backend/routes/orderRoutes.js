import express from 'express';
const router = express.Router();
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToConfirmed,
  updateOrderToProcessed,
  updateOrderToShipped,
  updateOrderToDelivered,
  getOrders,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.route('/mine').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/confirm').put(protect, admin, updateOrderToConfirmed);
router.route('/:id/process').put(protect, admin, updateOrderToProcessed);
router.route('/:id/ship').put(protect, admin, updateOrderToShipped);
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

export default router;
