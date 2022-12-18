import User from "../../backend/models/User";
import connectDb from "../../backend/connect";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import { Secret } from "next-auth/jwt";
export default async function createuser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await connectDb();
    try {
      const { name, email, password } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(password, salt);
      // To check if the user with the email already exists
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ error: "User already exists" });
      }
      const authToken = jsonwebtoken.sign(
        { email, name},
        process.env.JWT_SECRET as Secret
      );

      const user = await User.create({
        name,
        email,
        password: hashedPass,
        authToken,
      });
      // Below is the code that I am trying to use to set the cookie
      // httpOnly is the way that prevents the user to access the cookie through javascript
      // secure is the way that prevents the user to access the cookie through http
      // sameSite is the way that prevents the user to access the cookie through other domains

      const serialized = serialize("authToken", authToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });
  res.setHeader("Set-Cookie", serialized)
      await user.save();

      res.json({ success: true, authToken });
    } catch (er: any) {
      res.status(500).json({ error: er.message });
    }
  } else {
    res.status(401).send("You are not allowed to do so!");
  }
}
