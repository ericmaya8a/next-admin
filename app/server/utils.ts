import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { CONSTANTS } from "../constatnts";

export async function comparePassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, CONSTANTS.bcrypt.SALT);
}

export async function getSessionFromServer() {
  return await getServerSession(authOptions);
}

export function dateToString(date: Date) {
  return date.toLocaleDateString(CONSTANTS.date.region, {
    dateStyle: "medium",
  });
}
