import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import { db } from "./db"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { LoginValidation } from "./lib/validations/authentication"
import bcrypt from "bcryptjs";
import { getUserByEmail } from "./lib/actions/User"
import Credentials from "next-auth/providers/credentials"

export const { handlers: { GET, POST }, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user.id
      }

      return token
    },
    session: async ({ session, token }) => {
      
      session.user.id = token.id as string || token.sub as string
      return session;
    },      
  },
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginValidation.safeParse(credentials)
        
        if (validatedFields.success) {
          const { email, password } = validatedFields.data
          const user = await getUserByEmail(email)

          if (!user || !user.password || !user.email) return null

          const result = await bcrypt.compare(password, user.password)

          // console.log(result)
          if (!result) return null

          return user
        }

        return null
      }
    })
  ],
})