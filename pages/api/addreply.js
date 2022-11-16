import connectDb from "../../backend/connect"
import { Comment } from "../../backend/models/Comment";

export default async function addcomment(req, res){
if(req.method==='POST'){
await connectDb();

}
else{
    res.status(400).send("You are not allowed to do so!!")
}
}