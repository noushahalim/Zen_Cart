const userDatas=require('../model/userDatas')
const bcrypt=require('bcrypt')
const productModel = require('../model/productDatas')


const homeGet=async(req,res)=>{

try {

const productDatas = await productModel.find()


    if(req.session.password){
        res.render('adminHome',{productDatas})
    }
    else if(req.session.userName){
        res.render('userHome',{productDatas})
    }
    else{
        res.redirect('/')
    }
} catch (error) {
    console.log('Error n homeGet',error.message);
}



}



const homePost=async(req,res)=>{

    try{
        const check= await userDatas.findOne({userName:req.body.userName})

        const hashedPassword=check.password

        const pass= await bcrypt.compare(req.body.password,hashedPassword)
        
        if(pass){
            req.session.userName=check.userName
            if(check.roll==='admin'){
                req.session.password=check.password
                res.redirect('/home')
                console.log(`${check.userName} is logged as admin`);
            }
            else{
                res.redirect('/home')
                console.log(`${check.userName} is logged as user`);
            }
        }
        else{
            console.log('password is wrong');
            res.redirect('/')
        }
    }
    catch{
        console.log('user name is wrong');
        res.redirect('/')
    }
}

module.exports={homePost,homeGet}
