import { PaymentType } from "@prisma/client";
import React, { useState } from "react";

type AdminProviderProps = {
  createTuition: (tuition: TuitionT) => BackendResponse;
  children: React.ReactNode;
};

export type SelectedStudentT = {
  id: string;
  name: string;
  inscriptionDate: string;
};

export type BackendResponse = Promise<{
  ok: boolean;
}>;

export type TuitionT = {
  amount: number;
  date: Date;
  paymentType: PaymentType;
  studentId: string;
};

export type NextPaymentsT = {
  id: string;
  name: string;
  inscriptionDate: string;
}[];

const AdminContext = React.createContext<
  | {
      isOpenPaymentModal: boolean;
      selectedStudent: SelectedStudentT | undefined;
      createTuition: (tuition: TuitionT) => BackendResponse;
      setIsOpenPaymentModal: React.Dispatch<React.SetStateAction<boolean>>;
      setSelectedStudent: React.Dispatch<
        React.SetStateAction<SelectedStudentT | undefined>
      >;
      onClose: VoidFunction;
    }
  | undefined
>(undefined);

function AdminProvider({ createTuition, children }: AdminProviderProps) {
  const [selectedStudent, setSelectedStudent] = useState<SelectedStudentT>();
  const [isOpenPaymentModal, setIsOpenPaymentModal] = useState(false);

  const onClose = () => {
    setSelectedStudent(undefined);
    setIsOpenPaymentModal(false);
  };

  const value = {
    isOpenPaymentModal,
    selectedStudent,
    createTuition,
    setIsOpenPaymentModal,
    setSelectedStudent,
    onClose,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
}

function useAdmin() {
  const context = React.useContext(AdminContext);

  if (context === undefined) {
    throw new Error("useAdmin must be within AdmonProvider");
  }

  return context;
}

export { AdminProvider, useAdmin };
