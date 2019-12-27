var mongoose = require("mongoose");

var schema = mongoose.Schema;

var ProductModel = new schema({
  name: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "categories" },
  price: Number,
  picture: String
});

module.exports = mongoose.model("products", ProductModel);
