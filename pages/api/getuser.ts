import User from "../../backend/models/User";
import bcrypt from "bcryptjs";
import connectDb from "../../backend/connect";
import jsonwebtoken from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { Secret } from "next-auth/jwt/types.js";
import cookie from "cookie";
export default async function getuser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await connectDb();
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ error: "User not found" });
      const comparePassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!comparePassword) {
        return res
          .status(404)
          .json({ error: "Please enter valid credentials" });
      }
      const { isAdmin, _id, password } = user;
      const authToken = jsonwebtoken.sign(
        { email, _id, password },
        process.env.JWT_SECRET as Secret
      );


      user.token = authToken;
      res.setHeader("Set-Cookie", cookie.serialize('auth', authToken,{
        httpOnly:true,
        secure:process.env.NODE_ENV !== 'development',
        sameSite:'strict',
        maxAge: 3600,
        path:'/'   
      })); 
      
      



      res.json({ isAdmin, success: true, authToken, email });
    } catch (er: any) {
      res.status(500).json({ error: er.message });
    }
  } else {
    res.send("You are not allowed to do so!");
  }
}


// first we've installed cookie package and then types of it.jj