import { PrismaClient } from "@prisma/client";
import prisma from '../../prisma/index';

export const connectDb = async () => {
  try {
    const prisma = new PrismaClient();
    await prisma.$connect();
    return prisma;
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
