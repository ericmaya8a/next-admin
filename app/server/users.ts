import { prisma } from "@/server/db/client";
import { User } from "@prisma/client";
import { NextResponse } from "next/server";
import { CONSTANTS } from "../constatnts";
import { hashPassword } from "./utils";

export async function getUserByEmail(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });

  if (user) {
    return user;
  }

  return null;
}

export async function createUser({ email, name, password }: Omit<User, "id">) {
  const isValidData = [
    CONSTANTS.regex.email.test(email),
    CONSTANTS.regex.password.test(password),
    Boolean(email),
    Boolean(password),
    Boolean(name),
  ].every(Boolean);
  // Validate data
  if (!isValidData) {
    return new NextResponse(
      JSON.stringify({
        error: "Invalida data",
      }),
      { status: 400 }
    );
  }
  // Verify if user exists
  const user = await getUserByEmail(email);
  if (user) {
    return new NextResponse(
      JSON.stringify({
        error: "User already exist",
      }),
      { status: 400 }
    );
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password: await hashPassword(password),
    },
  });

  return NextResponse.json({
    ok: true,
    message: `User: ${email} was created successfully!`,
  });
}
