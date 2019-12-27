var mongoose = require("mongoose");

var schema = mongoose.Schema;

var CategoryModel = new schema({
  name: String
});

module.exports = mongoose.model("categories", CategoryModel);
