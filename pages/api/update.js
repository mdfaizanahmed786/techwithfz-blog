import { Forgot } from "../../backend/models/Forgot";
import User from "../../backend/models/User";
import bcrypt from "bcryptjs";
import connectDb from "../../backend/connect";

export default async function update(req, res) {
  if (req.method === "PUT") {
    try {
      await connectDb();
      const { password } = req.body;
      let [recentDocument] = await Forgot.find().sort({ $natural: -1 });
      if (recentDocument.token !== process.env.NEXT_PUBLIC_FORGOT_TOKEN)
        return res.status(401).json({ error: "You are not authorized" });
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);
  
      let user = await User.findOneAndUpdate(
        { email: recentDocument.email },
        { $set: { password: hashedPass} },
        { new: true }
      );
      if (!user)
        return res.status(404).json({ error: "Your email does not exist" });

      res.json({ success: true });
    } catch (er) {
      res.status(500).json({ error: "Internal server error", err: er.message });
    }
  } else {
    return res.status(400).json({ error: "You are not authorized!" });
  }
}
