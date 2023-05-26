"use client";

import { AppBreadCrumb } from "../components/commons/AppBreadCrumb";
import { NextPaymentsT } from "./page";
import { AdminProvider, BackendResponse, TuitionT } from "./adminContext";
import { NextPayments } from "./NextPayments";

type AdminProps = {
  data: NextPaymentsT;
  createTuition: (tuition: TuitionT) => BackendResponse;
};

export function Admin(props: AdminProps) {
  return (
    <AdminProvider createTuition={props.createTuition}>
      <AppBreadCrumb model={[{ label: "Admin" }]} />
      <NextPayments data={props.data} />
    </AdminProvider>
  );
}
