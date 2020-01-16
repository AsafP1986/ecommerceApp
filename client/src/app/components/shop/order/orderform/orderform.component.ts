import { Component, OnInit, Input } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import {
  NgbDateStruct,
  NgbCalendar,
  NgbDate
} from "@ng-bootstrap/ng-bootstrap";
import { Router, NavigationExtras } from "@angular/router";
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { CreditCardValidator } from "angular-cc-library";
import { ShopapiService } from "../../../../services/shopapi.service";
import { FinishordermodalComponent } from "../../../modals/finishordermodal/finishordermodal.component";
import { CreditcardpipePipe } from "../creditcardpipe.pipe";

@Component({
  selector: "orderform",
  templateUrl: "./orderform.component.html",
  styleUrls: ["./orderform.component.css"]
})
export class OrderformComponent implements OnInit {
  @Input() order_items;
  orderFormGroup: FormGroup;
  model: NgbDateStruct;
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
  min_date: NgbDate;
  current_order: any;
  unAvShippingDates: any;
  CrCaStr: String = "";

  constructor(
    private _formBuilder: FormBuilder,
    private _calendar: NgbCalendar,
    private _shopApi: ShopapiService,
    private _modalService: NgbModal,
    private _router: Router,
    private _creditCardPipe: CreditcardpipePipe
  ) {
    this.orderFormGroup = this._formBuilder.group({
      cityCtrl: ["", Validators.required],
      streetCtrl: ["", [Validators.required]],
      dateCtrl: ["", [Validators.required]],
      creditCardCtrl: [
        "",
        [
          Validators.minLength(16),
          Validators.required,
          Validators.maxLength(16),
          Validators.pattern("[0-9-*]*")
        ]
      ]
    });
    this.orderFormGroup.valueChanges.subscribe(val => {
      console.log("val", val);
      console.log("typeof val.creditCardCtrl", typeof val.creditCardCtrl);
      if (typeof val.creditCardCtrl === "string") {
        const maskedVal = this._creditCardPipe.transform(val.creditCardCtrl);
        if (val.creditCardCtrl !== maskedVal) {
          this.orderFormGroup.patchValue({ creditCardCtrl: maskedVal });
        }
      }
    });
  }

  ngOnInit() {
    this._shopApi.avalShippingDates().subscribe(res => {
      this.unAvShippingDates = res;
      console.log("this.unAvShippingDates", this.unAvShippingDates);
    });

    this.min_date = this._calendar.getToday();
    this.current_order = this._shopApi.getcurrent_order();
    console.log("current order from form :", this.current_order);
  }

  get city() {
    return this.orderFormGroup.get("cityCtrl");
  }

  get street() {
    return this.orderFormGroup.get("streetCtrl");
  }
  get date() {
    return this.orderFormGroup.get("dateCtrl");
  }
  get creditCard() {
    return this.orderFormGroup.get("creditCardCtrl");
  }

  creditinsert(event) {
    console.log("event from creditinsert:", event.keyCode);
    if (event.keyCode >= 48 && event.keyCode <= 57) {
      console.log("number was entered", typeof event.key);
      this.CrCaStr += event.key;
    } else if (event.keyCode == 8) {
      console.log("backspace was entered", event.key);
      this.CrCaStr = this.CrCaStr.slice(0, -1);
    } else {
      console.log("bad key was entered", typeof event.key);
      this.CrCaStr += event.key;
    }
    console.log("this.creditCard from creditinsert:", this.creditCard);
    console.log("this.CrCaStr from creditinsert:", this.CrCaStr);
  }

  selectToday() {
    this.model = this._calendar.getToday();
    console.log("this.model :", this.model);
    this.orderFormGroup.get("dateCtrl").setValue(this.model);
  }

  isDisabled = (date: NgbDate, current: { month: number }) => {
    var flag = 0;
    this.unAvShippingDates.forEach(element => {
      if (
        element.year == date.year &&
        element.month == date.month &&
        element.day == date.day
      ) {
        console.log("an unavladabf");
        flag = 1;
      }
    });
    if (flag) {
      return true;
    }
  };

  onDateSelect(event) {
    console.log("event from onDateSelect :", event);
    console.log(
      "this.orderFormGroup.dateCtrl.value :",
      this.orderFormGroup.controls.dateCtrl.value
    );
  }

  doubleClick() {
    let userCity = this.current_order.user.adress.city;
    let userStreet = this.current_order.user.adress.street;
    this.orderFormGroup.get("cityCtrl").setValue(userCity);
    this.orderFormGroup.get("streetCtrl").setValue(userStreet);
  }

  submit(event) {
    let user = this.current_order.user;
    event.preventDefault();
    console.log("this.orderFormGroup :", this.orderFormGroup);
    let order = {
      cart: this.current_order.cart._id,
      bill: this.current_order.total_bill,
      shippingDetails: {
        s_city: this.city.value,
        s_street: this.street.value,
        s_date: this.date.value
      },
      payedWith: this.creditCard.value
    };

    console.log("order :", order);
    this._shopApi.sendOrder(order).subscribe(res => {
      console.log("res from send order :", res);
      const modalRef = this._modalService.open(FinishordermodalComponent, {
        backdrop: "static"
      });
      modalRef.componentInstance.order = order;
      modalRef.componentInstance.order_items = this.order_items;
      modalRef.componentInstance.user = user;
      modalRef.componentInstance.closeOrderModal.subscribe(res => {
        console.log("res from order modal close :", res);
        this._router.navigate(["/shop"]);
      });
    });
  }
}
