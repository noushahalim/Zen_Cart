const mongoose = require('mongoose')

// const userDatas=require('../model/userDatas')

mongoose.connect("mongodb://localhost:27017/ZenCart")
.then(()=>{
    console.log("mongoDB connected for ProductDatas");
})
.catch(()=>{
    console.log("Failed to Connect to mongoDB");
})

const productSchema=new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    productPrice:{
        type:Number,
        required:true
    },
    productDescription:{
        type:String,
        required:true
    },
    imagePath:{
        type:String,
        required:true
    }
})

const collection=new mongoose.model("ProductDatas",productSchema)

module.exports=collection