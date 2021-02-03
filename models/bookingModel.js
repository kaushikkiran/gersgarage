const mongoose = require('mongoose');
const User = require('./../models/userModel');

//Create a booking schema
// Trying to use parent referencing.
/*  TEST CASE OF A BOOKING
    "bookedUser" : "test2@test.com",      //Should be referenced from Users
    "vehicleLicenceNumber" : "10D545481",
    "typeOfVehicle" : "car",
    "typeOfService": "Annual Service",
    "statusOfService" : "booked",
    "mechanicAssigned" : "mecha@test.com",     //Should be referenced from Users(based on employee role)
    "timeOfServiceAppointment" : "2021-02-04T11:00:00Z",
    "comments":"comment string test"
*/

const bookingSchema = new mongoose.Schema({
  bookedUser: {
    type: String,
    ref: 'user',
    required: [true, 'Booking must belong to a User!']
  },
  vehicleLicenceNumber: {
    type: String,
    required: [true, 'Vehicle license number is required']
  },
  typeOfVehicle: {
    type: String,
    required: [true, 'Type of Vehicle is required']
  },
  typeOfService: {
    type: String,
    enum: ["Annual Service", "Annual Repair", "Major Service", "Major Repair"],
    required: [true, 'Type of Service is required']
  },
  statusOfService: {
    type: String,
    // Different types of service status that revolve around the booking scenario
    enum: ["booked","inService","fixed","collected","scrapped"],
    required: [true, 'Status of service is required']
  },
  mechanicAssigned: {
    type: String,
    required: [true, 'A mechanic must be assigned ']
  },
  timeOfServiceAppointment:{
    type: String,
    //Date and time are included in the same date string
    //Use seperator to get the time and date accordingly
    required: [true, 'Date and Time for the booking must be assigned ']
  },
  comments:{
    type: String,
    required: [false, 'Comments are optional']
  }
});

const Booking = mongoose.model('Bookings', bookingSchema);

module.exports = Booking;
