import { Component, OnInit } from "@angular/core";
import { UsersapiService } from "./services/usersapi.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  constructor(private _userApi: UsersapiService) {}
  user: any;

  ngOnInit() {
    let user =
      localStorage.getItem("user") == undefined
        ? null
        : localStorage.getItem("user");
    if (user != null) {
      this.user = JSON.parse(user);
      console.log("this.user from local storage:", user);
      this._userApi.setcurrent_user(this.user);
    }
  }
}
