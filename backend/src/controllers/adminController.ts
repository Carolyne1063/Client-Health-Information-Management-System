import { Request, Response } from 'express';
import * as adminService from '../services/adminService';

export const registerAdmin = async (req: Request, res: Response) => {
  try {
    const admin = await adminService.registerAdmin(req.body);
    res.status(201).json(admin);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred' });
    }
  }
};

export const loginAdmin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const admin = await adminService.loginAdmin(email, password);
    res.json({ message: 'Login successful', admin });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred' });
    }
  }
};
