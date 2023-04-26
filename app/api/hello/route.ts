import { prisma } from "@/server/db/client";
import { NextResponse } from "next/server";
import { getSessionFromServer } from "@/app/server/utils";

export async function GET(request: Request) {
  const session = await getSessionFromServer();

  if (!session) {
    return new NextResponse(JSON.stringify({ error: "unauthorized" }), {
      status: 401,
    });
  }

  const posts = await prisma.post.findMany({
    select: { id: true, title: true, content: true },
  });

  return NextResponse.json({
    message: "Success",
    posts,
  });
}

export async function POST(request: Request) {
  try {
    const { title, content } = await request.json();
    const post = await prisma.post.create({
      data: {
        title,
        content,
      },
    });

    return NextResponse.json({
      message: "Post created",
      post,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
