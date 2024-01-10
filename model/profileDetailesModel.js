const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/ZenCart")
.then(()=>{
    console.log("mongoDB connected for profileDetails");
})
.catch(()=>{
    console.log("Failed to Connect to mongoDB");
})

const profileDetailsSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    number:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    imagePath:{
        type:String,
        required:true
    },
    userId:{
        type: mongoose.Types.ObjectId,
        required:true
    }
})

const collection=new mongoose.model("profileDetails",profileDetailsSchema)

module.exports=collection