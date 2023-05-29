import { Note } from "@prisma/client";
import { addNote, removeNote, updateNote } from "@/app/server/note";
import { getStudentInfo } from "@/app/server/students";
import { StudentInfoProvider } from "./studentInfoContext";
import { StudentInfo } from "./StudentInfo";

export type StudentInfoT = Awaited<ReturnType<typeof getStudentInfo>>;

export type CreateNoteT = typeof createNote;

export type UpdateStudentNoteT = typeof updateStudentNote;

export type DeleteNoteT = typeof deleteNote;

async function createNote(note: { studentId: string; content: string }) {
  "use server";
  const { ok } = await addNote(note);
  return { ok };
}

async function updateStudentNote(note: Omit<Note, "createdAt" | "updatedAt">) {
  "use server";
  const { ok } = await updateNote(note);
  return { ok };
}

async function deleteNote(id: string) {
  "use server";
  const { ok } = await removeNote(id);
  return { ok };
}

export default async function StudentPage({
  params,
}: {
  params: { studentId: string };
}) {
  const studentInfo = await getStudentInfo(params.studentId);

  return (
    <StudentInfoProvider
      studentInfo={studentInfo}
      createNote={createNote}
      deleteNote={deleteNote}
      updateStudentNote={updateStudentNote}
    >
      <StudentInfo />
    </StudentInfoProvider>
  );
}
