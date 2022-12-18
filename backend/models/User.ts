import mongoose from "mongoose";
import { BlogSchema } from "./Blog";

interface User {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt?: string;
  authToken:string;
  blog: typeof BlogSchema;
}

const UserSchema = new mongoose.Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 5 },
  isAdmin: { type: Boolean, default: false },
  authToken:{type:String, required:true},
  createdAt: { type: Date, default: () => Date.now() },

  blog: BlogSchema,
});

let User = mongoose.models.User<User> || mongoose.model("User", UserSchema);

export default User;