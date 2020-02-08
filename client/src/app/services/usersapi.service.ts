import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class UsersapiService {
  constructor(private _http: HttpClient) {}

  current_user: any;
  token: any;

  setcurrent_user(user) {
    this.current_user = user;
    console.log("a user was set to api :", this.current_user);
  }

  getcurrent_user() {
    return this.current_user;
  }

  getUser() {
    return this._http.get("users/getuser", {
      withCredentials: true
    });
  }

  setToken(token) {
    this.token = token;
  }
  getToken() {
    if (!this.token) {
      this.token = localStorage.getItem("token");
    }
    return JSON.parse(this.token);
  }

  checkUser(username: string) {
    let userNameToSend = { username: username };
    const options = {
      headers: { Authorization: `Bearer ${this.getToken()}` },
      "Content-Type": "application/json"
    };
    console.log("username to check  :", userNameToSend);
    return this._http.post("users/check", userNameToSend, options).pipe(
      map(res => {
        return res;
      })
    );
  }

  addUser(user: object) {
    let userToSend = { user: user };
    const options = {
      headers: { Authorization: `Bearer ${this.getToken()}` },
      "Content-Type": "application/json"
    };
    console.log("user to add  :", user);
    return this._http.post("users/add", userToSend, options);
  }

  login(user) {
    console.log("user to login, :", user);
    const options = {
      headers: { Authorization: `Bearer ${this.getToken()}` }
    };
    return this._http.post("users/login", user, options);
  }

  logout() {
    return this._http.get("users/logout", {
      headers: { Authorization: `Bearer ${this.getToken()}` }
    });
  }

  getUserStatus(userId) {
    let userIdToSend = { userId: userId };
    const options = {
      headers: { Authorization: `Bearer ${this.getToken()}` },
      "Content-Type": "application/json"
    };
    console.log("user to login, :", userId);
    return this._http.post("users/getshopstatus", userIdToSend, options);
  }
}
