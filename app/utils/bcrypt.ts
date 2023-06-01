import bcrypt from "bcryptjs";
import { CONSTANTS } from "../constatnts";

export async function comparePassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, CONSTANTS.bcrypt.SALT);
}
