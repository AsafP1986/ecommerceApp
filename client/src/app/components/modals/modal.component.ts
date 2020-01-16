import { Component, ViewEncapsulation } from "@angular/core";
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NgForm } from "@angular/forms";

@Component({
  selector: "modal",
  templateUrl: "./modal.component.html",
  styles: []
})
export class NgbdModal {
  closeResult: string;

  constructor(public activeModal: NgbActiveModal) {}
}
