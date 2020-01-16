import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NgbdModal } from "src/app/components/modals/modal.component";
import { UsersapiService } from "../../../../services/usersapi.service";
import { ShopapiService } from "../../../../services/shopapi.service";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.css"]
})
export class LoginFormComponent implements OnInit {
  closeResult: string;
  data: any;
  errormsg: string;
  currentUserName: string = "";
  islogedin: Boolean = false;
  user: any;
  status: any;
  userStatus: any;
  userStatusDate: any;

  constructor(
    private modalService: NgbModal,
    private _userapi: UsersapiService,
    private _shopapi: ShopapiService
  ) {}

  open(e) {
    const modalRef = this.modalService.open(NgbdModal);
  }
  ngOnInit() {
    let user =
      localStorage.getItem("user") == undefined
        ? null
        : localStorage.getItem("user");
    if (user != null) {
      this.user = JSON.parse(user);
      console.log("this.user from local storage:", this.user);
      if (this.user.role === 1) {
        this.status = "admin";
        this.currentUserName = this.user.user_name;
        this.islogedin = true;
        this._userapi.setcurrent_user(this.user);
      } else {
        this._userapi.getUserStatus(this.user._id).subscribe(res => {
          console.log("res from userStatus:", res);
          this.userStatus = res;
          console.log("this.userStatus", this.userStatus);
          if (this.userStatus.msg !== "new user") {
            let date = this.userStatus.details.date;
            let parseddate = date.slice(0, 10).split("-");
            let dateString = `${parseddate[2]}/${parseddate[1]}/${parseddate[0]}`;
            this.userStatusDate = dateString;
            console.log("date", dateString);
          }
          switch (this.userStatus.msg) {
            case "user as open cart":
              this.status = "a";
              break;
            case "user as no open cart":
              this.status = "b";
              break;
            case "new user":
              this.status = "c";
              break;
            default:
              break;
          }
          console.log("this.status", this.status);
          this.currentUserName = this.user.user_name;
          this.islogedin = true;
          this._userapi.setcurrent_user(this.user);
        });
      }
    }
    console.log("this.user from ngoninit:", this.user);
  }

  login(form) {
    console.log("form :", form);
    let user = {
      username: form.form.controls.username.value,
      password: form.form.controls.password.value
    };
    console.log("user :", user);

    this._userapi.login(user).subscribe(res => {
      console.log("res from login:", res);
      this.data = res;

      this.errormsg = this.data.msg;
      console.log("this.data :", this.data);
      if (this.data.token) {
        localStorage.setItem("token", JSON.stringify(this.data.token));
        this._userapi.setToken(JSON.stringify(this.data.token));
        let payload;

        payload = this.data.token.split(".")[1];
        payload = window.atob(payload);
        let user = JSON.parse(payload);
        this.user = user;
        if (this.user.role === 1) {
          this.status = "admin";
          localStorage.setItem("user", JSON.stringify(user));
          this.currentUserName = this.user.user_name;
          this.islogedin = true;
          this._userapi.setcurrent_user(this.user);
        } else {
          console.log("user :", this.user);
          this._userapi.getUserStatus(this.user._id).subscribe(res => {
            console.log("res from userStatus:", res);
            this.userStatus = res;
            console.log("this.userStatus", this.userStatus);
            if (this.userStatus.msg !== "new user") {
              let date = this.userStatus.details.date;
              let parseddate = date.slice(0, 10).split("-");
              let dateString = `${parseddate[2]}/${parseddate[1]}/${parseddate[0]}`;
              this.userStatusDate = dateString;
              console.log("date", dateString);
            }
            switch (this.userStatus.msg) {
              case "user as open cart":
                this.status = "a";
                break;
              case "user as no open cart":
                this.status = "b";
                break;
              case "new user":
                this.status = "c";
                break;
              default:
                break;
            }
            localStorage.setItem("user", JSON.stringify(user));
            this._userapi.setcurrent_user(user);
            this.islogedin = true;
            this.currentUserName = user.user_name;
          });
        }

        // localStorage.setItem("user", JSON.stringify(this.data.user));
        // this._userapi.setcurrent_user(this.data.user);
        // this.islogedin = true;
        // this.currentUserName = this.data.user.user_name;
      }
    });
  }

  logout() {
    this._userapi.logout().subscribe(res => {
      console.log("res from logout:", res);
      this.data = {};
      this.errormsg = "";
      console.log("this.data :", this.data);
      // if (this.data.length == 0) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      this._userapi.setToken("");
      this._userapi.setcurrent_user({});
      this.islogedin = false;
      this.currentUserName = "";
      // }
    });
  }
}
