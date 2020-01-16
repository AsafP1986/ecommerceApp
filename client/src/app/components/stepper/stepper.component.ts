import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { FormValidator } from "./form.validator";
import { UsersapiService } from "../../services/usersapi.service";
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NgbdModal } from "src/app/components/modals/modal.component";

@Component({
  selector: "stepper",
  templateUrl: "./stepper.component.html",
  styleUrls: ["./stepper.component.css"]
})
export class StepperComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    private _userapiService: UsersapiService,
    private modalService: NgbActiveModal
  ) {}

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  passwordgroup: FormGroup;
  linear: any;
  cities: string[] = [
    "Jerusalem",
    "Tel Aviv",
    "Haifa",
    "Rishon LeZion",
    "Petah Tikva",
    "Ashdod",
    "Netanya",
    "Beer sheva",
    "Bnei Brak",
    "Holon"
  ];
  selected: string;
  reg_user = {};

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      usernameCtrl: [
        "",
        Validators.required,
        FormValidator.userCheck(this._userapiService)
      ],
      emailCtrl: ["", [Validators.required, Validators.email]],
      passwords: this.passwordgroup = this._formBuilder.group(
        {
          passwordCtrl: new FormControl("", [
            Validators.required,
            Validators.minLength(3)
          ]),
          vpasswordCtrl: new FormControl("")
        },
        { validator: FormValidator.passwordCompare }
      )
    });
    this.secondFormGroup = this._formBuilder.group({
      cityCtrl: ["", Validators.required],
      streetCtrl: ["", Validators.required],
      firstnameCtrl: ["", Validators.required],
      lastnameCtrl: ["", Validators.required]
    });
  }

  get username() {
    return this.firstFormGroup.get("usernameCtrl");
  }
  get email() {
    return this.firstFormGroup.get("emailCtrl");
  }
  get password() {
    return this.passwordgroup.get("passwordCtrl");
  }
  get vpasswordCtrl() {
    return this.passwordgroup.get("vpasswordCtrl");
  }

  onSubmit() {
    let user = {
      user_name: this.firstFormGroup.controls.usernameCtrl.value,
      e_mail: this.firstFormGroup.controls.emailCtrl.value,
      password: this.firstFormGroup.controls.passwords.get("passwordCtrl")
        .value,
      city: this.secondFormGroup.controls.cityCtrl.value,
      street: this.secondFormGroup.controls.streetCtrl.value,
      first_name: this.secondFormGroup.controls.firstnameCtrl.value,
      last_name: this.secondFormGroup.controls.lastnameCtrl.value
    };

    console.log("user :", user);
    this._userapiService.addUser(user).subscribe(res => {
      this.reg_user = res;
      const modalRef = this.modalService.close();
      console.log("res :", res);
    });
  }
}
