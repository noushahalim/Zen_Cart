const express=require('express')
const router=express.Router()
const {homeLogoutGet}=require('../controller/logoutController')

router.get('/',homeLogoutGet)


module.exports=router