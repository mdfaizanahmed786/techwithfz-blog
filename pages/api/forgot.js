import { Forgot } from "../../backend/models/Forgot";
import User from "../../backend/models/User";
import connectDb from "../../backend/connect";
export default async function forgot(req, res) {
  if (req.method === "POST") {
    try {
      await connectDb();
      const token = process.env.FORGOT_TOKEN;
      const { email } = req.body;
      // checking if the user exists in our database

      const user = await User.findOne({ email });

      if (!user)
        return res
          .status(404)
          .json({ error: "User with this email do not exist!" });

      let addDetails = await Forgot.create({
        token,
        email,
      });
      await addDetails.save();

      res.json({ success: true });
    } catch (er) {
      res.status(500).json({ error: "Internal Server Error", err: er.message });
    }
  } else {
    res.status(400).json({ error: "You are not allowed" });
  }
}
