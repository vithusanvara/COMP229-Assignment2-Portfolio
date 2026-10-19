import express from 'express';
import controller from '../controllers/contact.controller.js';
import { requireAuth } from '../middleware/auth.js';
const router = express.Router();
router.route('/api/contacts').post(controller.create);
router.route('/api/contacts').get(requireAuth, controller.list).delete(requireAuth, controller.removeAll);
router.param('contactId', (req, res, next, id) => requireAuth(req, res, err => err ? next(err) : Promise.resolve(controller.contactByID(req, res, next, id)).catch(next)));
router.route('/api/contacts/:contactId').get(controller.read).put(controller.update).delete(controller.remove);
export default router;
