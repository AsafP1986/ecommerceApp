import { Component, OnInit } from "@angular/core";
import { ShopapiService } from "../../../../services/shopapi.service";

@Component({
  selector: "status",
  templateUrl: "./status.component.html",
  styleUrls: ["./status.component.css"]
})
export class StatusComponent implements OnInit {
  constructor(private _shopapi: ShopapiService) {}

  res;
  NOU: Number = 0;
  NOP: Number = 0;
  NOO: Number = 0;

  ngOnInit() {
    this._shopapi.getstatus().subscribe(res => {
      this.res = res;
      console.log("this.res from get status :", this.res);
      this.NOO = this.res.NOO;
      this.NOP = this.res.NOP;
      this.NOU = this.res.NOU;
    });
  }
}
