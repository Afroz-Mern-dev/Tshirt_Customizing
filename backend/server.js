const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: 'https://tshirt-customizing-1.onrender.com',
  credentials: true,
}));

app.use(express.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '20mb' }));
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Routes
const authRoutes = require('./Routes/authRoutes');
const orderRoutes = require('./Routes/orderRoutes');

app.use('/api/auth', authRoutes);
app.use("/api/orders", orderRoutes);

app.get('/api/auth/verify', (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Not authenticated' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    res.status(200).json({ authenticated: true, user: decoded });
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
});

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
