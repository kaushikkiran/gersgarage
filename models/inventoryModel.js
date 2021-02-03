const mongoose = require('mongoose');

//Create a inventory
/*  TEST CASE OF A Inventory
    "partName" : "tyre",
    "partQuantity" : 5,
    "partPrice" : 100    //Price is default set to euros in this case
*/
//The employees can alter or edit the inventory as a service is provided.
//This helps in keeping track of items quantity
//Admin can get the data of all parts that has to be restocked (running scripts or manual)

const inventorySchema = new mongoose.Schema({
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

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
