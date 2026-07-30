import express from "express"
import {getInstructor ,postInstructor,putInstructor} from "../controller/instructorController.js"



const router = express.Router()


router.get("/",getInstructor)
router.post("/",postInstructor)
router.put("/:instructorname",putInstructor)


export default router