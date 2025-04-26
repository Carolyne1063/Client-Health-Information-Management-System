import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const registerAdmin = async (data: any) => {
  const { email, password, name } = data;

  const hashedPassword = await bcrypt.hash(password, 10);

  return await prisma.admin.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  });
};

export const loginAdmin = async (email: string, password: string) => {
  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin) throw new Error('Invalid credentials');

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) throw new Error('Invalid credentials');

  return admin;
};

export const updateAdmin = async (id: string, data: any) => {
  const { name, email, password } = data;

  // If a password is provided, hash it
  let updatedData: any = { name, email };
  if (password) {
    updatedData.password = await bcrypt.hash(password, 10);
  }

  return await prisma.admin.update({
    where: { id },
    data: updatedData,
  });
};