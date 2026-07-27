import Event from "../models/EventModel.js"


// getting all Event 
export const getEvent = async(req,res)=>{
  try {
    const FoundEvent = await Event.find()
    res.status(200).json(FoundEvent)
  } catch (error) {
    res.send("Error in  getEvent Controller")
  }
}

// Getting Specific Event
export const getOneEvent = async(req,res)=>{
  try {
      const Id = req.params.name;
    const FoundEvent = await Event.find({name:req.params.eventTitle})
    //console.log(req.params.eventTitle);    
    res.status(200).send(FoundEvent)
  } catch (error) {
    res.send("Error fetching :" +  error)
  }
}


// Posting EVent
export const postEvent = (req,res)=>{
try {
   const newEvent = new Event({
     image:req.body.image,
     name:req.body.name,
     info:req.body.info
    })
    newEvent.save()
    res.send(`${newEvent.name} event added Successfully`)
  } catch (error) {
    res.status(500).send("Error in Post Academic Controller",error)
    
  }
}

// Updating Event 
export const putEvent = async(req,res)=>{
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
}



// Deleting specific Event
export const deleteOneEvent = async(req,res)=>{
  try {
    const event = req.params.eventTitle;
    const DeletedEvent = await Event.deleteOne({name:event}) 
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
