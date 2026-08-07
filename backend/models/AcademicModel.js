import mongoose from "mongoose";

// Academics
const academicSchema =new mongoose.Schema({
  title:{type:String,required:true,unique:true,},
  description:{type:String,required:true},
  category:{type:String,required:true},
  ImageUrl:{type:String,required:true}
},{timestamps:true})



const Academic = mongoose.model("Academic",academicSchema)

export default Academic