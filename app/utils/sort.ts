import { Promotion } from "@prisma/client";
import { dateToString } from ".";

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
