import User from "../../backend/models/User";
import connectDb from "../../backend/connect";
export default async function createUser(req, res) {
  if (req.method === "POST") {
      await connectDb()
    try {
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      await user.save();
      res.json(user);
    } catch (er) {
      res.status(500).json({ error: er.message });
    }
  } else {
    res.status(401).send("You are not allowed to do so!");
  }
}
