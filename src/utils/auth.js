import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

import { User } from "../model/user-model";
import bcrypt from "bcryptjs";
import { createUser } from "@/queries/users";
import mongoose from "mongoose";

// Кэширование соединения с базой данных для предотвращения повторных подключений
let isConnected = false;
async function dbConnect() {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      /* настройки mongoose */
    });
    isConnected = true;
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection error:", error);
  }
}

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

        await dbConnect(); // Подключение к базе данных только при необходимости

        try {
          const user = await User.findOne({ email: credentials.email });
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

      // Асинхронное создание пользователя при первом входе через Google
      if (profile) {
        dbConnect().then(async () => {
          const existingUser = await User.findOne({ email: profile.email });
          if (!existingUser) {
            const newUser = {
              name: profile.name,
              email: profile.email,
              password: "google user", // Пароль-заглушка для Google пользователей
            };
            try {
              await createUser(newUser);
            } catch (error) {
              console.error("Error creating user:", error);
            }
          }
        });
      }

      return token;
    },
  },
});
