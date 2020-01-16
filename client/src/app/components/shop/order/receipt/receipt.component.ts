import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "receipt",
  templateUrl: "./receipt.component.html",
  styleUrls: ["./receipt.component.css"]
})
export class ReceiptComponent implements OnInit {
  @Input() order_items;
  @Input() total_bill;
  order_items_display;

  constructor() {}

  ngOnInit() {
    console.log("order_items :", this.order_items);
    this.order_items_display = this.order_items;
  }

  search(event) {
    console.log("event.target.value", event.target.value);
    console.log("this.order_items :", this.order_items);
    this.order_items_display = this.order_items.filter(order_item => {
      if (order_item.product.name.indexOf(event.target.value) !== -1) {
        return order_item;
      }
    });
    console.log("this.order_items_display :", this.order_items_display);
  }
}
