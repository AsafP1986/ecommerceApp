import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "cartitem",
  templateUrl: "./cartitem.component.html",
  styleUrls: ["./cartitem.component.css"]
})
export class CartitemComponent implements OnInit {
  @Input() item;
  @Output() item_price = new EventEmitter();
  @Output() remove_item = new EventEmitter();
  serverUrl: string = "http://localhost:8080/";
  constructor() {}

  ngOnInit() {
    console.log("item price from cart item:", this.item.price);
    let price = this.item.price;
    this.item_price.emit(price);
  }

  remove(event) {
    console.log("event from remove item in cartItem:", event.target.id);
    let itemId = event.target.id;
    this.remove_item.emit(itemId);
  }
}
