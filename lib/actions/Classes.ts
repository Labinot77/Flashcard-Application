"use server"

import { db } from "@/db"
import { getCurrentSessionUser } from "./User"
import { NextResponse } from "next/server";

export const getClassbyId = async (id: string) => {
  try {
    const classData = await db.classes.findUnique({
      where: {
        id: id,
      },
      include: {
        classUsers: {
          include: {
            user: true,
            class: true,
          }
        },
        creator: true,
      }, 
    })

    return classData
  } catch (error: any) {
    console.log("Error in getClassbyId:", error);
  }
}

// export const getClassbyId = async (id: string) => {
//   try {
//     const classData = await db.classUser.({
//       where: {
//         classId: id,
//       },
//       include: {
//         class: true,
//         user: true
//       },
//     })

//     return classData
//   } catch (error: any) {
//     console.log("Error in getClassbyId:", error);
//   }
// }
