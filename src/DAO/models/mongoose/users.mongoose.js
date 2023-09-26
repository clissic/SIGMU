import { Schema, model } from "mongoose";

const schema = new Schema({
  first_name: { type: String, required: true, max: 100 },
  last_name: { type: String, required: true, max: 100 },
  rank: { type: String, required: true, max: 5},
  email: { type: String, required: true, max: 100, unique: true },
  password: { type: String, required: true, max: 100 },
  role: { type: String, default: "user"},
  fines: { type: Array, default: [] },
});

export const UserMongoose = model("users", schema);