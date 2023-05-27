import { prisma } from "@/server/db/client";
import { Note } from "@prisma/client";
import { getStudentNameById } from "./students";
import { NextResponse } from "next/server";

export async function addNote({
  content,
  studentId,
}: Omit<Note, "id" | "createdAt" | "updatedAt">) {
  try {
    // Validate student exist
    const student = await getStudentNameById(studentId!);

    if (!student) {
      return new NextResponse(JSON.stringify({ error: "Invalid data" }), {
        status: 400,
      });
    }

    // Create the note
    await prisma.note.create({ data: { content, studentId } });

    return NextResponse.json({
      ok: true,
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        error: "Internal Server Errror",
      }),
      { status: 500 }
    );
  }
}
