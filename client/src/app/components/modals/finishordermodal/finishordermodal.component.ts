import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ShopapiService } from "../../../services/shopapi.service";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-finishordermodal",
  templateUrl: "./finishordermodal.component.html",
  styleUrls: ["./finishordermodal.component.css"]
})
export class FinishordermodalComponent implements OnInit {
  constructor(
    private _modal: NgbActiveModal,
    private sanitizer: DomSanitizer
  ) {}

  @Output() closeOrderModal = new EventEmitter();
  @Input() order;
  @Input() user;
  @Input() order_items;
  fileUrl;
  order_items_string = "";

  ngOnInit() {
    console.log("this.order from modal :", this.order);
    console.log("this.user from modal :", this.user);
    console.log("this.user from modal :", this.order_items);
    this.order_items.forEach(item => {
      this.order_items_string += `${item.quantity} ${item.product.name} that costs: ${item.price}\n`;
    });
    console.log("this.order_items_string :", this.order_items_string);
    const data = `Hi ${this.user.user_name},\n
    this is your receipt :)\n
    the items you have purchased:\n
    ${this.order_items_string}\n\n
    ------------------------------
    total bill: ${this.order.bill}`;
    const blob = new Blob([data], { type: "application/octet-stream" });
    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      window.URL.createObjectURL(blob)
    );
  }

  close() {
    this.closeOrderModal.emit(true);
    this._modal.close();
  }
}
