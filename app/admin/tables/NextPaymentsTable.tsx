"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { Toast, ToastMessage } from "primereact/toast";
import { DataTable } from "primereact/datatable";
import { SiAmazonpay } from "react-icons/si";
import { useRole } from "../../hooks/useRole";
import { NextPaymentsT, useAdmin } from "../adminContext";
import { InscriptionHeader } from "../students/tables/InscriptionHeader";
import { PaymentModal } from "../modals/PaymentModal";

type NextPaymentsTableProps = {
  data: NextPaymentsT;
};

export function NextPaymentsTable({ data }: NextPaymentsTableProps) {
  const toast = useRef<Toast>(null);
  const router = useRouter();
  const { setIsOpenPaymentModal, setSelectedStudent } = useAdmin();
  const { isAdmin, isSuperAdmin } = useRole();
  const hasActionsPermission = isAdmin || isSuperAdmin;

  const refreshPage = () => router.refresh();

  const showToast = (message: ToastMessage | ToastMessage[]) => {
    toast.current?.show(message);
    refreshPage();
  };

  return (
    <Card title="Next Payments">
      <DataTable value={data} stripedRows>
        <Column field="name" header="Name" />
        <Column field="inscriptionDate" header={<InscriptionHeader />} />
        {hasActionsPermission ? (
          <Column
            field="id"
            body={(val: (typeof data)[0]) => (
              <Button
                icon={<SiAmazonpay size={24} />}
                rounded
                aria-label="Payment"
                onClick={() => {
                  setSelectedStudent(val);
                  setIsOpenPaymentModal(true);
                }}
              />
            )}
          />
        ) : null}
      </DataTable>
      {hasActionsPermission ? <PaymentModal handleToast={showToast} /> : null}
      <Toast position="top-center" ref={toast} />
    </Card>
  );
}
