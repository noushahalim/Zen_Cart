const express=require('express')
const multer  = require('multer')
const router=express.Router()
const storage = require('../middleware/multer')
const {addProductGet,addProductPost}=require('../controller/addProductController')

const upload = multer({ storage: storage })


router.get('/',addProductGet)
router.post('/',upload.single('productImage'),addProductPost)



module.exports=router