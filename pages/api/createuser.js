import User from "../../backend/models/User";
import connectDb from "../../backend/connect";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken"
export default async function createuser(req, res) {
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
      const authToken = jsonwebtoken.sign(data, process.env.JWT_SECRET);
      const {isAdmin}=user;
      res.json({isAdmin, success:true, authToken})
    } catch (er) {
      res.status(500).json({ error: er.message });
    }
  } else {
    res.status(401).send("You are not allowed to do so!");
  }
}
