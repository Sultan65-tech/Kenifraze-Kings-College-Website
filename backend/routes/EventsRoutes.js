import express from "express"
import { deleteOneEvent, getEvent, postEvent, putEvent,deleteAllEvent, getOneEvent } from "../controller/eventController.js";
import upload from "../middlewares/uploadMiddlewares.js"
const router = express.Router();
var uploadMiddleware = upload.single("image"); // Use the same field name as in your form
router.get("/",getEvent)
router.post("/",uploadMiddleware,postEvent)
router.put("/:eventTitle",uploadMiddleware,putEvent)
router.delete("/",deleteAllEvent)

router.get("/:eventTitle",getOneEvent)
router.delete("/:eventTitle",deleteOneEvent)


export default router