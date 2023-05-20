import {
  Address,
  Communication,
  PaymentType,
  Promotion,
  Student,
  Uniform,
} from "@prisma/client";
import React, { useState } from "react";

type StudentAddress = Omit<Address, "id" | "studentId">;
type StudentCommunication = Omit<Communication, "id" | "studentId">;

export type BackendResponse = Promise<{ ok: boolean }>;

export type CreateStudentT = Omit<Student, "id"> & StudentComplement;

export type StudentComplement = StudentAddress & StudentCommunication;

export type EditStudentT = Student & StudentComplement;

export type RowStudent = Student & {
  address: StudentAddress;
  communication: StudentCommunication;
  promotion?: MappedStudent["promotion"];
};

export type MappedStudent = {
  id: Student["id"];
  active: Student["active"];
  firstName: Student["firstName"];
  lastName: Student["lastName"];
  name: string;
  birthDate: string;
  gender: Student["gender"];
  height: Student["height"];
  weight: Student["weight"];
  inscriptionDate: string;
  address: Address | null;
  communication: Communication | null;
  promotion: {
    id: Promotion["id"];
    rank: Promotion["rank"];
    studentId: Promotion["studentId"];
    date: string;
  }[];
};

export type PromotionT = Omit<Promotion, "id">;

export type UniformT = Omit<Uniform, "id"> & { paymentType: PaymentType };

type StudentProviderProps = {
  children: React.ReactNode;
  createPromotion: (promotion: PromotionT) => BackendResponse;
  createStudent: (student: CreateStudentT) => BackendResponse;
  createUniform: (uniform: UniformT) => BackendResponse;
  editStudent: (student: Student & StudentComplement) => BackendResponse;
};

const StudentContext = React.createContext<
  | {
      currentStudent: RowStudent | undefined;
      isOpenStudentModal: boolean;
      isOpenPromotionModal: boolean;
      isOpenBuyUniformModal: boolean;
      setIsOpenPromotionModal: React.Dispatch<React.SetStateAction<boolean>>;
      setIsOpenStudentModal: React.Dispatch<React.SetStateAction<boolean>>;
      setIsOpenBuyUniformModal: React.Dispatch<React.SetStateAction<boolean>>;
      setCurrentStudent: React.Dispatch<
        React.SetStateAction<RowStudent | undefined>
      >;
      createPromotion: (promotion: PromotionT) => BackendResponse;
      createStudent: (
        student: CreateStudentT & StudentComplement
      ) => BackendResponse;
      createUniform: (uniform: UniformT) => BackendResponse;
      editStudent: (student: EditStudentT) => BackendResponse;
      onClose: VoidFunction;
    }
  | undefined
>(undefined);

function StudentProvider({
  children,
  createStudent,
  createPromotion,
  createUniform,
  editStudent,
}: StudentProviderProps) {
  const [currentStudent, setCurrentStudent] = useState<RowStudent>();
  const [isOpenStudentModal, setIsOpenStudentModal] = useState(false);
  const [isOpenPromotionModal, setIsOpenPromotionModal] = useState(false);
  const [isOpenBuyUniformModal, setIsOpenBuyUniformModal] = useState(false);

  const onClose = () => {
    setCurrentStudent(undefined);
    setIsOpenPromotionModal(false);
    setIsOpenStudentModal(false);
    setIsOpenBuyUniformModal(false);
  };

  const value = {
    currentStudent,
    isOpenStudentModal,
    isOpenPromotionModal,
    isOpenBuyUniformModal,
    createPromotion,
    createStudent,
    createUniform,
    editStudent,
    setCurrentStudent,
    setIsOpenPromotionModal,
    setIsOpenStudentModal,
    setIsOpenBuyUniformModal,
    onClose,
  };

  return (
    <StudentContext.Provider value={value}>{children}</StudentContext.Provider>
  );
}

function useStudent() {
  const context = React.useContext(StudentContext);

  if (context === undefined) {
    throw new Error("useStudent must be within a StudentProvider");
  }

  return context;
}

export { StudentProvider, useStudent };
