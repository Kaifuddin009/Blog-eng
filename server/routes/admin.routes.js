import  { Router } from "express";
import { adminLogin, approveCommentById, deleteCommentById, getAllBlogsAdmin, getAllCommentAdmin, getBoardData } from "../controllers/adminController.js";
import verifyJWT from "../middlewares/auth.middleware.js";
const adminRouter = Router();

adminRouter.post("/login",adminLogin);
adminRouter.get("/blogs",verifyJWT,getAllBlogsAdmin);
adminRouter.get("/comments",verifyJWT,getAllCommentAdmin);
adminRouter.get("/dashboard",verifyJWT,getBoardData);
adminRouter.delete("/delete-comment/:id",verifyJWT,deleteCommentById)
adminRouter.post("/approve-comment/:id",verifyJWT,approveCommentById)

export default adminRouter;