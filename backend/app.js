require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")

const app = express();

app.use(express.json())



// Creating mongodb Schema

const EventSchema = {
  image:String,
  name:String,
  info:String
}

// Creating Model off the Schema
const Event = mongoose.model("Event",EventSchema)

// const event1 = {
//         image:"Image_name.jpg",
//         name:"Graduation Ceremony",
//         information:"New kkc graduation, join us now!!!"
//     }
//      const event2 =  {
//         image:"Image_name.jpg",
//         name:"Alumni-together",
//         information:"New kkc graduation, join us now!!!"
//     }
    //   {
    //     id:3,
    //     image:"Image_name.jpg",
    //     name:"Talk Show",
    //     information:"New kkc graduation, join us now!!!"
    // }

    // adding Data to the DB

// Event.insertMany(event2)

// Getting all event

app.get("/api/admin",async(req,res)=>{
  const FoundEvent = await Event.find()
    res.status(200).json(FoundEvent)
})

// Getting specific event

app.get("/api/admin/:eventTitle",async(req,res)=>{
  try {
     // const Id = req.params.name;
    const FoundEvent = await Event.find({name:req.params.eventTitle})
    console.log(req.params.eventTitle);
    
    res.status(200).send(FoundEvent)
  } catch (error) {
    res.send("Error fetching :" +  error)
  }
})


// Posting New Event
app.post("/api/admin", (req,res)=>{
 const newEvent = new Event({
  image:req.body.image,
  name:req.body.name,
  info:req.body.info
 })
 newEvent.save()
 res.send(`${newEvent.name} event added Successfully`)
})

// Updating Event
app.put("/api/admin/:eventTitle",async(req,res)=>{
try {
   var Updated = await Event.updateOne({name:req.params.eventTitle},{
      image:req.body.image,
      name:req.body.name,
      info:req.body.info
    })
    // Updated.save()
    res.send("Event  Updated Successully!!!")
} catch (error) {
  res.send(`Error Updating ${error}`)
}
})


// Deleteing all Event
app.delete("/api/admin",async(req,res)=>{
  try{
  const event = req.params.eventTitle;
  const Delete = await Event.deleteMany()
  res.send("Deleted Successfully")
  }catch(error){
    res.send("Error deleting :" + error)
  }
})

// Deleteing specific article

app.delete("/api/admin/:eventTitle",async(req,res)=>{{
try {
    const event = req.params.eventTitle;
  const DeletedEvent = await Event.deleteMany({name:event}) 
  res.status(200).send("Event Deleted Successfully !!!")
} catch (error) {
  res.send("Error deleting event : " + error)
}
}})



mongoose.connect("mongodb://localhost:27017/kkcDb").then(()=>{
  console.log("Mongodb Connected Successfully!!");
  app.listen(3000,()=>{
      console.log("Server Is up and Running!!!")
  });
})

