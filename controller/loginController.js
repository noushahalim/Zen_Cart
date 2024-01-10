const loginGet=(req,res)=>{
    if(req.session.userName){
        res.redirect('/home')
    }
    else{
        res.render('login')
    }
}

module.exports={loginGet}