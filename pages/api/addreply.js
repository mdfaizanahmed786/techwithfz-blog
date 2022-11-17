import connectDb from "../../backend/connect";
import { Comment } from "../../backend/models/Comment";
import { Blog } from "../../backend/models/Blog";

export default async function addreply(req, res) {
  if (req.method === "POST") {
    await connectDb();
    try {
      const { comment, slug, reply, email } = req.body;
      let post = await Blog.findOne({ slug });

      if (!post) return res.status(404).json({ error: "Post not found!" });
      let comments = post.userComments.filter((com) => com.comment === comment);
      if (comments.length === 0)
        return res.status(404).json({ error: "No comment found!" });
        comments[0].replies.push({email, reply});
      post.userComments.filter((com) => com.comment === comment);
      await Blog.findOneAndUpdate(
        { slug: slug },
        { $set: { userComments: [...post.userComments] } },
        { new: true }
      );

      res.json({ success: true, comments });
    } catch (er) {
      res.status(500).json({ error: er.message });
    }
  } else {
    res.status(400).send("You are not allowed to do so!");
  }
}