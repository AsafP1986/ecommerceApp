var mongoose = require("mongoose");

var schema = mongoose.Schema;

var CartItemModel = new schema({
  cart: { type: mongoose.Schema.Types.ObjectId, ref: "carts" },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
  quantity: Number,
  price: Number
});

module.exports = mongoose.model("cartItems", CartItemModel);
