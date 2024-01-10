const productModel=require('../model/productDatas')


const deleteProductGet=async(req,res)=>{
    try{
        const id=req.params.productId
        const product= await productModel.findById(id)
        
        if(!product){
            console.log('Product not found');
        }
        else{
            await productModel.findByIdAndDelete(id);
            console.log('Product deleted successfully')
            res.redirect('/home')
        }

    }
    catch(error){
        console.log('error when delete product',error.message);
    }
}


module.exports={deleteProductGet}