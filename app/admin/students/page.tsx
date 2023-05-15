import { addStudent, getStudents, updateStudent } from "@/app/server/students";
import { Address, Communication, Student } from "@prisma/client";
import { Students } from "./Students";

export default async function StudentsPage() {
  const students = await getStudents();
  const createStudent = async (
    student: Omit<Student, "id" | "active"> &
      Omit<Address, "id" | "studentId"> &
      Omit<Communication, "id" | "studentId">
  ) => {
    "use server";
    const { ok } = await addStudent(student);
    return { ok };
  };
  const editStudent = async (
    student: Student &
      Omit<Address, "id" | "studentId"> &
      Omit<Communication, "id" | "studentId">
  ) => {
    "use server";
    const { ok } = await updateStudent(student);
    return { ok };
  };

  return (
    <Students
      students={students}
      createStudent={createStudent}
      editStudent={editStudent}
    />
  );
}
