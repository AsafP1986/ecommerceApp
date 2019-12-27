var express = require("express");
var cors = require("cors");
const auth = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");

var router = express.Router();
var shopController = require("../controllers/shopcontroller");

router.get("/status", shopController.getStatus);

/* products */
/* GET all products */
router.get("/products", auth, shopController.getAllproducts);

/* post new product */
router.post("/products/add", adminAuth, shopController.addProduct);
router.post("/products/edit", adminAuth, shopController.editProduct);
/* categories */

router.get("/categories", auth, shopController.getAllCategories);
router.post("/categories/add", auth, shopController.addCategory);

router.post("/cart/get", auth, shopController.getCart);

router.post("/cart/refresh", auth, shopController.refreshCart);

router.post("/cart/empty", auth, shopController.emptyCart);

router.post("/cartitem/new", auth, shopController.newCartItem);

router.get("/cartitems/:cartid", auth, shopController.getCartItems);

router.post("/cartitem/remove", auth, shopController.removeCartItem);

router.get(
  "/orders/checkshippingdates",
  auth,
  shopController.unavaliableShippingDates
);
router.post("/orders/new", auth, shopController.newOrder);

module.exports = router;
