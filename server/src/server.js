import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectedToData from "./database/mongodb.js";
import adminRouter from "./routes/admin.routes.js";
import blogRouter from "./routes/blog.routes.js";
import commentRouter from "./routes/comment.routes.js";
dotenv.config({path:"./.env"});

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

//Routes
app.use("/api/admin",adminRouter)
app.use("/api/blog",blogRouter)
app.use("/api/comment/",commentRouter)
connectedToData().then(()=>{
app.listen(process.env.PORT || 7000,(req, res) =>{
    console.log(`server is running http://localhost:${process.env.PORT}`)
})
})
