"use client";

import React, { useState } from "react";
import { CreateNoteT, StudentInfoT } from "./page";
import { useRouter } from "next/navigation";

type StudentInfoContextT = {
  isFormOpen: boolean;
  studentInfo: StudentInfoT;
  createNote: CreateNoteT;
  onClose: VoidFunction;
  refreshPage: VoidFunction;
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type StudentInfoProviderProps = {
  children: React.ReactNode;
  studentInfo: StudentInfoT;
  createNote: CreateNoteT;
};

const StudentInfoContext = React.createContext<StudentInfoContextT | undefined>(
  undefined
);

function StudentInfoProvider({
  children,
  studentInfo,
  createNote,
}: StudentInfoProviderProps) {
  const router = useRouter();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const onClose = () => {
    setIsFormOpen(false);
  };

  const refreshPage = () => router.refresh();

  const value = {
    isFormOpen,
    studentInfo,
    createNote,
    onClose,
    refreshPage,
    setIsFormOpen,
  };

  return (
    <StudentInfoContext.Provider value={value}>
      {children}
    </StudentInfoContext.Provider>
  );
}

function useStudentInfo() {
  const context = React.useContext(StudentInfoContext);

  if (context === undefined) {
    throw new Error("useStudentInfo must be within a StudentInfoProvider");
  }

  return context;
}

export { StudentInfoProvider, useStudentInfo };
