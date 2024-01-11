const express=require('express')
const dotenv=require('dotenv').config()
const session=require('express-session')
const nocache=require('nocache')

const common=require('./router/common')
const client=require('./router/client')
const admin=require('./router/admin')

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



app.use('/',common)
app.use('/client',client)
app.use('/admin',admin)



app.listen(port,()=>{
    console.log(`server started on ${port}`);
})