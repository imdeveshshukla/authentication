require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const customerRoutes = require('./routes/customerRoutes');
const authRoutes = require('./routes/authRoutes');
const app = express();
const cors = require('cors')
connectDB();

app.use(express.json());
app.use(cors())

app.use('/api/customers', customerRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
