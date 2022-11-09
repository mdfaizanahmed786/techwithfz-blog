import User from "../../backend/models/User.js";
import bcrypt from "bcryptjs"
import connectDb from "../../backend/connect.js";
import jsonwebtoken from "jsonwebtoken"

export default async function getuser(req, res) {
  if (req.method === "POST") {
    await connectDb()
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ error: "User not found" });
      const comparePassword=await bcrypt.compare(req.body.password,user.password)
      if (!comparePassword) {
        return res
          .status(404)
          .json({ error: "Please enter valid credentials" });
      }
      const {isAdmin, _id}=user;
      const authToken = jsonwebtoken.sign({email, _id}, process.env.JWT_SECRET);
      res.json({isAdmin, success:true, authToken, email})
    } catch (er) {
      res.status(500).json({ error: er.message });
    }
  } else {
    res.send("You are not allowed to do so!");
  }
}
