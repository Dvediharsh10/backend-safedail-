const express=require('express');
const app=express();
const cookieParser = require("cookie-parser");
app.use(express.json());
const cors = require("cors");

require('dotenv').config();
const port=process.env.PORT || 3000;

app.use(cookieParser())

// importing routes and mounting 
const authRoutes=require('./routes/Auth')
const userRoutes=require('./routes/User')
const contactRoutes=require('./routes/Contact')
const adminRoutes=require('./routes/Admin')

app.use(cors({
  origin: "*", // or your frontend URL
  credentials: true
}));

app.use('/api/v1',authRoutes);
app.use('/api/v1/user',userRoutes)
app.use("/api/v1/contacts",contactRoutes)
app.use('/api/v1/admin',adminRoutes);

// activate 
app.listen(port,()=>{
    console.log(`App is running on port no. ${port}`);
})
app.get('/',(req,res)=>{
    res.send("This is Home page");
})
// connection with DB
const {DbConnect}=require('./config/databse')
DbConnect();