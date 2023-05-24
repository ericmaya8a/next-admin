"use client";

import {
  AdminProvider,
  BackendResponse,
  NextPaymentsT,
  TuitionT,
} from "./adminContext";
import { AppBreadCrumb } from "../components/commons/AppBreadCrumb";
import { NextPaymentsTable } from "./tables/NextPaymentsTable";

type AdminProps = {
  data: NextPaymentsT;
  createTuition: (tuition: TuitionT) => BackendResponse;
};

export function Admin(props: AdminProps) {
  return (
    <AdminProvider createTuition={props.createTuition}>
      <AppBreadCrumb model={[{ label: "Admin" }]} />
      <NextPaymentsTable data={props.data} />
    </AdminProvider>
  );
}
