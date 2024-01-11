const productModel = require("../model/productModel");

//Fields to Controll user admin page

exports.homeGet = async (req, res) => {
  try {
    const productDatas = await productModel.find();

    if (req.session.admin) {
      res.render("admin/adminHome", { productDatas });
    } else if (req.session.userName) {
      res.redirect("/client/home");
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    console.log("Error n homeGet", error.message);
  }
};


//Fields to Controll Add product

exports.addProductGet=(req,res)=>{
  res.render('admin/addProduct')
}

exports.addProductPost=async(req,res)=>{

  const path='images/upload/products/'+req.file.filename
  const data=new productModel({
      productName:req.body.productName,
      productPrice:req.body.productPrice,
      productDescription:req.body.productDescription,
      imagePath:path
  })
  await data.save() 
      
  res.redirect('/admin/home')
}


//Fields to Controll Delete product

exports.deleteProductGet=async(req,res)=>{
  try{
      const id=req.params.productId
      const product= await productModel.findById(id)
      
      if(!product){
          console.log('Product not found');
      }
      else{
          await productModel.findByIdAndDelete(id);
          console.log('Product deleted successfully')
          res.redirect('/admin/home')
      }

  }
  catch(error){
      console.log('error when delete product',error.message);
  }
}


//Field to Controll Edit product

exports.editProductGet=async(req,res)=>{
  try{
      const id=req.params.productId
      const product= await productModel.findById(id)
      
      if(!product){
          console.log('Product not found');
      }
      else{
          res.render('admin/editProduct',{product})
      }

  }
  catch(error){
      console.log('error when edit product',error.message);
  }
}


exports.editProductPost=async(req,res)=>{
  const id=req.params.id
  const product= await productModel.findById(id)
  if(!product){
      console.log('Product not found');
  }
  else{
      const {productName,productPrice,productDescription}=req.body
      const productId=product._id

      try{
          const updatedProduct = await productModel.findByIdAndUpdate(productId, {
              $set: {
                  productName: productName,
                  productPrice: productPrice,
                  productDescription: productDescription
              }
          });


          if (req.file) {
              const path = 'images/upload/products/' + req.file.filename;
              updatedProduct.imagePath = path;
              await updatedProduct.save();
          }

          res.redirect('/admin/home');
      }
      catch(error){
          console.log('Error updating product:', error.message);
      }
  }
}