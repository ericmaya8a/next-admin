import { Address, Communication, Promotion, Student } from "@prisma/client";
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

type StudentProviderProps = {
  children: React.ReactNode;
  createPromotion: (promotion: PromotionT) => BackendResponse;
  createStudent: (student: CreateStudentT) => BackendResponse;
  editStudent: (student: Student & StudentComplement) => BackendResponse;
};

const StudentContext = React.createContext<
  | {
      currentStudent: RowStudent | undefined;
      isOpenStudentModal: boolean;
      isOpenPromotionModal: boolean;
      setIsOpenPromotionModal: React.Dispatch<React.SetStateAction<boolean>>;
      setIsOpenStudentModal: React.Dispatch<React.SetStateAction<boolean>>;
      setCurrentStudent: React.Dispatch<
        React.SetStateAction<RowStudent | undefined>
      >;
      createPromotion: (promotion: PromotionT) => BackendResponse;
      createStudent: (
        student: CreateStudentT & StudentComplement
      ) => BackendResponse;
      editStudent: (student: EditStudentT) => BackendResponse;
    }
  | undefined
>(undefined);

function StudentProvider({
  children,
  createStudent,
  editStudent,
  createPromotion,
}: StudentProviderProps) {
  const [currentStudent, setCurrentStudent] = useState<RowStudent>();
  const [isOpenStudentModal, setIsOpenStudentModal] = useState(false);
  const [isOpenPromotionModal, setIsOpenPromotionModal] = useState(false);

  const value = {
    currentStudent,
    isOpenStudentModal,
    isOpenPromotionModal,
    createPromotion,
    createStudent,
    editStudent,
    setCurrentStudent,
    setIsOpenPromotionModal,
    setIsOpenStudentModal,
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
