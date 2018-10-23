// ==========================================================
//
// userController.js
//
// ==========================================================

require("dotenv").config();

let CONSTS = require("../helpers/siteConstants");
const passport = require('passport');
const vlib = require("../helpers/validationFns");

const db = require('../models');
const User = require('../models/user');
const Franchise = require('../models/franchise');

var formidable = require("formidable");
var cloudinary = require("cloudinary");

cloudinary.config({
  "cloud_name": process.env.CLOUDINARY_NAME,
  "api_key": process.env.CLOUDINARY_API_KEY,
  "api_secret": process.env.CLOUDINARY_API_SECRET
});

// Defining database authentication methods for User table

module.exports = {
  findAll: function (req, res) {
    console.log(`findAll`);
    User
      .find(req.query)
      .sort({userType: -1})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    console.log(`req.user: ${req.user}`);
    User
      .findById(req.user._id)
      // Specify that we want to populate the retrieved franchise with employee and customer info
      .populate("franchise")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    db
      .User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    User
    .findOneAndUpdate({
      _id: req.params.id
    }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db
      .User
      .findById({_id: req.params.id})
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  createUser: function (req, res) {
    let signupSuccess = true,
    errorText = "";

    // check email validity
    if (vlib.validateEmail(req.body.email) === false) {
      errorText += "Please enter valid email.  "
      signupSuccess = false
    }

    // check password validity
    if (vlib.validatePassword(req.body.user_pw) === false) {
      errorText += "Please enter valid password. Must be at least " +
        CONSTS.MIN_PASSWORD_LENGTH +
        " characters long and have at least one digit and one alphabetic character.  "
      signupSuccess = false
    }

    // check if passwords match
    if (req.body.user_pw !== req.body.confirm_pwd) {
      errorText += "Passwords do not match. Please enter them again.  ";
      signupSuccess = false;
    }

    // first signup check
    if (!signupSuccess) {
      res.statusMessage = errorText;
      res.status(400).send({signupSuccess: errorText});
    }
    /* To create a new user */
    User
      .register(new User({username: req.body.user_name, email: req.body.email}), req.body.user_pw, function (err) {
        if (err) {
          console.log('Error while signing up user', err);
          return res.status(422).json({signupSuccess: err.message});
        }
        console.log('User signup successful.');
        res.json(true);
      });
  }
};
