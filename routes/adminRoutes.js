const express=require('express')
const admin_route=express()

const session=require("express-session")
const adiminAuth=require("../middileware/adminAuth")

admin_route.use(session({
    secret:"secret",
    resave:false,
    saveUninitialized:true
}))
admin_route.use(express.urlencoded({ extended: true }));

admin_route.set('view engine','ejs')
admin_route.set('views','./views/admin');

const adminController=require("../controllers/adminController")

admin_route.get('/',adiminAuth.isAdminlogout,adminController.loginAdmin)
admin_route.post('/',adminController.verifyAdmin)

admin_route.get('/addUsers',adiminAuth.isAdminlogin,adminController.addUsers)
admin_route.post('/addUsers',adiminAuth.isAdminlogin,adminController.addnewUser)

admin_route.get('/dashBoard',adiminAuth.isAdminlogin,adminController.loadHome)

admin_route.get('/searchUser',adiminAuth.isAdminlogin,adminController.searchUsers)


admin_route.get('/dashBoard',adminController.loadHome);
admin_route.get('/editUser',adiminAuth.isAdminlogin,adminController.editUser)
admin_route.post('/editUser',adiminAuth.isAdminlogin,adminController.updateUser)

admin_route.get('/adminLogout',adiminAuth.isAdminlogin,adminController.adminLogout)
admin_route.get('/deleteUser',adiminAuth.isAdminlogin,adminController.deleteUsers)

module.exports=admin_route 

