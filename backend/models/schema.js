import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    city: { type: String, required: true },
    phone: { type: String, required: true },
    type: { type: String, required: true },
    address: { type: String, required: true },
  }
);

const Schema = mongoose.model("Schema", UserSchema);
export default Schema;
