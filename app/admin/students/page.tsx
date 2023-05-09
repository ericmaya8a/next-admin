import { getStudents } from "@/app/server/students";
import { Students } from "./Students";

export default async function StudentsPage() {
  const students = await getStudents();

  return (
    <>
      <h1 style={{ marginTop: 0 }}>Students</h1>
      <Students students={students} />
    </>
  );
}
