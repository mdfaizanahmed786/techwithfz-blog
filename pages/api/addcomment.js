import connectDb from "../../backend/connect";
import User from "../../backend/models/User";
import { Comment } from "../../backend/models/Comment";
import { Blog } from "../../backend/models/Blog";
export default async function addcomment(req, res) {
  console.log(res.headers);
  if (req.method === "POST") {
    try {
      let { comment, email, authToken, slug } = req.body;
      await connectDb();
      let user = await User.findOne({ email });
      let postSlug = await Blog.findOne({ slug });

      if (!user)
        return res.status(401).json({ er: "You are not authenticated" });
      if (!authToken)
        return res.status(401), json({ er: "Login first to add a comment" });
      if (!postSlug) return res.status(404).json({ err: "Not found" });

      let newComment = await Comment.create({
        comment,
        slug,
      });
      await newComment.save();
    let oldComment=postSlug.userComments
      let updatedPost = await Blog.findOneAndUpdate(
        { slug: slug },
        { $set: { userComments: [...oldComment, newComment] } },
        { new: true }
      );
      res.send(updatedPost);
    } catch (er) {
      res.status(500).json({ err: er.message });
    }
  } else {
    res.status(400).json({ err: "You are not authorized" });
  }
}
