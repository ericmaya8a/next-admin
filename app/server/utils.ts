import { Promotion } from "@prisma/client";
import moment from "moment";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export async function getSessionFromServer() {
  return await getServerSession(authOptions);
}

export function dateToString(date: Date, format: string = "DD MMM YYYY") {
  return moment(date).format(format);
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
  return Number(moment(date).format("D"));
}

export function getAge(birthDate: Date) {
  const formattedDate = moment(birthDate);
  const today = moment();

  // Calculate the duration between the birth date and current date
  const duration = moment.duration(today.diff(formattedDate));
  const years = duration.years();
  const months = duration.months();
  const days = duration.days();

  // Construct the age string
  let ageString = "";
  if (years > 0) {
    ageString += years + (years === 1 ? " year" : " years");
  }
  if (months > 0) {
    if (ageString !== "") {
      ageString += " ";
    }
    ageString += months + (months === 1 ? " month" : " months");
  }
  if (days > 0) {
    if (ageString !== "") {
      ageString += " ";
    }
    ageString += days + (days === 1 ? " day" : " days");
  }

  return ageString;
}

export function mapPromotion(promotion: Promotion[]) {
  return promotion
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .map((prom) => ({
      ...prom,
      date: dateToString(prom.date),
    }));
}

export function sortByUpdatedAt(list: any[], format = "DD MMM YYYY") {
  return list
    .sort((a, b) => a.updatedAt.getTime() - b.updatedAt.getTime())
    .reverse()
    .map((item) => ({
      ...item,
      updatedAt: dateToString(item.updatedAt, format),
    }));
}

export function getFullName(firstName: string, lastName?: string) {
  if (!lastName) return firstName;
  return `${firstName} ${lastName}`;
}
