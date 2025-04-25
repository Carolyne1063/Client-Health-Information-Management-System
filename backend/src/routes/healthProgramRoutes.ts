import express from 'express';
import * as controller from '../controllers/healthProgramController';

const router = express.Router();

router.post('/', controller.createProgram);
router.get('/', controller.getPrograms);
router.get('/:id', controller.getProgramById);

export default router;
