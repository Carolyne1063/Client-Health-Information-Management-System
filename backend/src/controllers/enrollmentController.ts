import { Request, Response } from 'express';
import * as enrollmentService from '../services/enrollmentService';

export const enrollClient = async (req: Request, res: Response) => {
  try {
    const enrollment = await enrollmentService.enrollClient(req.body);
    res.status(201).json(enrollment);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllEnrollments = async (_: Request, res: Response) => {
  const enrollments = await enrollmentService.getAllEnrollments();
  res.json(enrollments);
};

export const getEnrollmentById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const enrollment = await enrollmentService.getEnrollmentById(id);
  enrollment
    ? res.json(enrollment)
    : res.status(404).json({ error: 'Enrollment not found' });
};

export const fetchEnrollmentsByClientId = async (req: Request, res: Response) => {
  try {
    const { clientId } = req.params;
    const enrollments = await enrollmentService.getEnrollmentsByClientId(clientId);
    res.status(200).json(enrollments);
  } catch (error) {
    console.error('Error fetching enrollments by clientId:', error);
    res.status(500).json({ message: 'Error fetching enrollments', error });
  }
};

export const fetchEnrollmentsByProgramId = async (req: Request, res: Response) => {
  const { programId } = req.params;

  try {
    const enrollments = await enrollmentService.getEnrollmentsByProgramId(programId);
    res.status(200).json(enrollments);
  } catch (error) {
    console.error('Error fetching enrollments by programId:', error);
    res.status(500).json({ message: 'Error fetching enrollments', error });
  }
};


export const updateEnrollment = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updated = await enrollmentService.updateEnrollment(id, req.body);
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteEnrollment = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await enrollmentService.deleteEnrollment(id);
    res.json({ message: 'Enrollment deleted' });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
