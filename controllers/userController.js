const User = require('../models/userModel');
const bcrypt=require("bcrypt")



const securepassword=async(password)=>{
    try {
      const passwordHash= await bcrypt.hash(password,10)
      return passwordHash

    } catch (error) {
        console.log(error.message);
        
    }
}



// Render registration page
const loadRegister = async (req , res) => {
    try {

      
        res.render('register');
    } catch (error) {
        console.log(error.message);
    }
};

// Insert user into the database
const insertUser = async (req, res) => {
    try {
        

        // Check if the email already exists
        const existingUser = await User.findOne({ email: req.body.email });

        if (existingUser) {
            return res.render('register', { message: "Email already exists." });
        }
       const spassword= await securepassword(req.body.password,)
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: spassword,
            is_admin: 0,
            
        });
        
        console.log(user)
        // Save the user in the database
        const userData = await user.save()

        if (userData) {
            
            res.render('login', { message: "Your registration has been successfully completed" });
        } else {
            res.render('register', { message: "Your registration has failed" });
        }
    } catch (error) {
        console.log(error.message)
        res.render('register', { message: "Your registration has failed" });
        
    }
};

//login user methods started

const loginLoad=async(req, res)=>{
    try {
    
        res.render('login')
    } catch (error) {
     console.log(error.message);
        
    }
}

const verifyLogin=async(req,res)=>{
    
    try {
        
        const Email = req.body.email
        const Password = req.body.password

      const userData= await User.findOne({email:Email})
        
      if(userData){
            
       const passwordMatch= await bcrypt.compare(Password,userData.password)
           if(passwordMatch){

            if(userData.is_Verified === true){ 
                req.session.user_id = userData._id
             res.redirect('/home')

            }else{
              
                res.render('login',{ message: "Your account is not verified." });
            }

           }else{
            res.render('login',{message:"email and password is incorrect"});
           }
        }else{
          
            res.render('login',{message:"email and password is incorrect"})

        }

    } catch (error) {
        console.log(error.message)
        
    }
}

const loadHome=async(req,res)=>{
    try {
        
        res.render('home');

    } catch (error) {
        console.log(error.message)
        
    }
}


const userLogout=async(req,res)=>{
    try {
        req.session.user_id=null;
        res.redirect('/')
    } catch (error) {
        console.log(error.message);
        
    }
}

module.exports = {
    loadRegister,
    insertUser,
    loginLoad,
    verifyLogin,
    loadHome,
    userLogout
    
}
