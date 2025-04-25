// src/services/clientService.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const registerClient = async (data: any) => {
  return await prisma.client.create({ data });
};

export const getAllClients = async () => {
  return await prisma.client.findMany();
};

export const getClientById = async (id: string) => {
  return await prisma.client.findUnique({ where: { id } });
};

export const updateClient = async (id: string, data: any) => {
  return await prisma.client.update({
    where: { id },
    data
  });
};

export const deleteClient = async (id: string) => {
  return await prisma.client.delete({ where: { id } });
};
