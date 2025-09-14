import main from "../config/gemini.js";
import { Comment } from "../models/comment.model.js";


const addComment = async(req, res)=>{
    try {
        const {blog, name, content} = req.body;
        await Comment.create({blog, name, content})
        return res.status(201).json({success:true, message:"Comment Added Successfully"})
        
    } catch (error) {
        return res.status(400).json({success:false,message:error.message})
    }
}

const getBlogComments =async(req, res)=>{
 try {
       const{blogId} = req.params;
       const comment = await Comment.find({blog :blogId, isApproved:true}).sort({createdAt:-1});
       return res.status(200).json({success:true, comments: comment})
   }
 catch(error) {
    return res.status(400).json({success:false,message:error.message})
 }
}

const generateContent = async(req, res) =>{
    try {
        const {prompt} = req.body;
        const content = await main(prompt + ' Generate a Blog content for this topic in simple text format ')
        return res.status(201).json({success:true,content})
    } catch (error) {
        return res.status(404).json({success:false,message:error.message})
    }
}
export{addComment,getBlogComments,generateContent}
