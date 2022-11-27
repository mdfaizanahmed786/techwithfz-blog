import connectDb from "../../backend/connect";
import { Comment } from "../../backend/models/Comment";
import { Blog } from "../../backend/models/Blog";
import { NextApiRequest, NextApiResponse } from "next";
export default async function addcomment(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      let { comment, email, slug } = req.body;
      await connectDb();

      let postSlug = await Blog.findOne({ slug });

      if (!postSlug) return res.status(404).json({ err: "Post not found" });

      let newComment = await Comment.create({
        comment,
        slug,
        email,
      });
      await newComment.save();
      await Blog.findOneAndUpdate(
        { slug: slug },
        { $set: { userComments: [...postSlug.userComments, newComment] } },
        { new: true }
      );
      await Comment.findOneAndDelete({ slug });
      res.json({ success: true });
    } catch (er: any) {
      res.status(500).json({ err: er.message });
    }
  } else {
    res.status(400).json({ err: "You are not authorized" });
  }
}
