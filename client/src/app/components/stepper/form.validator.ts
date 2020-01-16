import { AbstractControl, ValidationErrors } from "@angular/forms";
import { UsersapiService } from "../../services/usersapi.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export class FormValidator {
  static passwordCompare(control: AbstractControl): ValidationErrors | null {
    return control.get("passwordCtrl").value ===
      control.get("vpasswordCtrl").value
      ? null
      : { mismatch: true };
  }

  static userCheck(usersapiService: UsersapiService) {
    console.log("inside user check validator");
    return (control: AbstractControl) => {
      console.log("control.value from validator", control.value);
      return usersapiService.checkUser(control.value).pipe(
        map(res => {
          console.log("res from service", res);
          if (res.hasOwnProperty("error")) {
            console.log("username exist");
            return { userExist: true };
          }
          if (res.hasOwnProperty("msg")) {
            console.log("username avaliable");
            return null;
          }
        })
      );
    };
  }
}
