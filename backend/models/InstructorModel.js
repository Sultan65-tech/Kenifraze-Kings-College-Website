import mongoose from "mongoose";

// Creating Instructor Schema

const InstructorSchema = {
  ImageUrl:{type:String,required:true},
  name:{type:String,required:true},
  subject:{type:String,required:true},
  bio:{type:String,required:true}
}


const Instructor= mongoose.model("Instructor",InstructorSchema)

export default Instructor