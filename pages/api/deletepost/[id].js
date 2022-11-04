import connectDb from "../../../backend/connect";
import { Blog } from "../../../backend/models/Blog";
import User from "../../../backend/models/User";
export default async function handler(req, res) {
  try {
    if (req.method === "DELETE") {
      await connectDb();
      const { id } = req.query;

      const posts = await Blog.findById(id);
      const admin = await User.find();
      let adminUser = admin.filter((user) => {
        return user.isAdmin===true;
      });
      // first and for most we are checking if the notes are available or not.
      if (!posts) return res.status(404).json({ error: "Not found" });

      
     if(adminUser.length !== 0){
       await Blog.findByIdAndDelete(id);
  
       return res.status(200).send({success:true});

     }

     return res.status(400).json({ error: "Not Authorized" });


    }
  } catch (er) {
    res.status(500).json({ error: "Internal Server Error", err: er.message });
  }
}
