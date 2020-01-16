import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ShopapiService } from "../../../../services/shopapi.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-addtocartmodal",
  templateUrl: "./addtocartmodal.component.html",
  styleUrls: ["./addtocartmodal.component.css"]
})
export class AddtocartmodalComponent implements OnInit {
  constructor(
    public activeModal: NgbActiveModal,
    private _shopapi: ShopapiService
  ) {}
  @Output() closeAddToCartModal = new EventEmitter();
  quantity: number = 1;
  @Input() product;
  price: any;
  productId: any;
  cart;
  ngOnInit() {
    console.log("this.product :", this.product);
    let productInfo = this.product.split(",");
    console.log("productInfo :", productInfo);
    this.productId = productInfo[0];
    this.price = parseInt(productInfo[1]);
    this.cart = this._shopapi.getcurrentcart();
    console.log("this.cart :", this.cart);
    console.log("this.productId :", this.productId);
    console.log("this.price :", this.price);
  }

  plus(event) {
    event.preventDefault();
    this.quantity++;
  }
  minus(event) {
    event.preventDefault();
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  updateCart(form) {
    console.log("form :", form.form.controls.quantity.value);
    this.quantity = form.form.controls.quantity.value;
    let price = this.quantity * this.price;
    let cartItem = {
      cart: this.cart._id,
      product: this.productId,
      quantity: this.quantity,
      price: this.quantity * this.price
    };
    console.log("cartItem :", cartItem);
    this._shopapi.createCartItem(cartItem).subscribe(data => {
      console.log("data", data);
      this.closeAddToCartModal.emit(cartItem);
      this.activeModal.close();
    });
  }
}
