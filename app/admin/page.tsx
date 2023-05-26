import { Suspense } from "react";
import { getStudentsNextPayment } from "../server/students";
import { addTuition } from "../server/tuition";
import { HeaderAndTableSkeleton } from "../components/commons/Skeletons/HeaderAndTableSkeleton";
import { TuitionT } from "./adminContext";
import { Admin } from "./Admin";

export type NextPaymentsT = Awaited<ReturnType<typeof getStudentsNextPayment>>;

async function createTuition(tuition: TuitionT) {
  "use server";
  const { ok } = await addTuition(tuition);
  return { ok };
}

export default async function AdminPage() {
  const nextPayments = await getStudentsNextPayment();

  return (
    <Suspense fallback={<HeaderAndTableSkeleton />}>
      <Admin data={nextPayments} createTuition={createTuition} />
    </Suspense>
  );
}
