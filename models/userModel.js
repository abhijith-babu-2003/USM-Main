const mongoose=require("mongoose")


 const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    is_admin: {
        type: Boolean,
        required: true,
    },
    is_Verified: {
        type: Boolean,
        default: true,
    }
})

module.exports=mongoose.model('User',userSchema);