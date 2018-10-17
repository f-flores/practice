const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const franchiseSchema = new Schema({
  franchiseName: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  phoneNumber: {
    type: String,
    required: true
  },
  franchiseEmail: {
    type: String,
    required: true
  },
  date: { 
    type: Date,
    default: Date.now()
  },
	// `members` is an array that stores ObjectIds
	// The ref property links these ObjectIds to the User model
  // This allows us to populate a franchise with associated members
	"members": [
		{
			// Store ObjectIds in the array
			type: Schema.Types.ObjectId,
			// The ObjectIds will refer to the ids in the User model
			ref: "User"
		}
  ],
	// `customers` is an array that stores ObjectIds
	// The ref property links these ObjectIds to the Contact model
  // This allows us to populate a franchise with associated customers
	"customers": [
		{
			// Store ObjectIds in the array
			type: Schema.Types.ObjectId,
			// The ObjectIds will refer to the ids in the User model
			ref: "Contact"
		}
	]
});

const Franchise = mongoose.model("Franchise", franchiseSchema);

module.exports = Franchise;