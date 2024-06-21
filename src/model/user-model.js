import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  password: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  generations: {
    required: true,
    type: Number,
    default: 5,
  },
});

export const User = mongoose.models.User ?? mongoose.model("User", userSchema);
