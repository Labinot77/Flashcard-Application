// File: /app/api/classes/addClass.js

import { db } from "@/db";
import { getCurrentSessionUser } from "@/lib/actions/User";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, members, title, description } = body;

    const currentUser = await getCurrentSessionUser();
    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (members.length < 2 || !title) {
      return new NextResponse("Invalid Data", { status: 400 });
    }

    const res = await db.classes.create({
      data: {
        title,
        description,
        users: {
          connect: [
            ...members.map((member) => ({ id: member })),
            { id: userId },
          ],
        },
      },
    });

    return NextResponse.json(res);
  } catch (error) {
    console.error("Error in AddClass:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
