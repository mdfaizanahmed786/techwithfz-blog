// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Blog } from "../../backend/models/Blog";
import connectDb from "../../backend/connect";

export default async function getposts(req, res) {
  try {
    await connectDb();
    let allBlogs = await Blog.find();

    res.status(200).json({ allBlogs });
  } catch (er) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
