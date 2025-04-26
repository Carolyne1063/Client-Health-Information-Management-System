// src/routes/clientRoutes.ts
import express from 'express';
import * as controller from '../controllers/clientController';

const router = express.Router();

router.post('/register', controller.registerClient);
router.get('/', controller.getAllClients);
router.get('/:id', controller.getClientById);
router.put('/:id', controller.updateClient);
router.delete('/:id', controller.deleteClient);

export default router;
