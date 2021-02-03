const mongoose = require('mongoose');
const validator = require('validator');

// creating the user schema with name, email, password, phone number
// userRole will be automatically assigned as customer
// Considering Admin and Employees account already exists

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Please tell us your name!']
  },
  userName: {
    // type: mongoose.SchemaTypes.ObjectId  
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    select: false
  },
  phoneNumber: {
    type: String,
    required: [true, 'Please provide a phone number!'],
    unique : true
  },
  userRole: {
    type: String,
    value: 'customer',
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;