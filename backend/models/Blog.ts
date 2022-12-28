import mongoose, { Schema } from "mongoose";
import {CommentSchema} from "./Comment"

interface Blog{
  title: string;
  author:string;
  desc:string;
  createdAt:string | undefined;
  slug:string;
  userComments:typeof CommentSchema[];
  imgs:string[];
  category:string


}
const BlogSchema = new mongoose.Schema<Blog>({
  title: { type: String, required: true, minLength: 5 },
  author: { type: String, required:true },
  desc: { type: String, required: true, minLength: 10 },
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
  slug: { type: String, required: true },
  userComments:[ { type: CommentSchema}],
  category:{type:String, required:true},
  imgs:[String]
 
});

// we are using this below syntax because next js already complies it on the fly and tries to re-compile it which throws an error because it has already created it once.
let Blog= mongoose.models.Blog<Blog> || mongoose.model("Blog", BlogSchema)


export {Blog, BlogSchema};