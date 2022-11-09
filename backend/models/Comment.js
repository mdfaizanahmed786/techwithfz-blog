import mongoose from "mongoose"
const CommentSchema=new mongoose.Schema({
    comment:{type:String, date:Date.now(), immutable:true, required:true},
    email:{type:String, required:true},
    slug:{type:String, required:true}
  })

  let Comment=mongoose.models.Comment || mongoose.model("Comment", CommentSchema)

export {Comment, CommentSchema};
