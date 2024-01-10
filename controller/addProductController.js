const productDatas=require('../model/productDatas')


const addProductGet=(req,res)=>{
    res.render('addProduct')
}

const addProductPost=async(req,res)=>{

    const path='images/upload/'+req.file.filename
    const data=new productDatas({
        productName:req.body.productName,
        productPrice:req.body.productPrice,
        productDescription:req.body.productDescription,
        imagePath:path
    })
    await data.save() 
        
    res.redirect('/home')
}


module.exports={addProductGet,addProductPost}