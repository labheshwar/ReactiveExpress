import express from 'express';

import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
} from '../controllers/user.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/user/login', authUser);
router.post('/user', registerUser);
router
  .route('/user/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
