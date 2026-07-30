import express from "express"
const app = express()
import jwt from "jsonwebtoken"
import dotenv from "dotenv/config"
app.use(express.json())

const posts = [
    {
        username:"Sultan",
        title:"Post 1"
    },
    {
        username:"James",
        title:"Post 2"
    }
]

app.get("/posts",authenticateToken,(req,res)=>{
    res.status(200).json(posts.filter(post=> post.username === req.user.name))
})

app.post("/login",(req,res)=>{
    const username = req.body.username;
     const user = {name: username}
    const accessToken =    jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)
     res.json({accessToken: accessToken})
})

function authenticateToken(req,res,next){
const authHeader = req.headers['Authorization']
const token = authHeader && authHeader.split(" ")[1]
if (token == null ) res.sendStatus(401) 

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user) =>{
        if (err)return res.sendStatus(403) 
            req.user = user
        next( )
    })
}



app.listen("5001",()=>{
    console.log("Server is up and running");
    
})