import mongoose from "mongoose";
import { ATLAS_URI } from "../config/configenv.js";
if (!ATLAS_URI) {
    throw new Error("ATLAS URi is not defined in .env");
}
async function connectedToData() {
    try {
        await mongoose.connect(ATLAS_URI);
        console.log("Connected to MongoDb")
    } catch (error) {
        console.error("Not connected to MongoDb",error)
    }
    
}
export default connectedToData;