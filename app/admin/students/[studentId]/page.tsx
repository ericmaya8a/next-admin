import { getStudentInfo } from "@/app/server/students";
import { StudentInfo } from "./StudentInfo";

export type StudentInfo = Awaited<ReturnType<typeof getStudentInfo>>;

export default async function StudentPage({
  params,
}: {
  params: { studentId: string };
}) {
  const studentInfo = await getStudentInfo(params.studentId);
  return (
    <>
      {studentInfo ? (
        <StudentInfo data={studentInfo} />
      ) : (
        <p>Invalid Student ID: {params.studentId}</p>
      )}
    </>
  );
}
