import express from 'express';

import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/user.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/user/login', authUser);
router.post('/user', registerUser);

router
  .route('/user/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.route('/users').get(protect, isAdmin, getAllUsers);

router
  .route('/user/:id')
  .delete(protect, isAdmin, deleteUser)
  .get(protect, isAdmin, getUserById)
  .put(protect, isAdmin, updateUser);

export default router;
