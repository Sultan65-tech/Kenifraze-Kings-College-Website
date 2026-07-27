import express from "express"
import { deleteOneEvent, getEvent, postEvent, putEvent,deleteAllEvent, getOneEvent } from "../controller/eventController.js";

const router = express.Router();

router.get("/",getEvent)
router.post("/",postEvent)
router.delete("/",deleteAllEvent)

router.get("/:eventTitle",getOneEvent)
router.delete("/:eventTitle",deleteOneEvent)
router.put("/:eventTitle",putEvent)


export default router