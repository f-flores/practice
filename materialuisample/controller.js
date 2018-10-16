// ==========================================================
//
// franchiseController.js
//
// ==========================================================

require("dotenv").config();

const db = require('../models');
const Franchise = require("../models/franchise");
const User = require('../models/user');

// Defining database authentication methods for Franchise model
module.exports = {
  findAll: function (req, res) {
    Franchise
      .find(req.query)
      .sort({userType: -1})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    Franchise
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findMembersByFranchiseId: function (req, res) {
    const franchiseId = req.params.id;
    Franchise
		  // Find franchise by its id
		  .findById(franchiseId)
		  // Specify that we want to populate the retrieved franchise with associated members
      .populate("members")
			.then(function(franchiseData) {
				// If no data were found, send back a 404
				if (!franchiseData) res.status(404).end();

				// If able to successfully find and associate franchise and its members, send back to client
				res.json(franchiseData);
			})
			.catch(function(err) {
				// If an error occurs, send it back to the client
				res.json(err);
			});    
  },
  create: function (req, res) {
    db
      .Franchise
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  // Assign user to franchise by email -- three possible outcomes
  // Email is not found in, Email belongs to other franchise, or
  // successfully assigned user
  update: function (req, res) {
    const {email, longName} = req.body;
    const franchiseId = req.params.id;
    console.log(`in franchiseController() update email: ${email}`);
    User
    .find({email: email})
    .then(dbUser => {
      if (dbUser.length === 0) {
        res.status(404).json({errMessage: "Email not found in our system. Please try again"});
      }
      const userFound = dbUser[0];
      if (userFound.franchise.length > 0) {
        res.status(400).json({errMessage: "Email belongs to other franchise."});
      }

      const userId = userFound._id;
      return User.findOneAndUpdate({_id: userId}, {$push: {franchise: franchiseId}, $set: {longName: longName} }, { new: true });
    })
    .then(function(updatedUser) {
      // If the User table was updated successfully, send it back to the client
      res.json(updatedUser);
    })
    .catch(err => { 
      res.statusMessage = err; 
      res.status(422).end();
    });
  },
  // update franchise field
  updateItem: function(req, res) {
    const franchiseId = req.params.id;
    const updateObj = req.body;
    Franchise
    .findOneAndUpdate({_id: franchiseId}, updateObj, {new: true})
    .then(dbFranchise => res.json(dbFranchise))
    .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db
      .Franchise
      .findById({_id: req.params.id})
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  addMember: function(req, res) {
    const {email, longName} = req.body;
    const franchiseId = req.params.id;
    let userId;
    console.log(`in franchiseController() update email: ${email}`);
    User
    .find({email: email})
    .then(dbUser => {
      if (dbUser.length === 0) {
        res.statusMessage = "Email not found in our system. Please try again"
        res.status(404).send(res.statusMessage);
      }
      const userFound = dbUser[0];
      console.log(`in franchiseController() userFound: ${userFound}`);
      if (userFound.franchise.length > 0) {
        res.statusMessage = "Email belongs to other franchise";
        res.status(422).send(res.statusMessage);
      } else {
        userId = userFound._id;
        return User.findOneAndUpdate({_id: userId}, {$push: {franchise: franchiseId}, $set: {longName: longName} }, { new: true });
      }
    })
    .then(function(updatedUser) {
      if (updatedUser !== "undefined") {
        console.log(`${JSON.stringify(updatedUser)}`);
        // If the User table was updated successfully, update Franchise collection
        return Franchise.findOneAndUpdate({_id: franchiseId}, {$push: {members: userId}}, {new: true});
      }
    })
    .then(function(updatedFranchise) {
      if (updatedUser !== "undefined") {
        console.log(`${JSON.stringify(updatedFranchise)}`);
        // If the Franchise table was updated successfully, send it back to the client
        res.json(updatedFranchise);
      }
    })
    .catch(err => { 
      res.statusMessage = err; 
      res.status(422).end();
    });
  },
  createItem: function(req, res) {
    Franchise
      .create(req.body)
      .then(function(dbFranchise) {
        // If a franchise was created successfully, find the associated Admin user and 
        // push the new Franchise _id 
        // to the franchise's array
        // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
        // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
        return User.findOneAndUpdate({_id: req.user._id}, { $push: { franchise: dbFranchise._id } }, { new: true });
      })
      .then(function(dbUser) {
        // If the User table was updated successfully, send it back to the client
        res.json(dbUser);
      })
      .catch(function(err) {
        // If an error occurs, send it back to the client
        res.json(err);
      });
  },
};