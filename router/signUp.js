const express=require('express')
const router=express.Router()
const {signUpGet,signUpPost}=require('../controller/signUpController')

router.get('/',signUpGet)
router.post('/',signUpPost)


module.exports=router