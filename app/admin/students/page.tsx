import { getStudents } from "@/app/server/students";
import { DisplayData } from "@/app/components/commons/DisplayData";

export const metadata = {
  title: "Students",
};

export default async function StudentsPage() {
  const students = await getStudents();

  return (
    <>
      <h1>Students</h1>
      {students.length > 0 ? (
        <DisplayData<typeof students> data={students} />
      ) : (
        <span>No students yet!</span>
      )}
    </>
  );
}
