import "./globals.css";
import { dbConnect } from "@/lib/mongo";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  const conn = await dbConnect();
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
