import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createHealthProgram = async (name: string, description: string) => {
  return await prisma.healthProgram.create({
    data: {
      name,
      description,
    },
  });
};

export const getAllHealthPrograms = async () => {
  return await prisma.healthProgram.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const getHealthProgramById = async (id: string) => {
  return await prisma.healthProgram.findUnique({
    where: { id },
  });
};
