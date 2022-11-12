import connectDb from "../../backend/connect";
import User from "../../backend/models/User";
import { Comment } from "../../backend/models/Comment";
import { Blog } from "../../backend/models/Blog";
export default async function addcomment(req, res) {
  console.log(res.headers);
  if (req.method === "POST") {
    try {
      let { comment, authToken, slug } = req.body;
      await connectDb();
    
      let postSlug = await Blog.findOne({ slug });
   

      
      if (!postSlug) return res.status(404).json({ err: "Post not found" });

      let newComment = await Comment.create({
        comment,
        slug,
      
      });
      await newComment.save();
      await Blog.findOneAndUpdate(
        { slug: slug },
        { $set: { userComments: [...postSlug.userComments, newComment] } },
        { new: true }
      );
      res.json({success:true});
    } catch (er) {
      res.status(500).json({ err: er.message });
    }
  } else {
    res.status(400).json({ err: "You are not authorized" });
  }
}
