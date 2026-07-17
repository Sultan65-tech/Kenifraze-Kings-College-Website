require("dotenv").config()
const express = require("express")
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

const app = express();

app.use(express.json())

app.get("/test",(req,res)=>{
    res.send("Hey there")
})

app.post("/test", async(req,res)=>{
   try {
     const {amount} = req.body;
     
     const paymentIntent = await stripe.paymentIntents.create({
        amount:amount,
        currency : "usd",
        automatic_payment_methods:{
            enabled:true
        }
    })
        res.status(200).json({clientSecret: paymentIntent.client_secret})

   } catch (error) {
  console.log("Stripe Error",error.message);
  res.status(500).json({error:error.message})      
   }
})

app.listen(3000,()=>{
    console.log("Server Is up and Running!!!")
});
