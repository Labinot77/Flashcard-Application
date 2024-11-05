// File: /app/api/classes/addClass.js

import { db } from "@/db";
import { getCurrentSessionUser } from "@/lib/actions/User";
import { NextResponse } from "next/server";

export async function POST(req) {
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

    // Step 1: Create the class with the creator's ID
    const newClass = await db.classes.create({
      data: {
        title,
        description,
        creatorId: userId, // Set the creator of the class
      },
    });

    // Step 2: Prepare the data for ClassUser entries (join table) for all members and creator
    const classUsersData = [
      { classId: newClass.id, userId: userId }, // Creator
      ...members.map((member) => ({
        classId: newClass.id,
        userId: member,
      })),
    ];

    // Step 3: Insert all ClassUser entries in a single transaction
    await db.classUser.createMany({
      data: classUsersData,
    });

    return NextResponse.json(newClass);
  } catch (error) {
    console.error("Error in AddClass:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
