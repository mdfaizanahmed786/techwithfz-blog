import { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../../backend/connect";
import { Blog } from "../../backend/models/Blog";

export default async function dislike(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(400).json({ error: "You are not allowed to do so!" });
  }

  try {
    await connectDb();
    const { slug, comment, email } = req.body;
    let post = await Blog.findOne(
      {
        slug,
      },
      { userComments: { $elemMatch: { comment } } }
    );
    if (!post) {
      return res.status(404).json({ error: "Post not found!" });
    }
    let comments = post.userComments.filter(
      (com: any) => com.comment === comment
    );
    if (comments.length === 0) {
      return res.status(404).json({ error: "No comment found!" });
    }
    
    let addDislike = comments[0].likes.filter((like: any) => like !== email);
    comments[0].likes = addDislike;
    post.userComments.filter((com:any) => com.comment === comment);
    await Blog.findOneAndUpdate(
      { slug },
      { $set: { userComments: [...post.userComments] } },
      { new: true }
    );
    res.json({ success: true, comments });
  } catch (er: any) {
    return res.status(500).json({ error: er.message });
  }
}
