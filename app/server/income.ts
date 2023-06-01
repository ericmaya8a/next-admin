import { prisma } from "@/server/db/client";
import { PaymentType } from "@prisma/client";

export type IncomeItem = {
  amount: number;
  date?: Date;
  description: string;
  paymentType: PaymentType;
};

export async function addIncome({
  amount,
  date = new Date(),
  description,
  paymentType,
}: IncomeItem) {
  await prisma.income.create({
    data: { date, amount, paymentType, description },
  });
}
