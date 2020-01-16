import { Component, OnInit } from "@angular/core";
import { UsersapiService } from "../../../services/usersapi.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-shop",
  templateUrl: "./shop.component.html",
  styleUrls: ["./shop.component.css"]
})
export class ShopComponent implements OnInit {
  constructor(private _Usersservice: UsersapiService, private router: Router) {}
  userRole: any;
  current_user: any;
  // this._Usersservice.getcurrent_user();
  newCartItem: any;
  opened: boolean = true;

  ngOnInit() {
    this.current_user = this._Usersservice.getcurrent_user();
    console.log("this.current_user from shop :", this.current_user);
    if (this.current_user == undefined) {
      let user =
        localStorage.getItem("user") == undefined
          ? null
          : localStorage.getItem("user");
      if (user != null) {
        this.current_user = JSON.parse(user);
      } else {
        this.router.navigateByUrl("/login");
      }
    } else {
      this.userRole = this.current_user.role;
    }
  }
  onCartItemAdded(event) {
    console.log("event from add to cart modal in shop :", event.product);
    this.newCartItem = event;
  }

  onsidebarclose(event) {
    console.log("recevied from cart close side bar :", event);

    this.opened = event;
  }

  onsidebartoggle(event) {
    console.log("recevied from navbar toggle side bar :", event);
    this.opened = event;
  }
}
