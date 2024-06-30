import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  is_verified: boolean;
}

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  is_verified: { type: Boolean, default: false },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
