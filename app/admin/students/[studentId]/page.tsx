import { addNote } from "@/app/server/note";
import { getStudentInfo } from "@/app/server/students";
import { StudentInfoProvider } from "./studentInfoContext";
import { StudentInfo } from "./StudentInfo";

export type StudentInfoT = Awaited<ReturnType<typeof getStudentInfo>>;

export type CreateNoteT = typeof createNote;

async function createNote(note: { studentId: string; content: string }) {
  "use server";
  const { ok } = await addNote(note);
  return { ok };
}

export default async function StudentPage({
  params,
}: {
  params: { studentId: string };
}) {
  const studentInfo = await getStudentInfo(params.studentId);

  return (
    <StudentInfoProvider studentInfo={studentInfo} createNote={createNote}>
      <StudentInfo />
    </StudentInfoProvider>
  );
}
