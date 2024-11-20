
const User =require("../models/userModel")
const bcrypt=require('bcrypt')
const randomstring = require('randomstring');




const securepassword=async(password)=>{
    try {
      const passwordHash= await bcrypt.hash(password,10)
      return passwordHash

    } catch (error) {
        console.log(error.message);
        
    }
}


// login admin

const loginAdmin= async (req,res)=>{
    try {

      
        res.render('adminLogin')
      
    } catch (error) {
        console.log(error.message);
  
    }
}

const verifyAdmin= async (req,res)=>{
    try {

        
        
        const EmailA=req.body.email
        const PasswordA=req.body.password

        const userdata = await User.find();
        const adminData=await User.findOne({email:EmailA})
        // console.log("admin:",adminData)

        
        if(adminData){
            const passwordMatchA =await bcrypt.compare(PasswordA, adminData.password);

            if(passwordMatchA){ 
                if(adminData.is_admin===true){

                    req.session.admin = adminData._id;
                    res.render('dashBoard',{
                        users:userdata
                    })
                }else{
                    res.render('adminLogin',{ message: "Your account is not verified." })
                }
            }else{
                res.redirect('adminLogin',{message:"email and password is incorrect"})
            }
        }else{
            res.redirect('adminLogin',{message:"email and password is incorrect"})
        }

    } catch (error) {
        console.log(error.message);
        
    }
}


//dashboard login

const loadHome=async(req,res)=>{
    try {
        
        const userData=await User.find({is_admin:0})

        res.render('dashBoard',{users:userData});

       

    } catch (error) {
        console.log(error.message)
        
    }
}

//add user

const addUsers=async (req,res)=>{
   
    try {
        res.render("addUser")
    } catch (error) {
        console.log(error.message);
        
    }
}  

const addnewUser=async(req,res)=>{
    try {
       console.log('add new user')
        const name=req.body.username
        const email=req.body.email
        const password = randomstring.generate(8);
        
        const spassword=securepassword(password)

        const user=new User({
            name:name,
            email:email,
            password:spassword,
            username:name,
            password:password,
            is_admin:false
        })

        const userData=await user.save()
        console.log(userData);
        
        if(userData){
          
            res.redirect('/admin/dashboard')
        }else{
            res.render('addUser',{messgae:'something wrong'})
        }

    } catch (error) {
        console.log(error.message);
        res.render('addUser',{messgae:'something wrong'})
        
    }
}



//EDIT user

const editUser=async(req,res)=>{
    try {
       const id=req.query.id
      const userDetails=await User.findById({_id:id})
         if(userDetails){
            res.render('editUser',{user:userDetails});
         }else{
            res.redirect('/admin/dashBoard');
         }
        
    } catch (error) {
        console.log(error.message)
        
    }
}
//edit user save

const updateUser = async (req, res) => {
    try {
        const userId = req.query.id;
        console.log(userId)
        const updatedData = {
            username: req.body.username,
            email: req.body.email,
        };
        const user = await User.findByIdAndUpdate(userId, { $set: updatedData }, { new: true });

        
        if (!user) {
            return res.status(404).send('User not found');
        }

        res.redirect('/admin/dashboard'); // Redirect to dashboard after successful update
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Error updating user');
    }
};




// delete users

const deleteUsers = async (req, res) => {
    try {
        const id = req.query.id; // Get the user ID from query parameters

        const result = await User.deleteOne({ _id: id });
    
        res.status(200).send('User deleted successfully'); // Send success response
    } catch (error) {
        console.error(error.message);
       
    }
};

//serach user and email

const searchUsers = async (req, res) => {
    try {
        const searchQuery = req.query.query;
        console.log(searchQuery);

        const searchUserData = await User.find({
            $or: [
                { username: { $regex: searchQuery, $options: 'i' } },
                { email: { $regex: searchQuery, $options: 'i' } }
            ],
            is_admin: 0
        });
        
        console.log(searchUserData);
        res.render('dashBoard', { title: 'User Search Results', users: searchUserData })
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Error retrieving search results');
    }
};

const adminLogout = async (req, res) => {
    try {
        req.session.admin=null
      
            res.redirect('/admin');
    } catch (error) {
        console.log(error.message);
    }
};

module.exports={
  loadHome,
  verifyAdmin,
  loginAdmin,
  addUsers,
  editUser,
  deleteUsers,
  updateUser,
  addnewUser,
  searchUsers,
  adminLogout
}