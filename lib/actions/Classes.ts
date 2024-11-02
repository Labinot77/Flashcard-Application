"use server"

import { db } from "@/db"
import { getCurrentSessionUser } from "./User"
import { NextResponse } from "next/server";

export const AddClass = async (userId: string, members: string[], title: string, description: string) => {
  try {
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
            ...members.map((member) => ({
              id: member,
            })),
            {
              id: userId,
            },
          ],
        },
      },
    });

    return NextResponse.json(res); // Return response in JSON format for consistency
  } catch (error) {
    console.error("Error in AddClass:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
