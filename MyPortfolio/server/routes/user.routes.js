import express from 'express';
import controller from '../controllers/user.controller.js';
import { requireAuth } from '../middleware/auth.js';
const router = express.Router();
router.route('/api/users').post(controller.create);
router.route('/api/users').get(requireAuth, controller.list).delete(requireAuth, controller.removeAll);
router.param('userId', (req, res, next, id) => requireAuth(req, res, err => err ? next(err) : Promise.resolve(controller.userByID(req, res, next, id)).catch(next)));
router.route('/api/users/:userId').get(controller.read).put(controller.update).delete(controller.remove);
export default router;
