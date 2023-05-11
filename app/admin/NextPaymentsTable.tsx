"use client";

import { useState } from "react";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { SiAmazonpay } from "react-icons/si";
import { useRole } from "../hooks/useRole";
import { InscriptionHeader } from "./students/InscriptionHeader";
import { NextPaymentsT } from "./Admin";

export function NextPaymentsTable({ data }: NextPaymentsT) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<(typeof data)[0]>();
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
            header="Actions"
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
        <Dialog
          header="Payment"
          visible={isOpen}
          onHide={handleClose}
          breakpoints={{ "960px": "75vw", "641px": "100vw" }}
          footer={<Button label="Pay" onClick={handlePayment} />}
        >
          <p>{`Select payment method for: ${selectedStudent?.name}`}</p>
        </Dialog>
      ) : null}
    </>
  );
}
