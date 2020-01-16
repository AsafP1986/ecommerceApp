import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { ShopapiService } from "../../../services/shopapi.service";
import { UsersapiService } from "../../../services/usersapi.service";

@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.css"]
})
export class OrderComponent implements OnInit {
  constructor(
    private _shopservice: ShopapiService,
    private _Usersservice: UsersapiService,
    private _router: Router
  ) {}

  current_order: any;
  current_user: any;
  current_cart: any;
  current_cart_items: any;
  total_bill: number;

  ngOnInit() {
    this.current_order = this._shopservice.getcurrent_order();
    if (this.current_order == undefined) {
      this._router.navigateByUrl("login");
    } else {
      console.log("this.current_order :", this.current_order);
      this.current_user = this.current_order.user;
      this.current_cart = this.current_order.cart;
      this.current_cart_items = this.current_order.cart_items;
      this.total_bill = this.current_order.total_bill;
    }
  }
}
