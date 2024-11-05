

const isAdminlogin=async(req,res,next)=>{
    try {
        if(req.session.admin){
           return next()
        }else{
            res.redirect("/admin")
        }
    } catch (error) {
        console.log(error.message);
        
    }
}

const isAdminlogout=async(req,res,next)=>{
    try {
        if(req.session.admin){
            res.redirect("/admin/dashboard")
        }else{

            next()
        }
        
    } catch (error) {
        console.log(error.message);
        
    }
}

// const isAdmin=async(req,res,next)=>{
//     if(req.session.admin){
//         next()
//     }else{
//         res.redirect("/admin")
//     }
// }

module.exports={
    // isAdmin,
    isAdminlogin,
    isAdminlogout
}