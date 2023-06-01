import { dateToString } from ".";

export function sortByUpdatedAt(list: any[], format = "DD MMM YYYY") {
  return list
    .sort((a, b) => a.updatedAt.getTime() - b.updatedAt.getTime())
    .reverse()
    .map((item) => ({
      ...item,
      updatedAt: dateToString(item.updatedAt, format),
    }));
}

export function sortByDate(items: any[], format = "DD MMM YYYY") {
  return items
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .map((item) => ({
      ...item,
      date: dateToString(item.date, format),
    }));
}
