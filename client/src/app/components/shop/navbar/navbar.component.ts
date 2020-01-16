import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { UsersapiService } from "src/app/services/usersapi.service";
import { Router } from "@angular/router";

@Component({
  selector: "navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  constructor(private _userapi: UsersapiService, private _router: Router) {}

  @Input() current_user;
  @Input() opened;
  @Output() togglesidebar = new EventEmitter();
  sidbarstatus: Boolean = this.opened;
  userName;
  userRole;

  ngOnInit() {
    this.userName =
      this.current_user == undefined ? "guest" : this.current_user.user_name;
    this.userRole =
      this.current_user == undefined ? "guest" : this.current_user.role;

    this.sidbarstatus = this.opened;
    console.log("this.sidbarstaus", this.sidbarstatus);
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log("changes.opened", changes.opened);
    if (changes.opened) {
      this.sidbarstatus = changes.opened.currentValue;
    }
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

  sidebartoggle() {
    console.log("status emited :", !this.sidbarstatus);
    this.togglesidebar.emit(!this.sidbarstatus);
    this.sidbarstatus = !this.sidbarstatus;
  }
}
