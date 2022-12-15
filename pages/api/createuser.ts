import User from "../../backend/models/User";
import connectDb from "../../backend/connect";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { Secret } from "next-auth/jwt";
export default async function createuser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await connectDb();
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(req.body.password, salt);

      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPass,
      });
      await user.save();
      const { isAdmin, id, email, password } = user;
      const authToken = jsonwebtoken.sign(
        { email, id, password },
        process.env.JWT_SECRET as Secret
      );
      user.token = authToken;
      res.json({ isAdmin, success: true, authToken, email });

    } catch (er: any) {
      res.status(500).json({ error: er.message });
    }
  } else {
    res.status(401).send("You are not allowed to do so!");
  }
}
