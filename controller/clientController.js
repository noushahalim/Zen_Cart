const productModel = require("../model/productModel");
const userModel= require("../model/userModel")
const cartProductModel=require("../model/cartProductModel")

//Fields to Controll user home page

exports.homeGet = async (req, res) => {
  try {
    const productDatas = await productModel.find();

    if (req.session.admin) {
      res.redirect("/admin/home");
    } else if (req.session.userName) {
      res.render("client/userHome", { productDatas });
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    console.log("Error n homeGet", error.message);
  }
};


//Field to Controll Cart

exports.cartGet=async(req,res)=>{
  if(req.session.userName){ 
    try{
      const user=await userModel.findOne({userName:req.session.userName})
      const cart=await cartProductModel.find({userId:user._id})
      const productIds=cart.map(cartItem=>cartItem.productId)
      const products=await productModel.find({_id:{$in:productIds}})
  
  
      if(cart.length>0){
        res.render('client/cart',{cart,products})
      }
      else{
        res.render('client/cart',{cart:'',products:[]})
      }
    }
    catch(error){
      console.log('error while geting cartDatas',error.message);
    }
  }
  else{
      res.redirect('/login')
  }
  
}

//Field to Controll Cart

exports.addCartGet=async (req,res)=>{
  if(req.session.userName){ 
    try{
      const id=req.params.productId
      const product=await productModel.findById(id)
      const user=await userModel.findOne({userName:req.session.userName})
      const cart=await cartProductModel.findOne({userId:user._id,productId:product._id})
      if(cart){
        await cartProductModel.updateOne({userId:user._id,productId:product._id},
          {$set:{
            userId:user._id,
            productId:product._id,
            quantity:cart.quantity + 1
          }},
          {upsert:true})
      }
      else if(product){
        await cartProductModel.updateOne({userId:user._id,productId:product._id},
          {$set:{
            userId:user._id,
            productId:product._id,
            quantity:1
          }},
          {upsert:true})
      }
      else{
        console.log('product not found');
      }
      res.redirect('/client/home')
    }
    catch(error){
      console.log('error in add to cart',error.message);
    }
  }
  else{
      res.redirect('/login')
  }
  
}



exports.cartRemove=async(req,res)=>{
  if(req.session.userName){
    try{
      const id=req.params.cartId
      const cartProduct= cartProductModel.findById(id)
  
      if(!cartProduct){
        console.log('product not found in cart');
      }
      else{
        await cartProductModel.findByIdAndDelete(id)
        console.log('removed from cart');
        res.redirect('/client/cart')
      }
    }
    catch(error){
      console.log('error when remove from cart',error.message);
    }
  }
  else{
      res.redirect('/login')
  }
}