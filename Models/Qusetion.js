const mongoose=require("mongoose")
const Qusetionschema=mongoose.Schema({
    Userid:String,
    Question:[]
})
module.exports=mongoose.model("QuestionSchema",Qusetionschema)