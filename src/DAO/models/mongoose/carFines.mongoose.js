import { Schema, model } from "mongoose";

const schema = new Schema({
  fine_number : { type: Number, required: true },
  fine_date: { type: String, required: true },
  fine_time: { type: String, required: true },
  fine_article: { type: String, required: true },
  fine_amount: { type: Number, required: true },
  fine_extra_amount: { type: Number, default: 0 },
  fine_author: { type: String, required: true },
  fine_proves: { type: String, required: true }, // BETA
  car_brand: { type: String, required: true },
  car_model: { type: String, required: true },
  car_reg_number: { type: String, required: true, max: 7},
  owner_ci: { type: String, default: "S/D", max: 8 },
  owner_name: { type: String, default: "S/D" },
  owner_tel: { type: String, default: "S/D" },
  owner_dir: { type: String, default: "S/D" },
});

export const CarFinesMongoose = model("carFines", schema);