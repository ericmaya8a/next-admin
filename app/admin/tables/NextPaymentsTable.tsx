"use client";

import { useState } from "react";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { SiAmazonpay } from "react-icons/si";
import { useRole } from "../../hooks/useRole";
import { NextPaymentsT } from "../Admin";
import { InscriptionHeader } from "../students/tables/InscriptionHeader";
import { PaymentModal } from "../modals/PaymentModal";

export function NextPaymentsTable({ data }: NextPaymentsT) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] =
    useState<NextPaymentsT["data"][0]>();
  const { isAdmin, isSuperAdmin } = useRole();
  const hasActionsPermission = isAdmin || isSuperAdmin;

  const handleClose = () => {
    setIsOpen(false);
    setSelectedStudent(undefined);
  };

  const handlePayment = () => {
    console.log("handle payment");
    handleClose();
  };

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
                  setIsOpen(true);
                }}
              />
            )}
          />
        ) : null}
      </DataTable>
      {hasActionsPermission ? (
        <PaymentModal
          isOpen={isOpen}
          student={selectedStudent}
          onHide={handleClose}
          onPayment={handlePayment}
        />
      ) : null}
    </>
  );
}
