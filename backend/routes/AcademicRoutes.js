import express from "express"
import { deleteAcademic, getAcademic,getOneAcademic, postAcademic, updateAcademic } from "../controller/academicController.js"
const router = express.Router()

router.get("/",getAcademic)
router.get("/:academicTitle",getOneAcademic)
router.post("/",postAcademic)
router.put("/:academicTitle",updateAcademic)
router.delete("/:academicTitle",deleteAcademic)

export default router