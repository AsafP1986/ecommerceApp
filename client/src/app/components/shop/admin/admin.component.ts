import { Component, OnInit } from "@angular/core";
import { ShopapiService } from "../../../services/shopapi.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AddproductmodalComponent } from "../../modals/addproductmodal/addproductmodal/addproductmodal.component";
@Component({
  selector: "admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit {
  constructor(
    private shopservice: ShopapiService,
    private modalService: NgbModal
  ) {}
  categories: any;
  products: any = [];
  productsDisplay: any = [];
  imageApiURL: string = "http://localhost:3000/";
  editshow: boolean = false;
  productToEdit: object;
  productToEditId: string;
  productToEditName: string;
  productToEditPrice: number;
  productToEditCategoryName: string;
  productToEditCategoryId: any;
  productToEditpicture: any;

  ngOnInit() {
    this.shopservice.getAllProducts().subscribe(res => {
      this.products = res;
      console.log("all products", this.products);
      this.productsDisplay = res;
    });
    this.shopservice.getAllCategories().subscribe(res => {
      this.categories = res;
    });
  }

  open() {
    const modalRef = this.modalService.open(AddproductmodalComponent);
    modalRef.componentInstance.close.subscribe(res => {
      this.shopservice.getAllProducts().subscribe(res => {
        this.products = res;
        this.productsDisplay = res;
      });
    });
  }

  close() {
    this.editshow = false;
  }

  show(event) {
    console.log("event.target.id", event.target.id);
    let category = event.target.id;
    if (category == "all") {
      this.productsDisplay = this.products;
    } else {
      this.productsDisplay = this.products.filter(product => {
        if (product.category.name == category) {
          return product;
        }
      });
    }
  }
  search(event) {
    console.log("event.target.value", event.target.value);
    this.productsDisplay = this.products.filter(product => {
      if (product.name.indexOf(event.target.value) !== -1) {
        return product;
      }
    });
  }

  edit(event) {
    console.log("event.target", event.target.id);
    this.productToEdit = this.products.filter(product => {
      if (product._id == event.target.id) {
        this.productToEditId = product._id;
        this.productToEditName = product.name;
        this.productToEditPrice = product.price;
        this.productToEditCategoryName = product.category.name;
        this.productToEditCategoryId = product.category._id;
        this.productToEditpicture = product.picture;
        return product;
      }
    });
    this.editshow = true;
  }
  image: any;

  onFileChanged(event) {
    const file = event.target.files[0];
    this.image = file;
  }
  async editproduct(form) {
    console.log("form", form.form.controls);

    let name = form.form.controls.name.value;
    let price = form.form.controls.price.value;
    let category = form.form.controls.category.value;
    let picture =
      this.image === undefined ? this.productToEditpicture : this.image;

    var formData = new FormData();

    if (this.image === undefined) {
      let product = {
        id: this.productToEditId,
        name: name,
        price: price,
        category: category,
        picture: picture
      };
      formData.append("product", JSON.stringify(product));
    } else {
      let product = {
        id: this.productToEditId,
        name: name,
        price: price,
        category: category
      };
      formData.append("product", JSON.stringify(product));
      formData.append("picture", this.image, this.image.name);
    }

    this.shopservice.editproduct(formData).subscribe(data => {
      this.shopservice.getAllProducts().subscribe(res => {
        this.products = res;
        this.productsDisplay = res;
      });
      form.reset();
      this.editshow = false;
    });
  }
}
