const express=require('express')
const dotenv=require('dotenv').config()
const session=require('express-session')
const nocache=require('nocache')


const login=require('./router/login')
const signUp=require('./router/signUp')
const home=require('./router/home')
const addProduct=require('./router/addProduct')
const logout=require('./router/logout')
const deleteProduct=require('./router/deleteProduct')
const editProduct=require('./router/editProduct')
const profile=require('./router/profile')

const port=process.env.port||8080
const secret=process.env.secret
const app=express()

app.use(session({
    secret,
    resave: false,
    saveUninitialized: true
  }))
app.use(nocache());

app.use(express.static('./public'))
app.use(express.urlencoded({ extended: false }));

app.set('view engine','ejs')
app.set('views','./views')


app.use('/',login)
app.use('/signUp',signUp)
app.use('/home',home)
app.use('/logout',logout)
app.use('/addProduct',addProduct)
app.use('/deleteProduct',deleteProduct)
app.use('/editProduct',editProduct)
app.use('/profile',profile)
app.use('/profile/edit',profile)


app.listen(port,()=>{
    console.log(`server started on ${port}`);
})