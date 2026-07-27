import mongoose from "mongoose";

// Academics
const AcademicSchema = {
  name:String,
  image:String,
  title:String,
  info:String
}



const Academic = mongoose.model("Academic",AcademicSchema)

export default Academic