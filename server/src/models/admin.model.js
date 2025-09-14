import mongoose,{Schema} from "mongoose";
import bcrypt from 'bcrypt';
const adminSchema = new Schema({
  name:{type:String, required:true,trim:true},
  email:{type:String, required:true,trim:true,unique:true,lowercase:true},
  password:{type:String, required:true},
  role:{type:String, enum:["admin", "superadmin"], default:"admin"},
  isActive:{type:Boolean, default:true}
},{timestamps:true});

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
  });

  adminSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
  };

  export const Admin = mongoose.model("admin", adminSchema);
  