const mongoose = require("mongoose");
// Will add the Currency type to the Mongoose Schema types
require('mongoose-currency').loadType(mongoose);
require('mongoose-type-url');
const Schema = mongoose.Schema;
const Currency = mongoose.Types.Currency;
const Url = mongoose.SchemaTypes.Url;

const rentalSchema = new Schema({
  itemName: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  // eventually include picture of product
  // picture: {}....
  imgUrl: {
    type: Url,
    default: 'https://res.cloudinary.com/dtjbjbvwl/image/upload/v1527115314/xltjbuemkvm8yp6vu9yp.png'
  },
  location: {
    type: String
  },
  price: {
    type: Currency,
    required: true
  },
  pickupTime: {
    type: Date
  },
  dropoffTime: {
    type: Date
  },
  startDate: {
    type: Date
  },
  endDate:  {
    type: Date,
  },
  date: { 
    type: Date,
    default: Date.now()
  },
  category: {
    type: String
  },
  contactNumber: {
    type: String
  },
	// The ref property links these ObjectIds to the User model
	"postedBy": [
		{
			// Store ObjectIds in the array
			type: Schema.Types.ObjectId,
			// The ObjectIds will refer to the ids in the User model
			ref: "User"
		}
  ],
	// The ref property links these ObjectIds to the User model
	"rentedBy": [
		{
			// Store ObjectIds in the array
			type: Schema.Types.ObjectId,
			// The ObjectIds will refer to the ids in the User model
			ref: "User"
		}
  ],

  // `comments` is an array that stores ObjectIds
	// The ref property links these ObjectIds to the Comments model
	// This allows us to populate the Rental with any associated Comments
	"comments": [
		{
			// Store ObjectIds in the array
			type: Schema.Types.ObjectId,
			// The ObjectIds will refer to the ids in the Note model
			ref: "Comments"
		}
	]
});

const Rental = mongoose.model("Rental", rentalSchema);

module.exports = Rental;