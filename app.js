var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var passport = require("passport");
var cors = require("cors");
var db = require("./services/mongo");
var session = require("express-session");

require("./middleware/passport");

var shopRouter = require("./routes/shopRoutes");
var usersRouter = require("./routes/usersRoutes");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
  })
);
app.use(express.static(path.join(__dirname, "public")));
app.use(cors({ credentials: true, origin: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/", shopRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  if (err.name === "UnauthorizedError") {
    res.status(401);
    console.log("err", err);
    // res.json({ message: err.name + ": " + err.message });
  }
  // render the error page
  res.status(err.status || 500);
  console.log("err", err);
});

module.exports = app;
