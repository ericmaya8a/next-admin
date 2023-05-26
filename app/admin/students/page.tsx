import {
  addPromotion,
  addStudent,
  getStudents,
  updateStudent,
} from "@/app/server/students";
import { addUniform } from "@/app/server/uniform";
import { addGear } from "@/app/server/gear";
import {
  CreateStudentT,
  EditStudentT,
  GearT,
  PromotionT,
  UniformT,
} from "./student-context";
import { Students } from "./Students";

export type StudentT = Awaited<ReturnType<typeof getStudents>>;

async function createStudent(student: CreateStudentT) {
  "use server";
  const { ok } = await addStudent(student);
  return { ok };
}
async function editStudent(student: EditStudentT) {
  "use server";
  const { ok } = await updateStudent(student);
  return { ok };
}
async function createPromotion(promotion: PromotionT) {
  "use server";
  const { ok } = await addPromotion(promotion);
  return { ok };
}
async function createUniform(uniform: UniformT) {
  "use server";
  const { ok } = await addUniform(uniform);
  return { ok };
}
async function createGear(gear: GearT) {
  "use server";
  const { ok } = await addGear(gear);
  return { ok };
}

export default async function StudentsPage() {
  const students = await getStudents();

  return (
    <Students
      students={students}
      createPromotion={createPromotion}
      createStudent={createStudent}
      createUniform={createUniform}
      createGear={createGear}
      editStudent={editStudent}
    />
  );
}
