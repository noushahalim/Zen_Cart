const express=require('express')
const router=express.Router()
const multer  = require('multer')
const storage = require('../middleware/multer')
const adminController=require('../controller/adminController')
const upload = multer({ storage: storage })


//Field to Controll admin home page

router.get('/home',adminController.homeGet)

//Field to Controll Add Product

router.get('/addProduct',adminController.addProductGet)
router.post('/addProduct',upload.single('productImage'),adminController.addProductPost)

//Field to Controll Delete Product

router.get('/deleteProduct/:productId',adminController.deleteProductGet)

//Field to Controll Edit product

router.get('/editProduct/:productId',adminController.editProductGet)
router.post('/editProduct/:id',upload.single('productImage'),adminController.editProductPost)



module.exports=router