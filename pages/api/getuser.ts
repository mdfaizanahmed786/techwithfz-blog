import User from "../../backend/models/User";
import bcrypt from "bcryptjs";
import connectDb from "../../backend/connect";
import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

export default async function getuser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await connectDb();
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ error: "User not found" });
      const comparePassword = await bcrypt.compare(password, user.password);
      if (!comparePassword) {
        return res
          .status(404)
          .json({ error: "Please enter valid credentials" });
      }
      const { authToken } = user;

      const serialized = cookie.serialize("authToken", authToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });
      res.setHeader("Set-Cookie", serialized);
      res.json({ success: true, authToken });
    } catch (er: any) {
      res.status(500).json({ error: er.message });
    }
  } else {
    res.send("You are not allowed to do so!");
  }
}
