const userDatas=require('../model/userModel')
const bcrypt = require('bcrypt')
const profileDetails=require('../model/profileDetailesModel')
const mongoose = require('mongoose')

const usernameRegex = /^[a-zA-Z0-9_-]{3,12}$/;
const emailRejex=/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


//Fields to Controll login page


exports.loginGet=(req,res)=>{
    if(req.session.userName){
        res.redirect('/client/home')
    }
    else{
        res.render('common/login')
    }
}


exports.loginPost=async(req,res)=>{

    try{
        const check= await userDatas.findOne({userName:req.body.userName})

        const hashedPassword=check.password

        const pass= await bcrypt.compare(req.body.password,hashedPassword)
        
        if(pass){
            req.session.userName=check.userName
            if(check.roll==='admin'){
                req.session.admin=true
                res.redirect('/admin/home')
                console.log(`${check.userName} is logged as admin`);
            }
            else{
                res.redirect('/client/home')
                console.log(`${check.userName} is logged as user`);
            }
        }
        else{
            console.log('password is wrong');
            res.redirect('/login')
        }
    }
    catch{
        console.log('user name is wrong');
        res.redirect('/login')
    }
}




//Fields to Controll SignUP page

exports.signUpGet=(req,res)=>{
    if(req.session.userName){
        res.redirect('/client/home')
    }
    else{
        res.render('common/signUp')
    }

}


exports.signUpPost=async (req,res)=>{

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
        
        res.redirect('/login')
    }
}



//Field to controll logout

exports.logoutGet=(req,res)=>{
    req.session.destroy()
    res.redirect('/login')
}


//Fields to Controll Profile

exports.profileGet=async(req,res)=>{
    try{ 
        const usrname=req.session.userName
        const userData=await userDatas.findOne({userName:usrname})
        const profieDatas = await profileDetails.findOne({userId:userData._id})

        if(profieDatas){
          const userFullData = await userDatas.aggregate([
                {
                    $match: {_id:profieDatas.userId }
                },
                {
                    $lookup: {
                        from: 'profiledetails',
                        localField: '_id',
                        foreignField: 'userId',
                        as: 'userDetails'
                    }
                } 
            ]);
            const obj = userFullData[0].userDetails[0]
            res.render('common/profile',{userData,address:obj})
        }
        else{
            res.render('common/profile',{userData,address:''})
        }    
}
    catch(error){
        console.log('error when getting profile',error.message);
    }
}



exports.profileEditGet=(req,res)=>{
    res.render('common/profileEdit')
}



exports.profileEditPost=async(req,res)=>{
    try{
        const usrname=req.session.userName
        const userData=await userDatas.findOne({userName:usrname})
        const userIdObject = new mongoose.Types.ObjectId(userData._id)
        const path='images/upload/profiles/'+req.file.filename

        await profileDetails.updateOne({ userId:userIdObject},
            {$set:
                {
                    name:req.body.name,
                    gender:req.body.gender,
                    number:req.body.number,
                    address:req.body.address,
                    imagePath:path,
                    userId:userIdObject}
                },
                {upsert:true}
                )
        console.log('successfully completed');
        res.redirect('/profile')
    }
    catch(error){
        console.log('Error when posting editProfile',error.message);
    }
}