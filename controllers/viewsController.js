const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getLoginPage = (req, res) => {
  res.status(200).render('login', {
    title: 'Login Page'
  });
};

exports.getSignupPage = (req, res) => {
  res.status(200).render('signup', {
    title: 'Signup Page'
  });
};

exports.getHomePage = (req, res) => {
  res.status(200).render('home', {
    title: 'Home Page'
  });
};

exports.getBookingForm = (req, res) => {
  res.status(200).render('addBooking', {
    title: 'Add a booking'
  });
};