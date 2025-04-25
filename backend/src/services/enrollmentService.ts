import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const enrollClient = async (data: any) => {
  const { clientId, programId, startDate } = data;

  // Ensure the startDate is provided and formatted as 'YYYY-MM-DD'
  if (!startDate) {
    throw new Error("Start date is required.");
  }

  // Parse and validate the startDate
  const formattedStartDate = new Date(`${startDate}T00:00:00`);
  
  // If the parsed startDate is invalid, throw an error
  if (isNaN(formattedStartDate.getTime())) {
    throw new Error("Invalid start date format.");
  }

  return await prisma.enrollment.create({
    data: {
      clientId,
      programId,
      startDate: formattedStartDate // Store as DateTime
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

export const updateEnrollment = async (id: string, data: any) => {
  const { clientId, programId, startDate } = data;

  // Ensure the startDate is provided and formatted as 'YYYY-MM-DD'
  if (!startDate) {
    throw new Error("Start date is required.");
  }

  // Parse and validate the startDate
  const formattedStartDate = new Date(`${startDate}T00:00:00`);
  
  // If the parsed startDate is invalid, throw an error
  if (isNaN(formattedStartDate.getTime())) {
    throw new Error("Invalid start date format.");
  }

  // Perform the update operation
  return await prisma.enrollment.update({
    where: { id },
    data: {
      clientId,
      programId,
      startDate: formattedStartDate // Store as DateTime
    }
  });
};

export const deleteEnrollment = async (id: string) => {
  return await prisma.enrollment.delete({ where: { id } });
};
