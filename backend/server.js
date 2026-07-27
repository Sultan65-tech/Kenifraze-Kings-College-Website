import express from "express"
const app = express()

import bcrypt from "bcrypt"

app.use(express.json())

const users = [
    {
  "name":"David",
  "password":"Sultan204"
}
]

app.get("/users",async(req,res)=>{
    // res.send(users)
    const my_password = "Sultan204"
    const Ischeck = console.log(await bcrypt.compare(my_password,"$2b$10$RZdrO52HrBlCKBfvJQCFK.LBq6tEzZ2YSieidf6rAdt.wweN5w3dC"));
    if (!Ischeck) {
      res.json({message:"Successfully Logged in"})  
    } else {
        res.json({message:"Not Allowed"})
    }
    
    //   const Check_password = await bcrypt.compare(,"mubarak112")
})



app.post("/api/register",async(req,res)=>{
   try {
    // const {username,password} = req.body;
    const hashedPassword = await bcrypt.hash(req.body.password,10)
    const user = {name:req.body.name,password:hashedPassword}
//    const salt = await bcrypt.genSalt();
 users.push(user)
 res.status(201).json(users);
   } catch (error) {
    res.status(400).send("Error Creating User",error)
   }
})


app.post("/api/login",async(req,res)=>{
//  Find the User by it username
const user = users.find(user =>user.name === req.body.name)
console.log(user);

if (user == null) {
    res.status(400).json({message:"Incorrect Name or password"})
}
console.log(req.body.password);

try {
    if (await bcrypt.compare(req.body.password,user.password )) {
        res.send("Success")
    } else {
        res.send("Not Allowed")
    }
} catch (error) {
 res.send("Error Logining",error)   
 console.log(error);
 
}
})


app.listen("5001",()=>{
    console.log("Server is up and running");
    
})