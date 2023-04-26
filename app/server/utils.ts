import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

const SALT = 10;

export async function comparePassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, SALT);
}

export async function getSessionFromServer() {
  return await getServerSession(authOptions);
}
