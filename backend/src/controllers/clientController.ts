// src/controllers/clientController.ts
import { Request, Response } from 'express';
import * as clientService from '../services/clientService';

export const registerClient = async (req: Request, res: Response) => {
  try {
    const client = await clientService.registerClient(req.body);
    res.status(201).json(client);
  }catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred' });
    }
  }
  
};

export const getAllClients = async (_: Request, res: Response) => {
  const clients = await clientService.getAllClients();
  res.json(clients);
};

export const getClientById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const client = await clientService.getClientById(id);
  client ? res.json(client) : res.status(404).json({ error: 'Client not found' });
};

export const updateClient = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updated = await clientService.updateClient(id, req.body);
    res.json(updated);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred' });
    }
  }
  
};

export const deleteClient = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await clientService.deleteClient(id);
    res.json({ message: 'Client deleted' });
  }catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred' });
    }
  }
  
};
