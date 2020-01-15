var mongoose = require("mongoose");

var schema = mongoose.Schema;

var CartModel = new schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    dateCreated: Date,
    dateModified: Date,
    open: Boolean
  },
  { timestamps: true }
);

module.exports = mongoose.model("Carts", CartModel);
