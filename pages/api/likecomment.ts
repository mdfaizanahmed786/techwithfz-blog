import { NextApiRequest, NextApiResponse } from "next";
import { Blog } from "../../backend/models/Blog";
import connectDb from "../../backend/connect";
type Reply = {
  email: string;
  reply: string;
};
interface UserComment {
  id: string;
  comment: string;
  email: string;
  slug: string;
  createdAt: string;
  replies: Reply[];
  _v: number;
}


export default async function likecomment(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      await connectDb();
      const {  id,slug, email, comment } = req.body;
      let postSlug = await Blog.findOne({ slug });
      let comments=postSlug.userComments.filter((com:UserComment)=>(com.comment===comment && com.email===email));

      if (!postSlug) return res.status(404).json({ err: "Post not found" });

    
      if (comments.length===0) return res.status(404).json({ err: "Comment not found" });


    
      comments[0].likes.push(email);

      postSlug.userComments.filter((com:UserComment)=>(com.comment===comment && com.email===email));

      await Blog.findOneAndUpdate(
        { slug: slug },
        { $set: { userComments: [...postSlug.userComments] } },
        { new: true }
      );

      res.status(200).json({ success: true });
    } catch (er: any) {
      res.status(500).json({ error: "Internal server error", err: er.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
