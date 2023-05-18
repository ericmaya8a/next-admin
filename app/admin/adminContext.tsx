import React, { useState } from "react";

type AdminProviderProps = {
  children: React.ReactNode;
};

export type SelectedStudentT = {
  id: string;
  name: string;
  inscriptionDate: string;
};

const AdminContext = React.createContext<
  | {
      isOpenPaymentModal: boolean;
      selectedStudent: SelectedStudentT | undefined;
      setIsOpenPaymentModal: React.Dispatch<React.SetStateAction<boolean>>;
      setSelectedStudent: React.Dispatch<
        React.SetStateAction<SelectedStudentT | undefined>
      >;
      onClose: VoidFunction;
    }
  | undefined
>(undefined);

function AdminProvider({ children }: AdminProviderProps) {
  const [selectedStudent, setSelectedStudent] = useState<SelectedStudentT>();
  const [isOpenPaymentModal, setIsOpenPaymentModal] = useState(false);

  const onClose = () => {
    setSelectedStudent(undefined);
    setIsOpenPaymentModal(false);
  };

  const value = {
    isOpenPaymentModal,
    selectedStudent,
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
