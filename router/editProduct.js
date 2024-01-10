const express=require('express')
const router=express.Router()
const multer  = require('multer')
const storage = require('../middleware/multer')
const {editProductGet,editProductPost}=require('../controller/editProductController')

const upload = multer({ storage: storage })


router.get('/:productId',editProductGet)
router.post('/:id',upload.single('productImage'),editProductPost)


module.exports=router