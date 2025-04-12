import dotenv from 'dotenv'
import express from 'express'
import connectDB from './Database/connectDb.js';
import cors from 'cors'
import authRoutes from './routes/FarmsnapAppRoutes/authRoutes.js'
import productRoutes from './routes/FarmsnapAppRoutes/productRoutes.js'
import adminRoutes from './routes/FarmsnapAppRoutes/adminRoutes.js'
import shipmentRoutes from './routes/FarmsnapAppRoutes/shipmentRoutes.js'
import chatBotRoutes from './routes/FarmsnapAppRoutes/chatBotRoutes.js'
import CartRoutes from './routes/FarmsnapAppRoutes/cartProduct.js'
import { v2 as cloudinary } from "cloudinary"; 
import cookieParser from "cookie-parser";
import path from 'path';
dotenv.config()




import messageRoutes from './routes/FarmsnapChatAppRoutes/messageRoutes.js'
import { app,server } from './utils/socket.js';

const PORT = process.env.PORT || 8080
app.use(express.json({ limit: '50mb' })); 
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})

const __dirname = path.resolve(   )
app.use('/api/auth',authRoutes)
app.use('/api/product',productRoutes)
app.use('/api/admin',adminRoutes)
app.use('/api/shipment',shipmentRoutes)
app.use('/api/cart',CartRoutes)
app.use('/api/chatbot',chatBotRoutes)

app.use('/api/messages',messageRoutes)


if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname,'../frontend/dist ')))

  app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'../frontend','dist',"index.html"))
  })
}
server.listen(PORT,()=>{
    console.log(`Server is running at Port ${PORT}`);
    connectDB()
})
