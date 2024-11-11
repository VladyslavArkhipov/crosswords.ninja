import mongoose from "mongoose";

export async function dbConnect() {
  try {
    console.log("Connecting to db");
    let conn = await mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    return conn;
  } catch (e) {
    throw new Error(e);
  }
}
