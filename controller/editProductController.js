const productModel=require('../model/productDatas')


const editProductGet=async(req,res)=>{
    try{
        const id=req.params.productId
        const product= await productModel.findById(id)
        
        if(!product){
            console.log('Product not found');
        }
        else{
            res.render('editProduct',{product})
        }

    }
    catch(error){
        console.log('error when edit product',error.message);
    }
}


const editProductPost=async(req,res)=>{
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
                const path = 'images/upload/' + req.file.filename;
                updatedProduct.imagePath = path;
                await updatedProduct.save();
            }

            res.redirect('/home');
        }
        catch(error){
            console.log('Error updating product:', error.message);
        }
    }
}


module.exports={editProductGet,editProductPost}