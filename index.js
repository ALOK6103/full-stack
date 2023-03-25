const express=require("express")
const {userRouter}=require("./routes/user.router")
const app=express()
const {connection}=require("./db")
const {auth}=require("./middleware/auth.middleware")
const {noteRouter}=require("./routes/note.router")
require("dotenv").config()
const cors=require("cors")
app.use(express.json())
app.use(cors())

app.use("/users",userRouter)

app.use(auth)
app.use("/notes",noteRouter)

app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("connected")
    } catch (error) {
       console.log(error) 
    }
})