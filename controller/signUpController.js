const userDatas=require('../model/userDatas')
const bcrypt = require('bcrypt')
const usernameRegex = /^[a-zA-Z0-9_-]{3,12}$/;
const emailRejex=/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const signUpGet=(req,res)=>{
    if(req.session.userName){
        res.redirect('/home')
    }
    else{
        res.render('signUp')
    }

}

const signUpPost=async (req,res)=>{

    const {userName,email,password}=req.body
    const existingUser = await userDatas.findOne({ email: req.body.email })


    if(userName==='' || email==='' || password===''){
        console.log('please fill all fields');
        res.redirect('/signUp')
    }
    else if(!usernameRegex.test(userName)){
        console.log('please check your username');
        res.redirect('/signUp')
    }
    else if(!emailRejex.test(email)){
        console.log('please check your email');
        res.redirect('/signUp')
    }
    else if(!passwordRegex.test(password)){
        console.log('please check your password');
        res.redirect('/signUp')
    }
    else if(existingUser){
        console.log('This email is already registered. Please use a different email.')
        res.redirect('/signUp')
    }
    else{
        const hashedPass = await bcrypt.hash(req.body.password,10)

        const data= new userDatas({
            userName:req.body.userName,
            email:req.body.email,
            password:hashedPass
        })
    
        await data.save() 
        
        res.render('login')
    }
}




module.exports={signUpGet,signUpPost}