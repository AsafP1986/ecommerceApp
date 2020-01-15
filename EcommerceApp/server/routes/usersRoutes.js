var express = require("express");
var router = express.Router();

var passport = require("passport");
var mongoose = require("mongoose");
var jwt = require("express-jwt");
var auth = jwt({
  secret: "asss",
  userProperty: "payload"
});

const UsersModel = require("../models/User");
const CartsModel = require("../models/Cart");
const OrdersModel = require("../models/Order");
const CartItemsModel = require("../models/CartItem");

/* GET users listing. */
router.post("/check", function(req, res, next) {
  console.log("req.body :", req.body.username);
  UsersModel.findOne({ user_name: req.body.body }, (err, user) => {
    if (err) {
      console.error(err);
    }
    console.log("user :", user);
    if (user === null) {
      res.json({ msg: "user name avaliable" });
    } else {
      res.json({ error: "user name taken" });
    }
  });
});

router.post("/add", function(req, res, next) {
  console.log("req.body :", req.body.user);
  UsersModel.create(
    {
      first_name: req.body.user.first_name,
      last_name: req.body.user.last_name,
      user_name: req.body.user.user_name,
      e_mail: req.body.user.e_mail,
      adress: {
        city: req.body.user.city,
        street: req.body.user.street
      },
      role: 0
    },
    (err, user) => {
      if (err) {
        console.error(err);
      }
      user.setPassword(req.body.user.password);
      user.save(function(err) {
        var token;
        token = user.generateJwt();
        res.status(200);
        res.json({
          token: token,
          msg: "created"
        });
      });
    }
  );
});

router.post("/login", function(req, res, next) {
  passport.authenticate("local", function(err, user, info) {
    var token;
    console.log("user in passport", user);
    if (err) {
      console.log("// If Passport throws/catches an error");
      res.status(404).json(err);
      return;
    }
    if (user) {
      console.log("// If a user is found");
      token = user.generateJwt();
      res.status(200);
      res.send({
        token: token,
        msg: "good credantials"
      });
    } else {
      console.log("// If user is not found", info);
      res.send({ msg: info.message });
    }
  })(req, res, next);
});

router.get("/logout", function(req, res, next) {
  res.send({ msg: "user logged out" });
});

router.post("/getshopstatus", function(req, res, next) {
  console.log("req.body :", req.body.userId);
  let userId = req.body.userId;
  CartsModel.find({ user: userId }, (err, carts) => {
    if (err) {
      console.error(err);
    }
    console.log("docs from  :", carts);
    if (carts.length === 0) {
      res.send({ msg: "new user" });
    } else {
      let openCart = carts.filter(cart => {
        if (cart.open) {
          return cart;
        }
      });
      console.log("opencart :", openCart);
      if (openCart.length == 0) {
        let lastCart = carts.sort(function(a, b) {
          a = a.updatedAt;
          b = b.updatedAt;
          return a > b ? -1 : a < b ? 1 : 0;
        });
        console.log("lastCart :", lastCart);
        OrdersModel.find({ cart: lastCart[0]._id }, (err, docs) => {
          console.log("docs[0] :", docs[0]);
          let details = {
            id: docs[0]._id,
            date: docs[0].createdAt,
            price: docs[0].bill
          };
          res.send({
            msg: "user as no open cart",
            user: req.body.userId,
            details: details
          });
        });
      } else {
        var cartPrice = 0;
        CartItemsModel.find({ cart: openCart[0]._id }, "price", (err, docs) => {
          console.log("docs :", docs);
          if (docs.length == 0) {
            cartPrice = 0;
          } else {
            docs.map(doc => {
              console.log("doc :", doc);
              cartPrice += doc.price;
            });
          }
          console.log("cartPrice :", cartPrice);
          console.log("openCart._id :", openCart[0]._id);
          let details = {
            id: openCart[0]._id,
            date: openCart[0].updatedAt,
            price: cartPrice
          };
          console.log("details :", details);
          res.send({
            msg: "user as open cart",
            user: req.body.userId,
            details: details
          });
        });
      }
    }
  });
});

module.exports = router;
