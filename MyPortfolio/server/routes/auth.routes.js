import { Router } from 'express';
import { signin, signout } from '../controllers/auth.controller.js';
import { requireAuth } from '../middleware/auth.js';
const router = Router();
router.post('/api/auth/signin', signin);
router.post('/api/auth/signout', requireAuth, signout);
router.get('/api/auth/me', requireAuth, (req, res) => res.json(req.auth.user));
export default router;
