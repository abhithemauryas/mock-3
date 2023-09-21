const AdminAuthorization=(req,res,next)=>{
    console.log(req.body)
    if(req.body.isAdmin==true){
        next()
    }else{
        return res.status(404).send({"msg":"You are not authorized as a admin"})
    }
}

module.exports={
   AdminAuthorization
}