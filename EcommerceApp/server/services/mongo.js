var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/ecommerceapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("connected to mongoDB");
});

module.exports = db;
