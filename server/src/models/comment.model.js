import mongoose,{Schema} from "mongoose";

const commentSchema = new Schema({
    blog:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"blog",
        require:true
    },
    name:{
        type:String,
        require:true,
    },
    content:{
        type:String,
        require:true
    },
    isApproved:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

export const Comment = mongoose.model("comment",commentSchema)