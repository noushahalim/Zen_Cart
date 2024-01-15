const mongoose=require('mongoose')

mongoose.connect("mongodb://localhost:27017/ZenCart")
.then(()=>{
    console.log("mongoDB connected for CartProductDatas");
})
.catch(()=>{
    console.log("Failed to Connect to mongoDB");
})

const cartProductSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    productId:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    }
})


const collection=new mongoose.model("cartProductDatas",cartProductSchema)

module.exports=collection