var mongoose = require("mongoose");

var schema = mongoose.Schema;

var OrderModel = new schema(
  {
    cart: { type: mongoose.Schema.Types.ObjectId, ref: "carts" },
    bill: Number,
    shippingDetails: {
      s_city: String,
      s_street: String,
      s_date: Date
    },
    payedWith: String,
    dateCreated: Date,
    dateModified: Date
  },
  { timestamps: true }
);

module.exports = mongoose.model("orders", OrderModel);
