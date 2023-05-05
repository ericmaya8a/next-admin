import { DisplayData } from "../components/commons/DisplayData";
import { getStudents } from "../server/students";

export const metadata = {
  title: "Admin",
};

export default async function AdminPage() {
  const students = await getStudents();

  return (
    <>
      <h1>AdminPage</h1>
      {students.length > 0 ? (
        <DisplayData<typeof students> data={students} />
      ) : (
        <span>No students yet!</span>
      )}
    </>
  );
}
