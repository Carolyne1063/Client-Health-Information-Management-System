import express from 'express';
import * as controller from '../controllers/adminController';

const router = express.Router();

router.post('/register', controller.registerAdmin);
router.post('/login', controller.loginAdmin);

export default router;
