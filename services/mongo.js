var mongoose = require("mongoose");

const url = process.env.MONGO_URL || 'mongodb+srv://pasaf1:o0tVCzlsrIAysF0F@ecommerceapp-bckac.mongodb.net/EcommerceApp?retryWrites=true&w=majority'
// 'mongodb://localhost/ecommerceapp' 
mongoose.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }

);
console.log('url', url)
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("connected to mongoDB");
});

module.exports = db;

// // mongodb+srv://pasaf1:<password>@ecommerceapp-bckac.mongodb.net/test?retryWrites=true&w=majority

// mongodb://localhost/ecommerceapp

// "mongodb+srv://pasaf1:<password>@ecommerceapp.bckac.mongodb.net/<dbname>?retryWrites=true&w=majority"