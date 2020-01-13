var mongoose = require("mongoose");
var crypto = require("crypto");
var jwt = require("jsonwebtoken");

var schema = mongoose.Schema;

var UserModel = new schema({
  first_name: String,
  last_name: String,
  user_name: String,
  e_mail: String,
  adress: {
    city: String,
    street: String
  },
  role: Number,
  hash: String,
  salt: String
});

UserModel.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  console.log("this.salt :", this.salt);
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
};

UserModel.methods.validPassword = function(password) {
  console.log("password from valid password in schema", password);
  console.log("this.salt from valid password in schema", this.salt);

  var hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
  return this.hash === hash;
};

UserModel.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign(
    {
      _id: this._id,
      first_name: this.first_name,
      last_name: this.last_name,
      user_name: this.user_name,
      e_mail: this.e_mail,
      adress: {
        city: this.adress.city,
        street: this.adress.street
      },
      role: this.role,
      exp: parseInt(expiry.getTime() / 1000)
    },
    "asss"
  );
};

module.exports = mongoose.model("users", UserModel);
