const mongoose = require('mongoose');

//Create a Services 
/*  TEST CASE OF A services
    "typeOfService" : "engine oil change",             //This is mainly for the employees when reading the customer comments
    "partsRequired" : ["engineOil", "oil filter"]      // List of parts in the inventory will be listed here
*/
// During invoice generation this is easy for the system to map the items and give a Net Total
// ONLY the  admin will be able to handle the inventory data

const servicesSchema = new mongoose.Schema({
  partName: {
    type: String,
    required: [true, 'Part name is required']
  },
  partQuantity: {
    type: number,
    //Default value can be set to 0 if necessary
    required: [true, 'Part quantity is required']
  },
  partPrice: {
    type: number,
    required: [true, 'Part Price is required']
  }
});

const Services = mongoose.model('Services', servicesSchema);

module.exports = Services;
