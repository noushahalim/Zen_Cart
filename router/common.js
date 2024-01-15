const express=require('express')
const router=express.Router()
const multer  = require('multer')
const storage = require('../middleware/multer')
const upload = multer({ storage: storage })
const commonController=require('../controller/commonController')


//field to direct '/' to home

router.get('/',commonController.localRouter)

//Fields to Controll login page

router.get('/login',commonController.loginGet)
router.post('/login',commonController.loginPost)

//Fields to Controll SignUP page

router.get('/signUp',commonController.signUpGet)
router.post('/signUp',commonController.signUpPost)

//Field to controll logout

router.get('/logout',commonController.logoutGet)

//Fields to Controll Profile

router.get('/profile',commonController.profileGet)
router.get('/profile/edit',commonController.profileEditGet)
router.post('/profile/edit',upload.single('profileImage'),commonController.profileEditPost)


module.exports=router