import Event from "../models/EventModel.js"


// getting all Event 
export const getEvent = async(req,res)=>{
  try {
    const FoundEvent = await Event.find()
    res.status(200).json(FoundEvent)
  } catch (error) {
    console.log(error);
    res.send("Error in  getEvent Controller")
  }
}

// Getting Specific Event
export const getOneEvent = async(req,res)=>{
  try {
      const Id = req.params.title;
    const FoundEvent = await Event.find({title:req.params.eventTitle})
    //console.log(req.params.eventTitle);    
    res.status(200).send(FoundEvent)
  } catch (error) {
    res.send("Error fetching :" +  error)
  }
}


// Posting EVent
export const postEvent = (req,res)=>{
try {
   const newEvent = req.body
    Event.insertOne(newEvent)
    res.send(`${newEvent.title} event added Successfully`)
  } catch (error) {
    console.log(error);
    res.status(500).send("Error in Post Event Controller",error)
    
  }
}

// Updating Event 
export const putEvent = async(req,res)=>{
try {
  const event = req.body;
   var Updated = await Event.updateOne({title:req.params.eventTitle},{event})
   // Updated.save()
    res.send("Event  Updated Successully!!!")
} catch (error) {
  res.send(`Error Updating ${error}`)
}
}



// Deleting specific Event
export const deleteOneEvent = async(req,res)=>{
  try {
    const event = req.params.eventTitle;
    const DeletedEvent = await Event.deleteOne({title:event}) 
    res.status(200).send("Event Deleted Successfully !!!")
  } catch (error) {
    res.send("Error deleting event : " + error)
  }


}




  // Deleting All
  export const deleteAllEvent = async(req,res)=>{
      try{
          const event = req.params.eventTitle;
          const Delete = await Event.deleteMany()
          res.send("Deleted Successfully")
      }catch(error){
          res.send("Error deleting :" + error)
      }
  }
