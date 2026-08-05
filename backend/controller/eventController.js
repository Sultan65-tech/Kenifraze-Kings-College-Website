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
      const Id = req.params.eventTitle;
    const FoundEvent = await Event.find({title:req.params.eventTitle}).sort(-1)
    //console.log(req.params.eventTitle);    
    res.status(200).send(FoundEvent)
  } catch (error) {
    res.send("Error fetching :" +  error)
  }
}


// Posting EVent
export const postEvent = (async(req,res)=>{
try {
   const {title,description,date,location,ImageUrl} = req.body;
   const imageUrl = req.file ? req.file.path : null;
   const newEvent = new Event({
    title,
    description,
    date,
    location,
    ImageUrl:imageUrl
   })
   await newEvent.save()
    res.send("Event added Successfully")
  } catch (error) {
    console.log(error);
    res.status(500).send("Error in Post Event Controller",error)
    
  }
})

// Updating Event 
export const putEvent = async(req,res)=>{
try {
  const { title, description, date, location } = req.body;

    // 1. Find existing record first
    const existingEvent = await Event.findById(id);
    if (!existingEvent) {
      return res.status(404).json({ error: "Event not found" });
    }

    // 2. If user uploaded a NEW image, use req.file.path.
    // Otherwise, retain the EXISTING image URL from database!
    const imageUrl = req.file ? req.file.path : existingEvent.image;

    // 3. Update the fields
    existingEvent.title = title || existingEvent.title;
    existingEvent.description = description || existingEvent.description;
    existingEvent.date = date || existingEvent.date;
    existingEvent.location = location || existingEvent.location;
    existingEvent.image = imageUrl;

    const updatedEvent = await existingEvent.save();

    res.status(200).json({
      message: "Event updated successfully",
      event: updatedEvent
    });
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
