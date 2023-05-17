import {
  addPromotion,
  addStudent,
  getStudents,
  updateStudent,
} from "@/app/server/students";
import {
  CreateStudentT,
  EditStudentT,
  MappedStudent,
  PromotionT,
} from "./student-context";
import { Students } from "./Students";

export default async function StudentsPage() {
  const students = await getStudents();
  const createStudent = async (student: CreateStudentT) => {
    "use server";
    const { ok } = await addStudent(student);
    return { ok };
  };
  const editStudent = async (student: EditStudentT) => {
    "use server";
    const { ok } = await updateStudent(student);
    return { ok };
  };
  const createPromotion = async (promotion: PromotionT) => {
    "use server";
    const { ok } = await addPromotion(promotion);
    return { ok };
  };

  return (
    <Students<MappedStudent[]>
      students={students}
      createPromotion={createPromotion}
      createStudent={createStudent}
      editStudent={editStudent}
    />
  );
}
