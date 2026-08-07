import academic from "../models/AcademicModel.js"

// Getting All Academic

export const getAcademic = async(req,res)=>{
   try {
     const FindAcademic = await academic.find();
    res.status(200).json(FindAcademic)
   } catch (error) {
   res.status(500).send("Error in Get Academic Controller")
}
}

// Getting specific Academic

export const getOneAcademic = async(req,res)=>{
   try {
     const FindAcademic = await academic.find({_id:req.params.id})
     if (!FindAcademic) {
      res.status(404).json({message:"Academic Not Found!!!"})
     } else {   
        res.status(200).json(FindAcademic)
     }
   } catch (error) {
   res.status(500).send("Error in Get Academic Controller" + error)
}
}

// Posting Academic

export const postAcademic = async(req,res)=>{
   try {
    const {title,description,category,ImageUrl} = req.body;
    const imageUrl = req.file ? req.file.path : null;
    const newAcademic = new academic({
      title,
      description,
      category,
      ImageUrl:imageUrl
    })
     newAcademic.save()
    res.status(200).json(newAcademic)
    console.log(req.body);
    
   } catch (error) {
      if (error.code === 11000) {
         res.status(409).json({message:"Academic already exists!"})
      }else{
    res.status(500).send("Error in Post Academic Controller :" + error)
    console.log(error);
      }
}
   }

// Updating Academic

export const updateAcademic = async(req,res)=>{
   try {
     const UpdatedAcademic = await academic.updateOne({_id:req.params.id},{
        title:req.body.name,
        description:req.body.description,
        category:req.body.info,

     })
     updateacademic.save()
    res.status(200).json(UpdatedAcademic)
   } catch (error) {
    res.status(500).send("Error in update Academic Controller")
   }
}

// Update using patch
export const UpdateSpecific = async(req,res)=>{
   try {
      const Id = req.params.id;
    const {title,description,category,ImageUrl} = req.body;
    const findacademic = academic.findOneAndUpdate(Id)
   } catch (error) {
      console.log("Error in Academic patch controller" + error);
      res.status(500).json({error:error})
   }
}

//Deleting Academic

export const deleteAcademic = async(req,res)=>{
   try {
      await academic.deleteOne({_id:req.params.id})
    res.status(200).json({message:"Successfully Deleted"})
   } catch (error) {
   console.log(error)
   res.status(500).send("Error in Delete Academic Controller")
}
}