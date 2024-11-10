"use server"

import { db } from "@/db"
import { getCurrentSessionUser } from "./User"
import { Classes } from "@prisma/client";

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

export const createClass = async (
  userId: string,
  members: string[], // Array of user ids
  title: string,
  description: string
) => {
  try {
    const currentUser = await getCurrentSessionUser();
    if (!currentUser?.id) {
      throw new Error("Unauthorized");
    }

    if (!title || members.length < 1) {
      throw new Error("Not enought members");
    }
    
    // Creating the class
    const newClass: Classes = await db.classes.create({
      data: {
        title,
        description,
        creatorId: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });


    // Create the class-user relationships in the database
    await db.classUser.createMany({
      // Adding the creator to the class
      data: [
        {
          classId: newClass.id,
          userId: userId
        },
        // Adding the other members to the class
        ...members.map((member: string) => ({
          classId: newClass.id,
          userId: member,
        }))],
    });

    return { classId: newClass.id, title: newClass.title };

  } catch (error: any) {
    console.error("Error creating class:", error.message);
    throw new Error(error.message || "Internal Server Error");
  }
};


export const getUserClasses = async (userId: string) => {
  try {
    const classes = await db.classUser.findMany({
      where: {
        id: userId,
      },
      include: {
        class: true,
      }
    });

    return classes;
  } catch (error: any) {
      console.log("Error in getUserClasses:", error);
  }
}
