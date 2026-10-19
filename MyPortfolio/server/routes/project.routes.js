import express from 'express';
import controller from '../controllers/project.controller.js';
import { requireAuth } from '../middleware/auth.js';
const router = express.Router();
router.route('/api/projects').post(requireAuth, controller.create);
router.route('/api/projects').get(requireAuth, controller.list).delete(requireAuth, controller.removeAll);
router.param('projectId', (req, res, next, id) => requireAuth(req, res, err => err ? next(err) : Promise.resolve(controller.projectByID(req, res, next, id)).catch(next)));
router.route('/api/projects/:projectId').get(controller.read).put(controller.update).delete(controller.remove);
export default router;
