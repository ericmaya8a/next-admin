import {
  Address,
  Communication,
  Gear,
  PaymentType,
  Promotion,
  Student,
  Uniform,
} from "@prisma/client";
import React, { useState } from "react";
import { StudentT } from "./page";

type StudentAddress = Omit<Address, "id" | "studentId">;
type StudentCommunication = Omit<Communication, "id" | "studentId">;

export type BackendResponse = Promise<{ ok: boolean }>;

export type CreateStudentT = Omit<Student, "id"> & StudentComplement;

export type StudentComplement = StudentAddress & StudentCommunication;

export type EditStudentT = Student & StudentComplement;

export type RowStudent = Student & {
  address: StudentAddress;
  communication: StudentCommunication;
  promotion?: StudentT[0]["promotion"];
};

export type PromotionT = Omit<Promotion, "id"> & {
  price: number;
  paymentType: PaymentType;
};

export type UniformT = Omit<Uniform, "id"> & { paymentType: PaymentType };

export type GearT = Omit<Gear, "id"> & { paymentType: PaymentType };

type StudentProviderProps = {
  children: React.ReactNode;
  createPromotion: (promotion: PromotionT) => BackendResponse;
  createStudent: (student: CreateStudentT) => BackendResponse;
  createUniform: (uniform: UniformT) => BackendResponse;
  createGear: (gear: GearT) => BackendResponse;
  editStudent: (student: Student & StudentComplement) => BackendResponse;
};

const StudentContext = React.createContext<
  | {
      currentStudent: RowStudent | undefined;
      isOpenStudentModal: boolean;
      isOpenPromotionModal: boolean;
      isOpenBuyUniformModal: boolean;
      isOpenBuyGearModal: boolean;
      setIsOpenPromotionModal: React.Dispatch<React.SetStateAction<boolean>>;
      setIsOpenStudentModal: React.Dispatch<React.SetStateAction<boolean>>;
      setIsOpenBuyUniformModal: React.Dispatch<React.SetStateAction<boolean>>;
      setIsOpenBuyGearModal: React.Dispatch<React.SetStateAction<boolean>>;
      setCurrentStudent: React.Dispatch<
        React.SetStateAction<RowStudent | undefined>
      >;
      createPromotion: (promotion: PromotionT) => BackendResponse;
      createStudent: (
        student: CreateStudentT & StudentComplement
      ) => BackendResponse;
      createUniform: (uniform: UniformT) => BackendResponse;
      createGear: (gear: GearT) => BackendResponse;
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
  createGear,
  editStudent,
}: StudentProviderProps) {
  const [currentStudent, setCurrentStudent] = useState<RowStudent>();
  const [isOpenStudentModal, setIsOpenStudentModal] = useState(false);
  const [isOpenPromotionModal, setIsOpenPromotionModal] = useState(false);
  const [isOpenBuyUniformModal, setIsOpenBuyUniformModal] = useState(false);
  const [isOpenBuyGearModal, setIsOpenBuyGearModal] = useState(false);

  const onClose = () => {
    setCurrentStudent(undefined);
    setIsOpenPromotionModal(false);
    setIsOpenStudentModal(false);
    setIsOpenBuyUniformModal(false);
    setIsOpenBuyGearModal(false);
  };

  const value = {
    currentStudent,
    isOpenStudentModal,
    isOpenPromotionModal,
    isOpenBuyUniformModal,
    isOpenBuyGearModal,
    createPromotion,
    createStudent,
    createUniform,
    createGear,
    editStudent,
    setCurrentStudent,
    setIsOpenPromotionModal,
    setIsOpenStudentModal,
    setIsOpenBuyUniformModal,
    setIsOpenBuyGearModal,
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
