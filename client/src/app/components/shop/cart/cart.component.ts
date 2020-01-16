import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter
} from "@angular/core";
import { Router, NavigationExtras } from "@angular/router";

import { ShopapiService } from "../../../services/shopapi.service";
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"]
})
export class CartComponent implements OnInit {
  constructor(
    private _shopservice: ShopapiService,
    private modalservice: NgbModal,
    private _router: Router
  ) {}
  @Input() current_user;
  res: any;
  cart_items: any = [];
  current_cart: any;
  total_bill: number = 0;
  @Input() newCartItem;
  @Output() closesidebar = new EventEmitter();

  ngOnInit() {
    this._shopservice.getCart(this.current_user._id).subscribe(res => {
      console.log("res from get cart:", res);
      this.res = res;
      this.cart_items = this.res.cart_items;
      this.current_cart = this.res.cart[0];
      this._shopservice.setcurrentcart(this.current_cart);
      console.log("this.res :", this.res);
      console.log("this.cart_items :", this.cart_items);
      console.log("tthis.current_cart :", this.current_cart);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes["newCartItem"].isFirstChange()) {
      if (changes.newCartItem) {
        console.log("cart item added", changes.newCartItem.currentValue);
        let product = changes.newCartItem.currentValue;
        console.log("product from onchanges:", product);
        console.log("this.current_cart :", this.current_cart);
        let cartId = this.current_cart._id ? this.current_cart._id : "";
        this._shopservice.refreshcart(cartId).subscribe(res => {
          console.log("res from ngonchange in refresh :", res);
          this.res = res;
          this.total_bill = 0;
          this.cart_items = this.res.cart_items;
          console.log("this.cart_items :", this.cart_items);
          console.log("this.res.cart_items :", this.res.cart_items);
        });
      }
    }
  }

  sidebarclose(event) {
    this.closesidebar.emit(false);
  }

  removeItem(event) {
    console.log("event from remove item in cart:", event);
    function checkforitem(item) {
      return item._id == event;
    }
    let indexOfItem = this.cart_items.findIndex(checkforitem);
    console.log("indexOfItem :", indexOfItem);
    if (indexOfItem != -1) {
      let price = this.cart_items[indexOfItem].price;
      console.log("price :", price);
      this.total_bill -= price;
      this._shopservice.removeCartItem(event).subscribe(res => {
        console.log("res :", res);
        this._shopservice.refreshcart(this.current_cart._id).subscribe(res => {
          console.log("res from refresh:", res);
          this.res = res;
          this.total_bill = 0;
          this.cart_items = this.res.cart_items;
          console.log("this.cart_items :", this.cart_items);
          console.log("this.res.cart_items :", this.res.cart_items);
        });
      });
    }
  }

  calcTBill(event) {
    console.log("event from calcTBill :", event);
    this.total_bill += event;
  }

  order() {
    let orderdetails = {
      user: this.current_user,
      cart: this.current_cart,
      cart_items: this.cart_items,
      total_bill: this.total_bill
    };
    console.log("orderdetails in cart :", orderdetails);
    this._shopservice.setcurrent_order(orderdetails);
    this._router.navigate(["order"]);
  }

  emptyCart() {
    this._shopservice.emptyCart(this.current_cart._id).subscribe(res => {
      console.log("res :", res);
      this._shopservice.refreshcart(this.current_cart._id).subscribe(res => {
        console.log("res from refresh:", res);
        this.res = res;
        this.total_bill = 0;
        this.cart_items = this.res.cart_items;
        console.log("this.cart_items :", this.cart_items);
        console.log("this.res.cart_items :", this.res.cart_items);
      });
    });
  }
}
