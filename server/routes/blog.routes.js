import {Router} from "express";
import { addBlog, deleteBlogById, getAllBlog, getBlogById, togglePublish } from "../controllers/blogController.js";
import upload from "../middlewares/multer.middleware.js";
import verfyJWT from "../middlewares/auth.middleware.js";
const blogRouter = Router();
blogRouter.post("/add",upload.single('image'),verfyJWT,addBlog)
blogRouter.get("/all",getAllBlog)
blogRouter.get("/:blogId",getBlogById)
blogRouter.patch("/toggle-publish",verfyJWT,togglePublish)
blogRouter.delete("/del/:id",verfyJWT,deleteBlogById)
export default blogRouter;