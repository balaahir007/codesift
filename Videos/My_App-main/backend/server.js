const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/userRoutes'); 
const cors = require('cors');
const connectDB = require('./database/db');
const app = express();
const dotenv = require('dotenv')
dotenv.config()

app.use(cookieParser());
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173', 
  allowedHeaders: ['Content-Type', 'Authorization'], 
  credentials: true
}));

app.use('/api/auth', authRoutes);

app.listen(5000, () => {
  console.log('Server running on port 5000');
  connectDB()
});
