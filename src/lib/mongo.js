import mongoose from "mongoose";

export async function dbConnect() {
  let conn = null;
  try {
    console.log("Connecting to db");
    conn = await mongoose.connect(
      String(process.env.MONGO_DB_CONNECTION_STRING),
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log("Connected to db");
    return conn;
  } catch (e) {
    console.error("Error connecting to db:", e);
    throw new Error(e);
  } finally {
    if (conn) {
      console.log("Closing db connection");
      await conn.disconnect();
      console.log("Db connection closed");
    }
  }
}
