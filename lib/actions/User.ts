import { auth } from "@/auth"
import { db } from "@/db"
import { NextResponse } from "next/server"

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