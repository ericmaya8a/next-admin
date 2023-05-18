"use client";

import { AdminProvider } from "./adminContext";
import { NextPaymentsTable } from "./tables/NextPaymentsTable";
import { PageHeader } from "../components/commons/PageHeader";

export type NextPaymentsT = {
  data: {
    id: string;
    name: string;
    inscriptionDate: string;
  }[];
};

export function Admin({ data }: NextPaymentsT) {
  return (
    <AdminProvider>
      <PageHeader title="Next Payments" />
      <NextPaymentsTable data={data} />
    </AdminProvider>
  );
}
