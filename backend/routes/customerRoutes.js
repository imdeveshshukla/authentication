const express = require('express');
const router = express.Router();
const {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer
} = require('../controllers/customercontroller');
const authMiddleware = require('../middleware/authMiddleware');

// Customer CRUD Routes
router.post('/', authMiddleware,createCustomer);               
router.get('/', getAllCustomers);               
router.get('/:id', getCustomerById);             
router.put('/:id', authMiddleware,updateCustomer);              
router.delete('/:id',authMiddleware, deleteCustomer);          

module.exports = router;
