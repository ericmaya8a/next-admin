import bcrypt from "bcryptjs";
import moment from "moment";
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

export function dateToString(date: Date, format: string = "DD MMM YYYY") {
  return moment(date).utc().format(format);
}

export function getDateInNumbers(date: Date) {
  const momentDate = moment(date);
  return {
    day: Number(momentDate.format("D")),
    month: Number(momentDate.format("M")),
    year: Number(momentDate.format("YYYY")),
  };
}

export function getDayNumber(date: Date): number {
  return Number(moment(date).utc().format("D"));
}
