import { Router } from 'express';
import {
  signup_get,
  login_get,
  signup_post,
  login_post,
  logout_get,
} from '../controllers/authController.js';
const router = Router();

router.get('/api/signup', signup_get);
router.post('/api/signup', signup_post);
router.get('/api/login', login_get);
router.post('/api/login', login_post);
router.get('/api/logout', logout_get);

export default router;
