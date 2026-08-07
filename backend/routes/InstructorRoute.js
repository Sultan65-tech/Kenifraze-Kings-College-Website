import express from "express"
import {getInstructor ,postInstructor,putInstructor,patchInstructor,deleteInstructor} from "../controller/instructorController.js"
import upload from "../middlewares/uploadMiddlewares.js"


const router = express.Router()


router.get("/",getInstructor)
router.post("/",upload.single("ImageUrl"),postInstructor)
router.put("/:id",upload.single("ImageUrl"),putInstructor)
router.patch("/:id",upload.single("ImageUrl"),patchInstructor)
router.delete("/:id",deleteInstructor)


export default router