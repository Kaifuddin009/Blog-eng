import fs from"fs";
import imagekit from "../config/imageKit.js";
import {Blog} from "../models/blog.model.js";
import { Comment } from "../models/comment.model.js";


const addBlog = async(req, res, next)=>{
    try {
        const{title, subTitle, description, category, isPublished} = JSON.parse(req.body.blog);
        const imageFile = req.file;

        if (!title || !description || !category || !imageFile) {
            return res.status(400).json({success:false,message:"Missing Required Fileds"})
        }
        const fileBuffer = fs.readFileSync(imageFile.path)
        
        const response = await imagekit.upload({
            file:fileBuffer,
            fileName:imageFile.originalname,
            folder:"/blogs"
        })

        const optimizedImageUrl =imagekit.url({
            path:response.filePath,
            transformation:[
                {quality:'auto'},
                {format:"webp"},
                {width:"1280"}
            ]
        })
        const image = optimizedImageUrl;
        ////checkingggg
        console.log({ title, subTitle, description, category, isPublished });
console.log("Image URL:", image);

        await Blog.create({title, subTitle, description, category, image, isPublished})
        return res.status(201).json({success:true,message:"Blog added Successfully"})

    } catch (error) {
        console.error("Error while adding blog:", error);
        return res.status(400).json({success:false,message:error.message})
        
    }
}

const getAllBlog =async(req, res)=>{
    try {
        const blogs = await Blog.find({isPublished:true})
        return res.status(200).json({success:true, blogs})
    } catch (error) {
        return res.status(400).json({success:false, message:error.message })
    }
}

const getBlogById = async(req,res)=>{
    try {
        const {blogId} = req.params;
        const blog = await Blog.findById(blogId) 
        if (!blog) {
            return res.status(404).json({success:false,message:"Blog not found"})
        }
        return res.status(200).json({success:true, blog})
    } catch (error) {
        return res.status(400).json({success:false, message:error.message })
    }
}

const deleteBlogById = async(req, res)=>{
    try {
      const {id} = req.params;
      console.log("Received ID for deletion:", req.params.id);

       if (!id) {
             return res.status(400).json({ success: false, message: "Blog ID missing" });
    }
      const blog = await Blog.findByIdAndDelete(id)
      if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }
      //Delete All comments associated with the blog
      try {
        const deletedComments = await Comment.deleteMany({blog:id})
        console.log(`Deleted ${deletedComments.deletedCount} comments associated with the blog`);
      } catch (error) {
       console.error("Error deleting comments:", error);
            return res.status(400).json({ success: false, message: "Error deleting comments" });
       
      }

      return res.status(200).json({success:true,message:"Blog and associated Comment Deleted Successfully"}) 
    } catch (error) {
        console.error("Delete Blog Error:", error);
        return res.status(400).json({success:false, message:error.message})
    }
}

const togglePublish = async(req, res)=>{
    try {
      const {id} = req.body;
      const blog = await Blog.findById(id)
      blog.isPublished = !blog.isPublished
      await blog.save();
      return res.status(200).json({success:true,message:"blog Status Updated"})

    } catch (error) {
        return res.status(400).json({success:false,message:error.message})
    }
}
export {addBlog,getAllBlog,getBlogById,deleteBlogById,togglePublish};