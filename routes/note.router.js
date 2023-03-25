const express=require("express")
const {NoteModel}=require("../model/note.model")
const noteRouter=express.Router()
const jwt = require('jsonwebtoken');
noteRouter.get("/",async(req,res)=>{

    const token=req.headers.authorization.split(" ")[1]
    const decoded=jwt.verify(token,"masai")
    try{
        if(decoded){
            const notes=await NoteModel.find({"userID":decoded.userID})
            res.status(200).send(notes)
        }
    } catch(err){
        res.status(400).send({"msg":err.message}) 
    }
})

noteRouter.post("/add",async(req,res)=>{

    try {
        const note=new NoteModel(req.body)
        await note.save()
        res.status(200).send({"msg":"new note added"})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

noteRouter.patch("/update/:noteID",async(req,res)=>{

    // const payload=req.body
    // const noteID=req.params.noteID

    // try {
    //     await NoteModel.findByIdAndUpdate({_id:noteID},payload)
    //     res.status(200).send({"msg":"note updated"})
    // } catch (error) {
    //     res.status(400).send({"msg":error.message})
    // }

    const {noteID} = req.params
    try {
      await NoteModel.findByIdAndUpdate({_id:noteID}, req.body);
      res.send({'msg':"edited successfully"});
    } catch (error) {
      res.send({ err: error });
    }

})

noteRouter.delete("/delete/:noteID",async(req,res)=>{

    // const token=req.headers.authorization.split(" ")[1]

    // const decoded=jwt.verify(token,"masai")
    // const {noteID}=req.params
    // const req_id=decoded.userID
    // const note=NoteModel.findOne({_id:noteID})
    // const userID_in_note=note.userID

    // try {
    //     if(req_id==userID_in_note){
    //         await NoteModel.findByIdAndDelete({_id:noteID})
    //     res.status(200).send({"msg":"new note deleted"})
    //     }else{
    //         res.status(400).send({"msg":"Not authorized"}) 
    //     }
    // } catch (error) {
    //     res.status(400).send({"msg":error.message})
    // }

    const {noteID} = req.params
  try {
   await NoteModel.findByIdAndDelete({_id:noteID});
    res.send({'msg':"deleted successfully"});
  } catch (error) {
    res.send({ err: error });
  }
})

module.exports={
    noteRouter
}