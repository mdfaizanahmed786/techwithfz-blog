import mongoose from "mongoose"

interface Comment{
  comment:string;
  createdAt?:string;
  slug:string;
  replies:object[];
  email:string;


}
const CommentSchema=new mongoose.Schema<Comment>({
    comment:{type:String, date:Date.now(), immutable:true, required:true},
    createdAt: { type: Date, default: () => Date.now(), immutable: true },
    slug:{type:String, required:true},
    replies:[{type:Object, date:Date.now(), email:String}],
    email:{type:String, required:true},
  })

  let Comment=mongoose.models.Comment<Comment> || mongoose.model("Comment", CommentSchema)

export {Comment, CommentSchema};