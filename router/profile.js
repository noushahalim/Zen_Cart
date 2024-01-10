const express=require('express')
const router=express.Router()
const multer  = require('multer')
const storage = require('../middleware/multer')
const {profileGet,profileEditGet,profileEditPost}=require('../controller/profileController')

const upload = multer({ storage: storage })


router.get('/',profileGet)

router.get('/edit',profileEditGet)

router.post('/edit',upload.single('profileImage'),profileEditPost)


module.exports=router