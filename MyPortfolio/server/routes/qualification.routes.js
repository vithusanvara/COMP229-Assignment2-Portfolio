import express from 'express';
import controller from '../controllers/qualification.controller.js';
import { requireAuth } from '../middleware/auth.js';
const router = express.Router();
router.route('/api/qualifications').post(requireAuth, controller.create);
router.route('/api/qualifications').get(requireAuth, controller.list).delete(requireAuth, controller.removeAll);
router.param('qualificationId', (req, res, next, id) => requireAuth(req, res, err => err ? next(err) : Promise.resolve(controller.qualificationByID(req, res, next, id)).catch(next)));
router.route('/api/qualifications/:qualificationId').get(controller.read).put(controller.update).delete(controller.remove);
export default router;
