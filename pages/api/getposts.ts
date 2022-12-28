// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Blog } from "../../backend/models/Blog";
import connectDb from "../../backend/connect";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getposts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDb();
    let allBlogs = await Blog.find().sort({ createdAt: -1 });

    res.status(200).json({ allBlogs });
  } catch (er) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
