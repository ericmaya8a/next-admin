"use client";

import { PageHeader } from "../components/commons/PageHeader";
import { NextPaymentsTable } from "./tables/NextPaymentsTable";

export type NextPaymentsT = {
  data: {
    id: string;
    name: string;
    inscriptionDate: string;
  }[];
};

export function Admin({ data }: NextPaymentsT) {
  return (
    <>
      <PageHeader title="Next Payments" />
      <NextPaymentsTable data={data} />
    </>
  );
}
