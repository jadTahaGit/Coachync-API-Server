import { Router } from 'express';
import {
  getUsers,
  login_get,
  signup_post,
  login_post,
  logout_get,
  getServices,
} from '../controllers/authController.js';
const router = Router();

router.get('/api/signup', getUsers);
router.post('/api/signup', signup_post);
router.get('/api/login', login_get);
router.post('/api/login', login_post);
router.get('/api/logout', logout_get);
router.get('/api/servies', getServices);

export default router;
