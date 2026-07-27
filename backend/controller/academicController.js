import Academic from "../models/AcademicModel.js"

// Getting All Academic

export const getOneAcademic = async(req,res)=>{
   try {
     const FindAcademic = await Academic.find();
    res.status(200).json(FindAcademic)
   } catch (error) {
   res.status(500).send("Error in Get Academic Controller")
}
}

// Getting specific Academic

export const getAcademic = async(req,res)=>{
   try {
     const FindAcademic = await Academic.find({name:req.params.academicTitle})
    res.status(200).json(FindAcademic)
   } catch (error) {
    
   res.status(500).send("Error in Get Academic Controller")
}
}

// Posting Academic

export const postAcademic = async(req,res)=>{
   try {
    const newAcademic = new Academic({
        image:req.body.image,
        name:req.body.name,
        info:req.body.info
    })
     newAcademic.save()
    res.status(200).json(newAcademic)
   } catch (error) {
    res.status(500).send("Error in Post Academic Controller",error)
    console.log(error);
    
}
   }

// Updating Academic

export const updateAcademic = async(req,res)=>{
   try {
     const UpdatedAcademic = await Academic.updateOne({name:req.params.academicTitle},{
        name:req.body.name,
        image:req.body.image,
        info:req.body.info
     })
     updateAcademic.save()
    res.status(200).json(UpdatedAcademic)
   } catch (error) {
    res.status(500).send("Error in update Academic Controller")
   }
}

//Deleting Academic

export const deleteAcademic = async(req,res)=>{
   try {
      await Academic.deleteOne({name:req.params.academicTitle})
    res.status(200).json({message:"Successfully Deleted"})
   } catch (error) {
   console.log(error)
   res.status(500).send("Error in Delete Academic Controller")
}
}