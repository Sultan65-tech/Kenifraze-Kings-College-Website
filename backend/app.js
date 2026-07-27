import express from "express"
const app = express();
import mongoose from "mongoose"
import EventsRoutes from "./routes/EventsRoutes.js"
import AcademicRoutes from "./routes/AcademicRoutes.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

import "dotenv/config"

app.use(express.json())
app.use("/api/admin/event",EventsRoutes)
app.use("/api/admin/academic",AcademicRoutes)






mongoose.connect(process.env.MONGO_URI).then(()=>{
  console.log("Mongodb Connected Successfully!!");
  app.listen(process.env.PORT,()=>{
      console.log("Server Is up and Running!!!")
  });
})

