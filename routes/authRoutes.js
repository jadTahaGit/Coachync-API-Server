import { Router } from 'express';
import {
  // getUsers,
  login_get,
  signup_post,
  login_post,
  logout_get,
  getServices,
  addService,
} from '../controllers/authController.js';
const router = Router();

// router.get('/api/users', getUsers);
router.post('/api/signup', signup_post);
router.get('/api/login', login_get);
router.post('/api/login', login_post);
router.get('/api/logout', logout_get);
router.get('/api/services', getServices);
router.get('/api/addservice', addService);

export default router;
