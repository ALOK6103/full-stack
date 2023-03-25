const mongoose=require("mongoose")

const userScehma=mongoose.Schema({
    email:String,
    pass:String,
    location:String,
    age:Number
},{
    versionKey:false
})

const UserModel=mongoose.model("user",userScehma)

module.exports={
    UserModel
}