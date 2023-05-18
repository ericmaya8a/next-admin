"use client";

import {
  AdminProvider,
  BackendResponse,
  NextPaymentsT,
  TuitionT,
} from "./adminContext";
import { NextPaymentsTable } from "./tables/NextPaymentsTable";
import { PageHeader } from "../components/commons/PageHeader";

type AdminProps = {
  data: NextPaymentsT;
  createTuition: (tuition: TuitionT) => BackendResponse;
};

export function Admin(props: AdminProps) {
  return (
    <AdminProvider createTuition={props.createTuition}>
      <PageHeader title="Next Payments" />
      <NextPaymentsTable data={props.data} />
    </AdminProvider>
  );
}
