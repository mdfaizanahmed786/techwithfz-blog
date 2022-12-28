import connectDb from "../../backend/connect";
import User from "../../backend/models/User";
import bcrypt from "bcryptjs";
import { Blog } from "../../backend/models/Blog";
import { NextApiRequest, NextApiResponse } from "next";

export default async function addpost(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await connectDb();
    try {
      const {
        email,
        blog: { title, author, desc, slug, category },
      } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(401).json({ error: "You are unauthorized" });
      const comparePassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (
        comparePassword &&
        user.authToken===process.env.NEXT_PUBLIC_ADMIN_TOKEN &&
        email === "ahmedriyan528@gmail.com"
      ) {
        const response = await Blog.create({
          title,
          desc,
          author,
          slug,
          category,
        });
        return res.json(response);
      } else {
        return res
          .status(401)
          .json({ error: "You are not authorized to visit this page." });
      }
    } catch (er: any) {
      res.status(500).json({ error: er.message });
    }
  } else {
    res.send("You are not allowed to do so!");
  }
}
