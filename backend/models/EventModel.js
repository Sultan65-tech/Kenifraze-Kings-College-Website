import mongoose from "mongoose"




// Creating Event Schema
const EventSchema = {
  image:String,
  name:String,
  info:String
}


// Creating Model off the Schema
const Event = mongoose.model("Event",EventSchema)

export default Event;