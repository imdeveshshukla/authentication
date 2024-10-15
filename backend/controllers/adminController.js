// controllers/adminController.js
const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');

const registerAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    const newAdmin = new Admin({ username, password });
    await newAdmin.save();

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering admin', error });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username,password);
    if(!username || !password)return res.status(404).json({message: 'Username or Password is null'});

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin._id, username: admin.username }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Error logging in', error });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
};
