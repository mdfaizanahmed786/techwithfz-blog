import { Forgot } from "../../backend/models/Forgot";
import User from "../../backend/models/User";
import connectDb from "../../backend/connect";
import sgMail from "@sendgrid/mail";
import jsonwebtoken from "jsonwebtoken";
export default async function forgot(req, res) {
  if (req.method === "POST") {
    try {
      await connectDb();

      const { email } = req.body;
      // checking if the user exists in our database

      const user = await User.findOne({ email });

      if (!user)
        return res
          .status(404)
          .json({ error: "User with this email do not exist!" });

      let addDetails = await Forgot.create({
        token: req.body.token,
        email: req.body.email,
      });
      await addDetails.save();

      sgMail.setApiKey(process.env.SENDGRID_KEY);
      const msg = {
        to: email, // Change to your recipient
        from: "techwithfz@gmail.com", // Change to your verified sender
        subject: "Your request to reset your password",
        text: "and easy to do anywhere, even with Node.js",
        html: `<div>
        <p>Hi there, we've received a request to reset your password. Click the below link to reset your password.</p>
        <a href=http://localhost:3000/forgot?authToken=${addDetails.token} target="_blank">Reset Password</a>
        </div>`,
      };
      try {
        await sgMail.send(msg);
      } catch (er) {
        return res.status(500).json({ error: "Internal server error" });
      }
      const { id } = addDetails;
      res.json({ success: true, id });
    } catch (er) {
      res.status(500).json({ error: "Internal Server Error", err: er.message });
    }
  } else {
    res.status(400).json({ error: "You are not allowed" });
  }
}
