const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', viewsController.getLoginPage);
router.get('/login', authController.isLoggedIn, viewsController.getLoginPage);
router.get('/signup', viewsController.getSignupPage);

router.get('/home', viewsController.getHomePage);
router.get('/addBooking', viewsController.getBookingForm);

//Needs work in authentication process before entering any page that requires authorization
// Problems faced - Infinite loop between login and home page
//router.get('/home', authController.isLoggedIn, viewsController.getHomePage);

module.exports = router;
