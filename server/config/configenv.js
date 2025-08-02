import {config} from "dotenv";
//console.log(`config se ${process.env.ATLAS_URI}`)
config({path:`.env.${process.env.NODE_ENV || 'development'}.local`});
export const {PORT, 
    ATLAS_URI, 
    NODE_ENV,
ADMIN_EMAIL,ADMIN_PASSWORD,JWT_SECRET_KEY,IMAGEKIT_PUBLIC_KEY,IMAGEKIT_PRIVATE_KEY,
IMAGEKIT_URL_ENDPOINT,GEMINI_API_KEY
} =process.env;