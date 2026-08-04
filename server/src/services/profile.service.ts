import prisma from "../config/prisma";

export const getProfile = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },

    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
      role: true,
      isVerified: true,
      createdAt: true,

      _count: {
        select: {
          translations: true,
          speeches: true,
          ocrHistory: true,
          documents: true,
          explanations: true,
          grammar: true,
          tones: true,
          messages: true,
        },
      },
    },
  });

  return user;
};

export const updateProfile = async (
  userId: string,
  data: {
    name?: string;
    avatar?: string;
  }
) => {
  return prisma.user.update({
    where: {
      id: userId,
    },

    data: {
      name: data.name,
      avatar: data.avatar,
    },

    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
      role: true,
      isVerified: true,
      createdAt: true,
    },
  });
};