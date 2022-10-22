import mongoose from "mongoose";
import {BlogSchema} from "./Blog"

const UserSchema =new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique:true },
    password: { type: String, required: true, minLength:5 },
    isAdmin:{type:Boolean, default:false },
    createdAt:{type:Date, default:()=>Date.now()},
    // allow this if you are the admin else not.
    blog:BlogSchema
    
  },
 
);

let User=mongoose.models.User || mongoose.model("User", UserSchema)

export default User;
