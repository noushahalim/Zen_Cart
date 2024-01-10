const userDatas=require('../model/userDatas')
const profileDetails=require('../model/profileDetailesModel')
const mongoose = require('mongoose')

const profileGet=async(req,res)=>{
    try{ 
        const usrname=req.session.userName
        const userData=await userDatas.findOne({userName:usrname})
        const profieDatas = await profileDetails.findOne({userId:userData._id})
        
        if(profieDatas){
         
          console.log(profieDatas.userId);
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

            res.render('profile',{userData,address:obj})

        }
        else{
            res.render('profile',{userData,address:''})
        }
           
}
    catch(error){
        console.log('error when getting profile',error.message);
    }
}








const profileEditGet=(req,res)=>{
    res.render('profileEdit')
}








const profileEditPost=async(req,res)=>{
    try{
        const usrname=req.session.userName
        const userData=await userDatas.findOne({userName:usrname})
        
        const userIdObject = new mongoose.Types.ObjectId(userData._id)

        const path='images/upload/'+req.file.filename

        // const data=new profileDetails({
        // name:req.body.name,
        // gender:req.body.gender,
        // number:req.body.number,
        // address:req.body.address,
        // imagePath:path,
        // userId:userIdObject
    
        // }
        // )
        // await data.save()
        await profileDetails.updateOne({ userId:userIdObject},
            {$set:
                {name:req.body.name,
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


module.exports={profileGet,profileEditGet,profileEditPost}