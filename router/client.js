const express=require('express')
const router=express.Router()
const clientController=require('../controller/clientController')


//Field to Controll user home page

router.get('/home',clientController.homeGet)

//Field to Controll Cart

router.get('/cart',clientController.cartGet)

//Field to Controll Add Cart

router.get('/addCart/:productId',clientController.addCartGet)

router.get('/cartRemove/:cartId',clientController.cartRemove)

module.exports=router