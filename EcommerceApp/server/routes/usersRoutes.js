var express = require("express");
var router = express.Router();

const UsersModel = require("../models/User");
const CartsModel = require("../models/Cart");
const OrdersModel = require("../models/Order");
const CartItemsModel = require("../models/CartItem");

/* GET users listing. */
router.post("/check", function(req, res, next) {
  console.log("req.body :", req.body.body);
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
  console.log("req.body :", req.body.body);
  UsersModel.create(
    {
      first_name: req.body.body.first_name,
      last_name: req.body.body.last_name,
      user_name: req.body.body.user_name,
      e_mail: req.body.body.e_mail,
      password: req.body.body.password,
      adress: {
        city: req.body.body.city,
        street: req.body.body.street
      },
      role: 0
    },
    (err, user) => {
      if (err) {
        console.error(err);
      }
      console.log("user :", user);
      res.send({ msg: "created" });
    }
  );
});

router.get("/getuser", function(req, res, next) {
  let user = req.session.user;
  console.log("req.session.user :", req.session.user);

  if (user === undefined) {
    res.send({ msg: "no user" });
    console.log("no user");
  } else {
    res.json({ user });
  }
});

router.post("/login", function(req, res, next) {
  console.log("req.body :", req.body.body.username);
  UsersModel.findOne({ user_name: req.body.body.username }, (err, user) => {
    if (err) {
      console.error(err);
    }
    console.log("user :", user);
    if (user === null) {
      res.json({ msg: "user name not registered" });
    } else {
      if (user.password == req.body.body.password) {
        let session = req.session;
        session.user = user;
        console.log("session :", session);
        res.json({ msg: "good credantials", user: user });
        console.log("session username:", session.user.user_name);
      } else {
        res.json({ msg: "wrong password" });
      }
    }
  });
});

router.get("/logout", function(req, res, next) {
  console.log("req.session", req.session);

  req.session.destroy();
  console.log("session destroyed");

  console.log("req.session", req.session);
  res.send({ msg: "user logged out" });
});

router.post("/getshopstatus", function(req, res, next) {
  console.log("req.body :", req.body.body);
  let userId = req.body.body;
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
            user: req.body.body,
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
            user: req.body.body,
            details: details
          });
        });
      }
    }
  });
});

module.exports = router;
