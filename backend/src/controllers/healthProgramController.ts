// controllers/healthProgramController.ts

import { Request, Response } from 'express';
import * as service from '../services/healthProgramService';

export const createProgram = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description } = req.body;
    const program = await service.createHealthProgram(name, description);
    res.status(201).json(program);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create program', error });
  }
};

export const getPrograms = async (_req: Request, res: Response): Promise<void> => {
  try {
    const programs = await service.getAllHealthPrograms();
    res.status(200).json(programs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch programs', error });
  }
};

export const getProgramById = async (req: Request, res: Response): Promise<void> => {
  try {
    const program = await service.getHealthProgramById(req.params.id);
    if (!program) {
      res.status(404).json({ message: 'Program not found' });
    } else {
      res.status(200).json(program);
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch program', error });
  }
};
