import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { ShopapiService } from "../../../services/shopapi.service";
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { AddtocartmodalComponent } from "../../modals/addtocartmodal/addtocartmodal/addtocartmodal.component";
import { AlertmodalComponent } from "../../modals/alertmodal/alertmodal.component";

@Component({
  selector: "productsview",
  templateUrl: "./productsview.component.html",
  styleUrls: ["./productsview.component.css"]
})
export class ProductsviewComponent implements OnInit {
  constructor(
    private shopservice: ShopapiService,
    private modalService: NgbModal
  ) {}

  products: any = [];
  productsDisplay: any = [];
  categories: any;
  imageApiURL: string = "http://localhost:3000/";
  @Output() CartItemAdded = new EventEmitter();
  cartItems: any;

  ngOnInit() {
    this.shopservice.getAllProducts().subscribe(res => {
      console.log("res from get all products service:", res);
      this.products = res;
      this.productsDisplay = res;
    });
    this.shopservice.getAllCategories().subscribe(res => {
      this.categories = res;
    });
  }
  addToCart(event) {
    let productInfo = event.target.id.split(",");
    console.log("productInfo :", productInfo);
    let productId = productInfo[0];

    let cart = this.shopservice.getcurrentcart();
    console.log("cart from add to cart:", cart);

    var cartItems: any;
    this.shopservice.getCartItems(cart._id).subscribe(res => {
      this.cartItems = res;
      let searchCartItem = this.cartItems.filter(search => {
        console.log("search.product._id :", search.product._id);
        console.log("productId :", productId);
        console.log("search.cart :", search.cart);
        console.log("cart :", cart);

        if (search.product._id == productId && search.cart == cart._id) {
          console.log("product is in the cart");
          return search;
        }
      });
      console.log("searchCartItem :", searchCartItem);
      if (searchCartItem.length != 0) {
        this.modalService.open(AlertmodalComponent, {
          size: "sm",
          backdropClass: "light-blue-backdrop"
        });
      } else {
        const modalRef = this.modalService.open(AddtocartmodalComponent, {
          size: "sm",
          backdropClass: "light-blue-backdrop"
        });
        modalRef.componentInstance.product = event.target.id;
        modalRef.componentInstance.closeAddToCartModal.subscribe(res => {
          console.log("res from cart modal close :", res);
          console.log("res from cart modal close :", res.product);
          let product = this.products.filter(product => {
            if (product._id == res.product) {
              return product;
            }
          });
          res.product = product[0];
          console.log("res after filter:", res);

          this.CartItemAdded.emit(res);
        });
      }
    });
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
}
