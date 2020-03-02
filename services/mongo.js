var mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://pasaf1:08shay03@ecommerceapp-bckac.mongodb.net/EcommerceApp?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("connected to mongoDB");
});

module.exports = db;

// // mongodb+srv://pasaf1:<password>@ecommerceapp-bckac.mongodb.net/test?retryWrites=true&w=majority

// mongodb://localhost/ecommerceapp
