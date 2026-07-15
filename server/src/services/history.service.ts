import prisma from "../config/prisma";

export const getHistory = async (userId: string) => {
  return prisma.translation.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const deleteHistory = async (
  id: string,
  userId: string
) => {
  return prisma.translation.deleteMany({
    where: {
      id,
      userId,
    },
  });
};

export const clearHistory = async (
  userId: string
) => {
  return prisma.translation.deleteMany({
    where: {
      userId,
    },
  });
};