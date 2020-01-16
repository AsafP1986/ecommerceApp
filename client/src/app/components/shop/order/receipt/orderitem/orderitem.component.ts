import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "orderitem",
  templateUrl: "./orderitem.component.html",
  styleUrls: ["./orderitem.component.css"]
})
export class OrderitemComponent implements OnInit {
  @Input() item;

  constructor() {}

  ngOnInit() {
    console.log("this.item :", this.item);
  }
}
