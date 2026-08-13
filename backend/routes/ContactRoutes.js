import express from "express"
import { getContact, postContact } from "../controller/contactController.js";

const router = express.Router();

router.get("/",getContact)
router.post("/",postContact)


export default router