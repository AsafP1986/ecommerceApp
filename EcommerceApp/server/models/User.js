var mongoose = require("mongoose");

var schema = mongoose.Schema;

var UserModel = new schema({
  first_name: String,
  last_name: String,
  user_name: String,
  e_mail: String,
  password: String,
  adress: {
    city: String,
    street: String
  },
  role: Number
});

module.exports = mongoose.model("users", UserModel);
