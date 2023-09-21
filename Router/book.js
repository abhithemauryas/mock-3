const express=require("express")

const bookRouter=express.Router()
const {bookModel}=require("../Models/book.model")
const {AdminAuthorization}=require("../Middlewares/adminAuthorizesion")
const {validator}=require("../Middlewares/loginvalidator")

bookRouter.use(validator)


bookRouter.post("/api/books",AdminAuthorization,async(req,res)=>{
    try {
        let {title, author, category,price, quantity}=req.body
        // if(!title || !author|| !category|| !price|| !quantity){
        //   console.log()
        //     res.status(401).send({"msg":"Provide all detaile for registring a book"})

        // }else

            const data= {title, author, category,price, quantity}
            const bookdata=bookModel(data)
            await bookdata.save()
            res.status(201).send({"msg":"book has been registered"})
        
    } catch (error) {
        console.log("error",error)
        res.status(500).send({"msg":error})
    }
})
bookRouter.get("/api/books",async(req,res)=>{
    try {
        let bookdata=await bookModel.find()
        res.status(200).send(bookdata)

    } catch (error) {
        console.log("error",error)
        res.status(500).send({"msg":error})
    }
})
bookRouter.get("/api/books/:id",async(req,res)=>{
    try {
        let id=req.params.id
       
        let bookdata=await bookModel.findById({_id:id})
        if(bookdata.length==0){
            res.status(409).send({"msg":"Id is not valide"})
        }else{
            res.status(200).send(bookdata)
        }
    } catch (error) {
        console.log("error",error)
        res.status(500).send({"msg": error})
    }
    
})

bookRouter.delete("/api/books/:id",AdminAuthorization,async(req,res)=>{
    try {
        let id = req.params.id
        let bookdata =await bookModel.findByIdAndDelete({_id:id})
        res.status(202).send({"msg":"Book has been deleted"})
    } catch (error) {
        console.log("error",error)
        res.status(500).send({"msg":error})
    }
})
bookRouter.patch("/api/books/:id",AdminAuthorization,async(req,res)=>{
    try {
        let id=req.params.id
        const updatedata=req.body
        let bookdata =await bookModel.findByIdAndUpdate({_id:id,updatedata})
        if(bookdata.length==0){
            res.status(409).send({"msg":"id is not valid"})
        }else{
            res.status(204).send({"msg":"Perticular book has been updated"})
        }
    } catch (error) {
        console.log("error",error)
        res.status(500).send({"msg":error})
    }
})


module.exports={
    bookRouter
}
