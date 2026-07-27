import mongoose from "mongoose";

// Creating Instructor Schema
const InstructorSchema = {
  image:String,
  name:String,
  subject:String,
  bio:String,
}


const Instructor= mongoose.model("Instructor",InstructorSchema)