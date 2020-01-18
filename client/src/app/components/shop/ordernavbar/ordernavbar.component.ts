import { Component, OnInit, Input } from "@angular/core";
import { UsersapiService } from "src/app/services/usersapi.service";
import { Router } from "@angular/router";

@Component({
  selector: "ordernavbar",
  templateUrl: "./ordernavbar.component.html",
  styleUrls: ["./ordernavbar.component.css"]
})
export class OrdernavbarComponent implements OnInit {
  @Input() current_user;
  user: any;

  constructor(private _userapi: UsersapiService, private _router: Router) {}

  ngOnInit() {
    this.user = this.current_user ? this.current_user.user_name : "";
    console.log("this.user", this.user);
  }

  logout() {
    console.log("loggingout");
    this._userapi.logout().subscribe(res => {
      console.log("res from logout:", res);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      this._userapi.setToken("");
      this._userapi.setcurrent_user({});
      this._router.navigateByUrl("/login");
    });
  }
}
