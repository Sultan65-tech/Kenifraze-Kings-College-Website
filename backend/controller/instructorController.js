import Instructor from "../models/InstructorModel.js"

export const getInstructor = async(req,res)=>{
try {
    const FoundInstructor = await Instructor.find()
 res.status(200).json(FoundInstructor) 
} catch (error) {
    res.send("Error in Get Instructor Controller")
    console.log(error);
}

}


// export const postInstructor = (req,res)=>{
//  try {
//      const data = req.body;
//   Instructor.save(data)
//   res.send("Instructor Data added Successfully!!!")
//  } catch (error) {
//   res.send("Error in Post Instructor Controller") 
//   console.log(error);
//  }
// }
export const postInstructor = (req,res)=>{
try {
   const newInstructor = req.body
    Instructor.insertOne(newInstructor)
    res.send(`${newInstructor.name}  added Successfully`)
  } catch (error) {
    console.log(error);
    res.status(500).send("Error in Post Event Controller",error)
    
  }
}

export const putInstructor = (req,res)=>{
    try {
        const newInst = req.body;
        const updatedInstructor = Instructor.updateOne({name:req.params.instructorname},{newInst})
    } catch (error) {
        
    }
}