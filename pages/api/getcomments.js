import connectDb from "../../backend/connect";
import {Comment} from "../../backend/models/Comment";
import{ Blog } from "../../backend/models/Blog";
export default async function getcomments(req,res){
    if(req.method==="POST"){

        try{
        await connectDb();
            const {slug}=req.body;
            let allComments=await Blog.findOne({slug})
            if(!allComments) return res.status(404).json({"error":"Not found"})
            let all=[];
            let allComment=[]
            allComments.userComments.forEach((elem)=>all.push(elem.id))
            for(let i of all){
                let data=await Comment.findById(i);
                allComment.push(data)
        
            }
           res.json(allComment)
        
        }catch(er){
        res.status(500).json({err:"Internal Server error"})
        }
    }
    else{
        res.status(401).json({"error":"You are not allowed to do so...."})
    }
}