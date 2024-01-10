const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/ZenCart")
.then(()=>{
    console.log("mongoDB connected for User Datas");
})
.catch(()=>{
    console.log("Failed to Connect to mongoDB");
})

const signUpSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    roll:{
        type:String,
        required:true,
        default:'user'
    }
})

const collection=new mongoose.model("userDatas",signUpSchema)

module.exports=collection