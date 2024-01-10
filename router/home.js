const express=require('express')
const router=express.Router()
const {homePost,homeGet}=require('../controller/homeController')

router.get('/',homeGet)
router.post('/',homePost)

module.exports=router