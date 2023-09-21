const express= require("express")
const app= express()
const connection= require("./Config/db")
require("dotenv").config()

const {userRouter}=require("./Router/user")
const {bookRouter}=require("./Router/book")

app.use(express.json())

app.use(userRouter)
app.use(bookRouter)







app.listen(process.env,async()=>{
    try {
        await connection
        console.log("db is connected")
    } catch (error) {
        console.log("db is not connected")
        console.log(`http://localhost:${process.env.port}`)
        
    }
})