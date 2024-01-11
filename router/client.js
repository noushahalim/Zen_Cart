const express=require('express')
const router=express.Router()
const clientController=require('../controller/clientController')


//Field to Controll user home page

router.get('/home',clientController.homeGet)


module.exports=router