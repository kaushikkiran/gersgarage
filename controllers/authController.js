const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

// Sign token with id and the configured value in the env file
const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

// Create a jwt token after a successful login
const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000    // The cookie is valid for 24hours
    ),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
  });

  // Remove password from output
  user.password = undefined;

  return res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      username : user.userName,
      userRole : user.userRole
    }
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  
  // Username in this case is an email ID associated with the user
  const newUser = await User.create({
    fullName: req.body.fullName,
    userName: req.body.userName,
    password: req.body.password,
    phoneNumber: req.body.phoneNumber,
    userRole: req.body.userRole
  });
  createSendToken(newUser, 201, req, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { userName, password } = req.body;
  //res.status(200).json({ status: 'success'});

  // 1) Check if email and password exist
  if (!userName || !password) {
    return next(new AppError('Please provide username  and password!', 400));
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOne({ userName }).select('+password');

  if (!user || !(password.valueOf() == user.password.valueOf() )) {
    return next(new AppError('Incorrect email or password', 401));
  }
  createSendToken(user, 200, req, res);
});

// Logout action - set the jwt token to logged out
exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  return res.status(200).json({ status: 'success' }.redirect("/"));
};

// This function verifies a few checks to make sure that the user is authenticated when accessing resources
// This function also be used as a middleware in other routes(if necessary)
exports.isLoggedIn = async (req, res, next) => {

  if (req.cookies.jwt) {
    console.log("cookie exists" +req.cookies.jwt);
    try {
      // 1) Verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // 2) Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      // There is a logged in user
      res.locals.user = currentUser;
      return next();
    } 
    catch (err) 
    {
      return next();
    }
  }
  else
  {
    //When trying to access website without the Token will result in redirecting to the index page or login
    return res.redirect("/");
  }
};