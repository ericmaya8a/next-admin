import { prisma } from "@/server/db/client";

export async function getUserByEmail(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });

  if (user) {
    return user;
  }

  return null;
}
