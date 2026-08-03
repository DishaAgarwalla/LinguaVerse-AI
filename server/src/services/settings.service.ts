import prisma from "../config/prisma";

export const getUserSettings = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      language: true,
      theme: true,
      emailNotifications: true,
      pushNotifications: true,
      twoFactorEnabled: true,
      profileVisibility: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const updateUserSettings = async (
  userId: string,
  data: {
    language: string;
    theme: string;
    emailNotifications: boolean;
    pushNotifications: boolean;
    profileVisibility: string;
  }
) => {
  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      language: data.language,
      theme: data.theme,
      emailNotifications: data.emailNotifications,
      pushNotifications: data.pushNotifications,
      profileVisibility: data.profileVisibility,
    },
    select: {
      id: true,
      language: true,
      theme: true,
      emailNotifications: true,
      pushNotifications: true,
      twoFactorEnabled: true,
      profileVisibility: true,
    },
  });

  return user;
};