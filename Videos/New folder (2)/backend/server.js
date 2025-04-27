const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./database/db');
const authRoutes = require('./routes/userRoutes');
const cors = require('cors')
const cookieParser = require('cookie-parser');
dotenv.config();

const app = express();
connectDB();
app.use(
    cors({
      origin: 'http://localhost:5173',  
      allowedHeaders: 'Content-Type, Authorization',
    })
  );
app.use(express.json());
app.use(cookieParser())

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
