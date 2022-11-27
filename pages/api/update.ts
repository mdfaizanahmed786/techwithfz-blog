import { Forgot } from "../../backend/models/Forgot";
import User from "../../backend/models/User";
import bcrypt from "bcryptjs";
import connectDb from "../../backend/connect";
import { NextApiRequest, NextApiResponse } from "next";

export default async function update(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    try {
      await connectDb();
      console.log(req.body.password);
      let [recentDocument] = await Forgot.find().sort({ $natural: -1 });
      if (
        recentDocument.token !== process.env.NEXT_PUBLIC_FORGOT_TOKEN &&
        recentDocument.id
      )
        return res.status(401).json({ error: "You are not authorized" });
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(req.body.password, salt);

      let user = await User.findOneAndUpdate(
        { email: recentDocument.email },
        { $set: { password: hashedPass } },
        { new: true }
      );
      if (!user)
        return res.status(404).json({ error: "Your email does not exist" });

      res.json({ success: true });
    } catch (er: any) {
      res.status(500).json({ error: "Internal server error", err: er.message });
    }
  } else {
    return res.status(400).json({ error: "You are not authorized!" });
  }
}
