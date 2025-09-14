import { Admin } from "../models/admin.model.js";
import {JWT_EXPIREIN, JWT_SECRET_KEY,} from "../config/configenv.js";
import jwt from "jsonwebtoken";
import {Blog} from "../models/blog.model.js";
import {Comment} from "../models/comment.model.js";

const generateToken = (admin) =>{
    return jwt.sign(
        {id:admin._id, email: email.admin, role:admin.role},
        JWT_SECRET_KEY,
        {expiresIn:JWT_EXPIREIN}
    );
};

/*const registerAdmin = async(req, res)=>{
    try {
        const {name, email, password, role}= req.body;

    } catch (error) {
        
    }
}*/

const adminLogin = async(req, res)=>{
    try {
        const {email, password} = req.body;
        const admin = await Admin.findOne({email});
        if (!admin) {
            return res.status(401).json({ success:false, message: "Invalid email or password" });
        }

         const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }
        
        const token = jwt.sign(
      { id: admin._id, role: admin.role }, 
      JWT_SECRET_KEY,
      { expiresIn:JWT_EXPIREIN || "7d" }
    );
       // const token = jwt.sign({email},JWT_SECRET_KEY)
            return res.status(200).json({success:true,token,
        admin: {
        id: admin._id,
        email: admin.email,
        role: admin.role
      }

            })
    } catch (error) {
        return res.status(400).json({success:false,message:error.message})
    }
}

const getAllBlogsAdmin = async(req, res)=>{
    try {
        const blogs = await Blog.find({}).sort({createdAt:-1})
        return res.status(200).json({success:true,blogs})
    } catch (error) {
        return res.status(400).json({success:false,message:error.message})
    }
}
const getAllCommentAdmin =async(req, res)=>{
    try {
        const comments=await Comment.find({}).populate("blog").sort({createdAt:-1})
        return res.status(200).json({success:true,comments})
    } catch (error) {
     return res.status(400).json({success:false,message:error.message})   
    }
}

const getBoardData = async(req, res)=>{
    try {
        const recentBlogs = await Blog.find({}).sort({createdAt:-1}).limit(5)
        const blogs = await Blog.countDocuments();
        const comments = await Comment.countDocuments();
        const drafs = await Blog.countDocuments({isPublished:true})
        const dashBoardData = {recentBlogs, blogs, comments, drafs};
        return res.status(200).json({success:true, dashBoardData})
    } catch (error) {
       return res.status(400).json({success:false,message:error.message}) 
    }
}

const approveCommentById = async(req, res)=>{
    try {
        const id = req.params.id;
        await Comment.findByIdAndUpdate(id, {isApproved:true})
        return res.status(200).json({success:true, message:"comment approved Successfully"})
    } catch (error) {
        return res.status(400).json({success:false, message:error.message})
    }
}
const deleteCommentById = async(req, res)=>{
    try {
        const id = req.params.id;
        await Comment.findByIdAndDelete(id)
        return res.status(200).json({success:true,message:"Comment deleted Successsfully"})
    } catch (error) {
        return res.status(400).json({success:false,message:error.message})
    }
}
export {adminLogin,getAllBlogsAdmin,getAllCommentAdmin,getBoardData,approveCommentById,deleteCommentById};