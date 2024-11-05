"use server"

import { auth } from "@/auth"
import { db } from "@/db"
import { NextResponse } from "next/server"
import { UserValidation } from "../validations/user"
import { z } from "zod"

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email: email,
      },
    })

    if (!user) {
      return null
    }

    return user
  } catch (error: any) {
    throw new NextResponse("getUserByEmail", error)
  }
}

export const getCurrentSessionUser = async () => {
  const session = await auth()

  if (!session?.user?.id) {
    return null
  }

  try {
    const currentSession = await db.user.findUnique({
      where: {
        id: session.user.id
      },
    })

    return currentSession
  } catch (error: any) {
    throw new NextResponse("getCurrentSessionUser", error)
  }
}

export const getCurrentSessionUserData = async () => {
  const session = await auth()

  if (!session?.user?.id) {
    return null
  }

  try {
    const currentSession = await db.user.findUnique({
      where: {
        id: session.user.id
      },
      include: {
        classUsers: {
          include: {
            class: {
              include: {
                classUsers: {
                  include: {
                    user: true,
                    class: true,
                  }
                }
              }
            },
            user: true
          }
        },
        collections: {
          include: {
            flashcards: true
          },
        },
      }
    })

    return currentSession
  } catch (error: any) {
    throw new NextResponse("getCurrentSessionUser", error)
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////

export const updateUser = async (values: z.infer<typeof UserValidation>) => {
  try {
    const res = await db.user.update({
      where: {
        id: values.id,
      },
      data: {
        name: values.username,
        email: values.email,
        image: values.image,
      },
    })

    return { success: true }
  } catch (error) {
    console.log(error)
  }
}