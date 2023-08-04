const router=require("express").Router()
const QuestionCollection=require("../Models/Qusetion")



router.post("/add",async(req,res)=>{
    const newquestion=new QuestionCollection({Question:req.body})
    const saveddata=await newquestion.save()
    if(saveddata)
    res.send(saveddata)
    else
    res.send("An Error Occured")
})


module.exports=router