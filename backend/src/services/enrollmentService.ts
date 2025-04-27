import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const enrollClient = async (data: any) => {
  const { clientId, programId, startDate } = data;

  if (!startDate) {
    throw new Error("Start date is required.");
  }

  const formattedStartDate = new Date(`${startDate}T00:00:00`);
  
  if (isNaN(formattedStartDate.getTime())) {
    throw new Error("Invalid start date format.");
  }

  return await prisma.enrollment.create({
    data: {
      clientId,
      programId,
      startDate: formattedStartDate 
    }
  });
};

export const getAllEnrollments = async () => {
  return await prisma.enrollment.findMany({
    include: {
      client: true,
      program: true
    }
  });
};

export const getEnrollmentById = async (id: string) => {
  return await prisma.enrollment.findUnique({
    where: { id },
    include: {
      client: true,
      program: true
    }
  });
};

export const getEnrollmentsByClientId = async (clientId: string) => {
  return await prisma.enrollment.findMany({
    where: { clientId },
    include: {
      client: true,
      program: true
    }
  });
};


export const getEnrollmentsByProgramId = async (programId: string) => {
  return await prisma.enrollment.findMany({
    where: { programId },
    include: {
      client: true,
      program: true
    }
  });
};


export const updateEnrollment = async (id: string, data: any) => {
  const { clientId, programId, startDate } = data;

  if (!startDate) {
    throw new Error("Start date is required.");
  }

  const formattedStartDate = new Date(`${startDate}T00:00:00`);
  
  if (isNaN(formattedStartDate.getTime())) {
    throw new Error("Invalid start date format.");
  }

  return await prisma.enrollment.update({
    where: { id },
    data: {
      clientId,
      programId,
      startDate: formattedStartDate 
    }
  });
};

export const deleteEnrollment = async (id: string) => {
  return await prisma.enrollment.delete({ where: { id } });
};
