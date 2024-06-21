import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

import { User } from "./model/user-model";
import bcrypt from "bcryptjs";
import { createUser } from "@/queries/users";
import { dbConnect } from "@/lib/mongo";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  debug: true, // Включение отладочного режима
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          console.error("Credentials are missing");
          return null;
        }

        await dbConnect(); // Убедитесь, что подключение к базе данных выполняется

        try {
          const user = await User.findOne({
            email: credentials.email,
          });

          if (!user) {
            console.error("User not found");
            throw new Error("User not found");
          }

          const isMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isMatch) {
            console.error("Invalid password");
            throw new Error("Email or Password is not correct");
          }

          return { id: user._id, email: user.email, name: user.name };
        } catch (error) {
          console.error("Error during authorization:", error);
          throw new Error("Internal server error");
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
      }

      if (profile) {
        const existingUser = await User.findOne({ email: profile.email });
        if (!existingUser) {
          await dbConnect();
          const newUser = {
            name: profile.name,
            email: profile.email,
            password: "google user",
          };
          await createUser(newUser);
        }
      }

      return token;
    },
  },
});
