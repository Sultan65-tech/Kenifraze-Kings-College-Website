import express from "express"
const app = express();
import mongoose from "mongoose"
import EventsRoutes from "./routes/EventsRoutes.js"
import AcademicRoutes from "./routes/AcademicRoutes.js"
import InstructorRoutes from "./routes/InstructorRoute.js"
import PaymentRoutes from "./routes/PaymentRoutes.js"
import "dotenv/config"

import cors from "cors"

 app.use(express.json())
 app.use(cors())
app.use("/api/admin/event",EventsRoutes)
app.use("/api/admin/academic",AcademicRoutes)
app.use("/api/admin/instructor",InstructorRoutes)
app.use("/api/payment",PaymentRoutes)







mongoose.connect(process.env.MONGO_URI).then(()=>{
  console.log("Mongodb Connected Successfully!!");
  app.listen(process.env.PORT,()=>{
      console.log(`Server Is running on port http://localhost:${process.env.PORT}`)
  });
})

