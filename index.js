const mongoose=require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/userManagementSystem")

const nocache=require("nocache")

const express=require("express")
const app=express()


// for user routes
const userRoute=require('./routes/userRoutes')
const adminRoute=require('./routes/adminRoutes')


app.use(nocache())
app.use('/',userRoute)
app.use('/admin',adminRoute);

const PORT=3000
app.listen(PORT,()=>{
  console.log(`server is running http://localhost:${PORT}`);
  
})