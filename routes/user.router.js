const express=require("express")
const { UserModel } = require("../model/user.model")
const jwt = require('jsonwebtoken');
const userRouter=express.Router()
const bcrypt = require('bcrypt');
userRouter.post("/register",async(req,res)=>{

    const {email,pass,location,age}=req.body
    try {

    //  const user=new UserModel(req.body)
     
    // await user.save()
    // res.status(200).send({"msg":"Registration done"})



    bcrypt.hash(pass, 5, async(err, hash)=> {
        // Store hash in your password DB.

    const user=new UserModel({email,pass:hash,location,age})
     
    await user.save()
    res.status(200).send({"msg":"Registration done"})
    });
    } catch (err) {
        res.status(400).send({"msg":err.message})
    }

})

userRouter.post("/login",async(req,res)=>{
    const {email,pass}=req.body
    try {
        // const user=await UserModel.find({email,pass})
        // if(user.length>0){
        //     res.status(200).send({"msg":"login done","token":jwt.sign({ foo: 'bar' }, 'shhhhh')})
        // }else{
        //     res.status(200).send({"msg":"login failed"})
        // }


        const user=await UserModel.findOne({email})

        console.log(user)
        if(user){


            bcrypt.compare(pass, user.pass, (err,result)=> {

                if(result){
                    res.status(200).send({"msg":"login successful","token":jwt.sign({"userID":user._id},"masai")})
                }else{
                    res.status(400).send({"msg":"wrong credentials"}) 
                }

            })

        }

     
       } catch (err) {
           res.status(400).send({"msg":err.message})
       }
})


// userRouter.get("/details",(req,res)=>{
//     const token=req.headers.authorization
//     jwt.verify(token, 'shhhhh', function(err, decoded) {
//         decoded?res.status(200).send("user details"):res.status(400).send({"msg":"login required"})
//     });
// })

// userRouter.get("/moviedata",(req,res)=>{
//     const {token}=req.query
//     jwt.verify(token, 'shhhhh', function(err, decoded) {
//         decoded?res.status(200).send("movie"):res.status(400).send({"msg":"login required"})
//     });
// })

module.exports={
    userRouter
}