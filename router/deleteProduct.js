const express=require('express')
const router=express.Router()
const {deleteProductGet}=require('../controller/deleteProductController')


router.get('/:productId',deleteProductGet)

module.exports=router