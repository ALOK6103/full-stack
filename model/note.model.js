const mongoose=require("mongoose")

const noteScehma=mongoose.Schema({
    title:String,
    body:String,
    sub:String,
    userID:String
},{
    versionKey:false
})

const NoteModel=mongoose.model("note",noteScehma)

module.exports={
    NoteModel
}