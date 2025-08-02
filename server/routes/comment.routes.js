import {Router} from "express";
import { addComment, generateContent, getBlogComments } from "../controllers/comment.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";
const commentRouter = Router();

commentRouter.post("/add",addComment);
commentRouter.get("/all/:blogId",getBlogComments)
commentRouter.post('/generate',verifyJWT, generateContent)
export default commentRouter;