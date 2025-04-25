// src/routes/enrollmentRoutes.ts
import express from 'express';
import * as controller from '../controllers/enrollmentController';

const router = express.Router();

router.post('/create', controller.enrollClient);
router.get('/', controller.getAllEnrollments);
router.get('/:id', controller.getEnrollmentById);
router.put('/:id', controller.updateEnrollment);
router.delete('/:id', controller.deleteEnrollment);

export default router;
