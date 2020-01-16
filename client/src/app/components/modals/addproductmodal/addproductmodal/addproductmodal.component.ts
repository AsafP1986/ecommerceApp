import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ShopapiService } from "../../../../services/shopapi.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "addproductmodal",
  templateUrl: "./addproductmodal.component.html",
  styleUrls: ["./addproductmodal.component.css"]
})
export class AddproductmodalComponent implements OnInit {
  constructor(
    public activeModal: NgbActiveModal,
    private _shopapi: ShopapiService
  ) {}
  categories;
  @Output() close = new EventEmitter();

  ngOnInit() {
    this._shopapi.getAllCategories().subscribe(res => {
      console.log("res from getAllCategories", res);
      this.categories = res;
    });
  }

  image: any;

  onFileChanged(event) {
    const file = event.target.files[0];
    this.image = file;
  }
  async addproduct(form) {
    console.log("form", form.form.controls);
    console.log("this.image :", this.image);

    let name = form.form.controls.name.value;
    let price = form.form.controls.price.value;
    let category = form.form.controls.category.value;
    let picture = this.image;

    let product = { name: name, price: price, category: category };
    console.log("product :", JSON.stringify(product));
    var formData = new FormData();
    formData.append("image", this.image, this.image.name);
    formData.append("product", JSON.stringify(product));
    console.log("formData", formData);

    this._shopapi.addproduct(formData).subscribe(data => {
      console.log("data", data);
      this.close.emit(true);
      this.activeModal.close();
    });
  }
}
