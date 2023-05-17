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

type StudentProviderProps = {
  children: React.ReactNode;
  createStudent: (student: CreateStudentT) => BackendResponse;
  editStudent: (student: Student & StudentComplement) => BackendResponse;
};

const StudentContext = React.createContext<
  | {
      currentStudent: RowStudent | undefined;
      setCurrentStudent: React.Dispatch<
        React.SetStateAction<RowStudent | undefined>
      >;
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
}: StudentProviderProps) {
  const [currentStudent, setCurrentStudent] = useState<RowStudent>();
  const value = {
    currentStudent,
    setCurrentStudent,
    createStudent,
    editStudent,
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
