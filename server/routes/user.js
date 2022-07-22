import express from 'express';

import { authUser, getUserProfile } from '../controllers/user.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/user/login', authUser);
router.route('/user/profile').get(protect, getUserProfile);

export default router;
