import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ShopapiService {
  constructor(private _http: HttpClient) {}

  cart: any;
  current_order: any;
  token: any;

  // getters and setters

  setToken(token) {
    this.token = token;
  }
  getToken() {
    if (!this.token) {
      this.token = localStorage.getItem("token");
    }
    let payload = this.token.split(".")[1];
    payload = window.atob(payload);
    let user = JSON.parse(payload);
    console.log("token from gettoken in shopapi :", user);
    return JSON.parse(this.token);
  }
  setcurrentcart(cart) {
    this.cart = cart;
  }
  getcurrentcart() {
    return this.cart;
  }
  setcurrent_order(orderdetails) {
    console.log("orderdetails :", orderdetails);
    this.current_order = orderdetails;
    console.log("order was set :", this.current_order);
  }

  getcurrent_order() {
    console.log("order in shopApi :", this.current_order);
    return this.current_order;
  }

  // products

  getAllProducts() {
    console.log("this.getToken()", this.getToken());
    return this._http.get("products", {
      headers: { Authorization: `Bearer ${this.getToken()}` }
    });
  }

  addproduct(product) {
    console.log("product to add  :", product);
    const options = {
      headers: { Authorization: `Bearer ${this.getToken()}` }
    };

    return this._http.post("products/add", product, options);
  }

  editproduct(product) {
    console.log("product to add  :", product);

    const options = {
      headers: { Authorization: `Bearer ${this.getToken()}` }
    };

    return this._http.post("products/edit", product, options);
  }

  //categories

  getAllCategories() {
    return this._http.get("categories", {
      headers: { Authorization: `Bearer ${this.getToken()}` }
    });
  }

  //cart

  getCart(user) {
    console.log("user from get cart service :", user);
    let userToSend = { user: user };
    const options = {
      headers: { Authorization: `Bearer ${this.getToken()}` },
      "Content-Type": "application/json"
    };

    return this._http.post("cart/get", userToSend, options);
  }

  refreshcart(cart) {
    console.log("cart to refresh:", cart);
    let cartToSend = { cart: cart };
    const options = {
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
        "Content-Type": "application/json"
      }
    };

    return this._http.post("cart/refresh", cartToSend, options);
  }

  emptyCart(cartId) {
    console.log("cartId to empty:", cartId);
    let cartIdToSend = { cartId: cartId };
    const options = {
      headers: { Authorization: `Bearer ${this.getToken()}` },
      "Content-Type": "application/json"
    };

    return this._http.post("cart/empty", cartIdToSend, options);
  }

  //Cart items

  createCartItem(cart_item) {
    console.log("user from get cart service :", cart_item);
    const options = {
      headers: { Authorization: `Bearer ${this.getToken()}` }
    };

    return this._http.post("cartitem/new", cart_item, options);
  }

  getCartItems(cart) {
    return this._http.get(`cartitems/${cart}`, {
      headers: { Authorization: `Bearer ${this.getToken()}` }
    });
  }

  removeCartItem(item) {
    console.log("cart item to remove :", item);
    let itemToSend = { body: item };
    const options = {
      headers: { Authorization: `Bearer ${this.getToken()}` },
      "Content-Type": "application/json"
    };

    return this._http.post("cartitem/remove", itemToSend, options);
  }

  getstatus() {
    return this._http.get("status", {
      headers: { Authorization: `Bearer ${this.getToken()}` }
    });
  }

  sendOrder(order) {
    console.log("order from send order :", order);
    const options = {
      headers: { Authorization: `Bearer ${this.getToken()}` }
    };

    return this._http.post("orders/new", order, options);
  }

  avalShippingDates() {
    return this._http.get("orders/checkshippingdates", {
      headers: { Authorization: `Bearer ${this.getToken()}` }
    });
  }
}
