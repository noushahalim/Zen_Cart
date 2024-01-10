const homeLogoutGet=(req,res)=>{
    req.session.destroy()
    res.redirect('/')
}

module.exports={homeLogoutGet}