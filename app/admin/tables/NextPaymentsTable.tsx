"use client";

import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { SiAmazonpay } from "react-icons/si";
import { useRole } from "../../hooks/useRole";
import { useAdmin } from "../adminContext";
import { NextPaymentsT } from "../Admin";
import { InscriptionHeader } from "../students/tables/InscriptionHeader";
import { PaymentModal } from "../modals/PaymentModal";

export function NextPaymentsTable({ data }: NextPaymentsT) {
  const { setIsOpenPaymentModal, setSelectedStudent } = useAdmin();
  const { isAdmin, isSuperAdmin } = useRole();
  const hasActionsPermission = isAdmin || isSuperAdmin;

  return (
    <>
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
      {hasActionsPermission ? <PaymentModal /> : null}
    </>
  );
}
