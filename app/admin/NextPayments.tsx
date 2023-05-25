"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import styled from "styled-components";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { Toast, ToastMessage } from "primereact/toast";
import { SiAmazonpay } from "react-icons/si";
import { getInitialsFromFullName } from "@/app/clientUtils";
import { useRole } from "../hooks/useRole";
import { NextPaymentsT, useAdmin } from "./adminContext";
import { PaymentModal } from "./modals/PaymentModal";

type NextPaymentsProps = {
  data: NextPaymentsT;
};

export function NextPayments({ data }: NextPaymentsProps) {
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
      {data.length > 0 ? (
        data.map(({ id, name, inscriptionDate }, index) => (
          <React.Fragment key={id}>
            {index > 0 ? <Divider /> : null}
            <Wrapper>
              <StudentContainer style={{ display: "flex", gap: "1rem" }}>
                <Avatar
                  label={getInitialsFromFullName(name)}
                  size="large"
                  shape="circle"
                />
                <div>
                  <span className="name">{name}</span>
                  <span>{inscriptionDate}</span>
                </div>
              </StudentContainer>
              <Button
                icon={<SiAmazonpay size={24} />}
                rounded
                aria-label="Payment"
                onClick={() => {
                  setSelectedStudent({ id, name, inscriptionDate });
                  setIsOpenPaymentModal(true);
                }}
              />
            </Wrapper>
          </React.Fragment>
        ))
      ) : (
        <p>Everyone has paid 🤩</p>
      )}
      {hasActionsPermission ? <PaymentModal handleToast={showToast} /> : null}
      <Toast position="top-center" ref={toast} />
    </Card>
  );
}

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const StudentContainer = styled.div`
  display: flex;
  gap: 1rem;

  .p-avatar-text {
    font-size: 1.1rem;
  }

  span {
    display: block;

    &.name {
      font-size: 1.25rem;
      font-weight: 700;
    }
  }
`;
