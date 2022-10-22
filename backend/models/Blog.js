import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true, minLength: 5 },
  author: { type: String },
  desc: { type: String, required: true, minLength: 10 },
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
  slug: { type: String, required: true },
  img: { type: String, required: true },
});

// we are using this below syntax because next js already complies it on the fly and tries to re-compile it which throws an error because it has already created it once.
let Blog= mongoose.models.Blog || mongoose.model("Blog", BlogSchema) 

export default Blog;