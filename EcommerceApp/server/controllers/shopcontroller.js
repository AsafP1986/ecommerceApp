const db = require("../services/mongo");
const UserModel = require("../models/User");
const ProductModel = require("../models/Product");
const CategoryModel = require("../models/Category");
const CartModel = require("../models/Cart");
const CartItemModel = require("../models/CartItem");
const OrderModel = require("../models/Order");

var multer = require("multer");

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./public/uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

var OrderDates = [];

const upload = multer({ storage: storage }).any();

class shopController {
  static getStatus(req, res) {
    var NOU, NOP, NOO;
    UserModel.count({}, (err, count) => {
      if (err) throw err;
      console.log("Number of users: ", count);
      NOU = count;
      ProductModel.count({}, (err, count) => {
        if (err) throw err;
        console.log("Number of products: ", count);
        NOP = count;
        OrderModel.count({}, (err, count) => {
          if (err) throw err;
          console.log("Number of orders: ", count);
          NOO = count;
          res.send({ NOO, NOP, NOU });
        });
      });
    });
  }
  /****    products     ****/

  static getAllproducts(req, res) {
    console.log("get all products");
    ProductModel.find({})
      .populate("category")
      .exec(function(err, data) {
        if (err) throw err;
        res.send(data);
      });
  }
  static async addProduct(req, res) {
    if (req.payload.role != 1) {
      res.status(401).json({
        message: "UnauthorizedError: private profile"
      });
    } else {
      try {
        await upload(req, res, function(err) {
          console.log("req.body.image :", req.body.image);
          console.log("req.body.product", req.body.product);
          if (err instanceof multer.MulterError) {
            console.log("inside first error :", err);
            return res.status(500).json(err);
            console.log("upload error");
          } else if (err) {
            console.log("inside second error :", err);
            return res.status(500).json(err);
            console.log("upload error");
          }
          let t = JSON.parse(req.body.product);
          console.log("t :", t);
          const { name, category, price } = t;

          const picture = `uploads/${req.files[0].filename}`;
          console.log("name :", name);
          console.log("category :", category);
          console.log("price :", price);
          console.log("picture :", picture);

          console.log("req.files :", req.files);

          var p = new ProductModel({
            name: name,
            category: category,
            price: price,
            picture: picture
          });
          p.save((err, data) => {
            if (err) return console.error(err);
            res.json(data);
          });
        });
      } catch (error) {
        console.log("error:", error);
      }
    }
  }

  static async editProduct(req, res) {
    console.log("req.payload.role from edit :", req.payload.role);
    if (req.payload.role !== 1) {
      res.status(401).json({
        message: "UnauthorizedError: private profile"
      });
    } else {
      try {
        await upload(req, res, function(err) {
          console.log("req.body from edit product:", req.body);
          if (err instanceof multer.MulterError) {
            return res.status(500).json(err);
            console.log("upload error");
          } else if (err) {
            return res.status(500).json(err);
            console.log("upload error");
          }
          let req_files = req.files;
          let t = JSON.parse(req.body.product);
          if (req_files.length == 0) {
            var { id, name, category, price, picture } = t;
          } else {
            var { id, name, category, price } = t;
            var picture = `uploads/${req.files[0].filename}`;
          }

          console.log("t :", t);
          console.log("name :", name);

          var query = { _id: id };
          let product = {
            name: name,
            category: category,
            price: price,
            picture: picture
          };

          ProductModel.update(query, product, { upsert: true }, function(
            err,
            doc
          ) {
            if (err) return res.send(500, { error: err });
            return res.json({ msg: "Succesfully saved." });
          });
        });
      } catch (error) {
        console.log("error:", error);
      }
    }
  }

  /****    /products     ****/

  /****    categorise    ****/

  static getAllCategories(req, res) {
    console.log("get all categorise");
    CategoryModel.find(function(err, data) {
      console.log("data from get all categories", data);
      res.send(data);
    });
  }

  static addCategory(req, res) {
    const name = req.body.name;

    var c = new CategoryModel({
      name: name
    });
    c.save((err, data) => {
      if (err) return console.error(err);
      res.json(data);
    });
  }
  /****    /categorise     ****/

  /****   Cart     ****/

  static getCart(req, res) {
    var cartItems = [];
    var cart;
    let user = req.body.user;
    console.log("get cart for user :", user);

    CartModel.find({ user: user })
      .populate("user")
      .exec(function(err, data) {
        if (err) throw err;
        console.log("data :", data);
        if (data.length == 0) {
          var cart = new CartModel({
            user: user,
            open: true
          });
          cart.save((err, data) => {
            if (err) return console.error(err);
            console.log("data from cart after save :", data);
            res.send({
              msg: "got new cart",
              cart: [data],
              cart_items: cartItems
            });
          });
        } else if (data.length >= 1) {
          let opencart = data.filter(cart => {
            if (cart.open == true) {
              return cart;
            }
          });
          console.log("opencart :", opencart);
          if (opencart.length == 0) {
            var cart = new CartModel({
              user: user,
              open: true
            });
            cart.save((err, data) => {
              if (err) return console.error(err);
              console.log("data from cart after save :", data);
              res.send({
                msg: "got new cart",
                cart: [data],
                cart_items: cartItems
              });
            });
          } else {
            cart = opencart;
            console.log("cart :", cart);
            console.log("opencart :", opencart);
            CartItemModel.find({ cart: opencart[0]._id })
              .populate("product")
              .exec(function(err, data) {
                if (err) throw err;
                console.log("data :", data);
                cartItems = data;
                console.log("cartItems :", cartItems);
                res.send({
                  msg: "got cart",
                  cart: cart,
                  cart_items: cartItems
                });
              });
            console.log("cartItems :", cartItems);
          }
        }
      });
  }

  static refreshCart(req, res) {
    var cartId = req.body.cart;
    var cart;
    console.log("get cart id :", req.body.cart);
    CartModel.findOne({ _id: cartId })
      .populate("user")
      .exec(function(err, data) {
        if (err) throw err;
        console.log("data :", data);
        cart = data;
        CartItemModel.find({ cart: cartId })
          .populate("product")
          .exec(function(err, data) {
            if (err) throw err;
            console.log("data :", data);
            let cartItems = data;
            res.send({ msg: "got cart", cart: cart, cart_items: cartItems });
          });
      });
  }

  static emptyCart(req, res) {
    var cartId = req.body.cartId;
    CartItemModel.deleteMany({ cart: cartId }, (err, data) => {
      console.log("data from empty cart:", data);
      res.send({ msg: "cart emptyed " });
    });
  }

  /****    /Cart     ****/

  /****   Cart Items    ****/

  static getCartItems(req, res) {
    console.log("req.params :", req.params.cartid);
    CartItemModel.find({ cart: req.params.cartid })
      .populate("product")
      .exec(function(err, data) {
        if (err) throw err;
        console.log("data :", data);
        res.send(data);
      });
  }

  static newCartItem(req, res) {
    console.log("req.body from newcartitem :", req.body);
    var p = new CartItemModel({
      cart: req.body.cart,
      product: req.body.product,
      quantity: req.body.quantity,
      price: req.body.price
    });
    p.save((err, data) => {
      if (err) return console.error(err);
      console.log("data", data);
      res.json(data);
    });
  }
  static removeCartItem(req, res) {
    let itemId = req.body.body;
    console.log("item id :", itemId);

    CartItemModel.deleteOne({ _id: itemId }, function(err) {
      if (err) return handleError(err);
      console.log("item deleted");
      res.send({ msg: "item deleted" });
    });
  }
  /****    /Cart Items     ****/

  /****   Orders    ****/

  static unavaliableShippingDates(req, res) {
    let aggregation = OrderModel.aggregate(
      [{ $group: { _id: "$shippingDetails.s_date", myResult: { $sum: 1 } } }],
      (err, result) => {
        console.log("result of aggre", result);
        let unAvShippingDates = result.filter(date => {
          if (date.myResult >= 3) {
            return date._id;
          }
        });
        let dates = unAvShippingDates.map(each => {
          return each._id;
        });
        console.log("unAvShippingDates", dates);
        let fixedDates = dates.map(date => {
          console.log("typeof date", date.getMonth());
          let fixedDate = {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate()
          };
          return fixedDate;
        });
        console.log("fixedDates", fixedDates);
        res.send(fixedDates);
      }
    );
  }

  static newOrder(req, res) {
    console.log("req.body :", req.body);
    let shipDStr = `${req.body.shippingDetails.s_date.year}-${req.body.shippingDetails.s_date.month}-${req.body.shippingDetails.s_date.day}`;
    console.log("shipDStr :", typeof shipDStr);
    var o = new OrderModel({
      cart: req.body.cart,
      bill: req.body.bill,
      shippingDetails: {
        s_city: req.body.shippingDetails.s_city,
        s_street: req.body.shippingDetails.s_street,
        s_date: shipDStr
      },
      payedWith: req.body.payedWith
    });
    o.save((err, data) => {
      if (err) return console.error(err);
      let orderAfterSave = data;
      CartModel.findByIdAndUpdate(
        req.body.cart,
        { open: false },
        (err, data) => {
          if (err) return console.error(err);
        }
      );
      res.send({
        msg: "new order, cart closed",
        cart: data,
        order: orderAfterSave
      });
    });
  }
}
module.exports = shopController;
