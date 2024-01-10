const express=require('express')
const router=express.Router()
const {loginGet}=require('../controller/loginController')

router.get('/',loginGet)


module.exports=router