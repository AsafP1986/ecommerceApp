import {
  Directive,
  Output,
  EventEmitter,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  OnDestroy
} from "@angular/core";
import { fromEvent, Subscription } from "rxjs";

@Directive({
  selector: "[appCreditcarddirective]"
})
export class CreditcarddirectiveDirective implements OnChanges {
  actualValue: string = "";
  transformedValue = "";

  @Input() cardNumbers: string;
  @Output() valueChanged: EventEmitter<string> = new EventEmitter();
  currentSubscription: Subscription;
  constructor(private element: ElementRef) {
    fromEvent(element.nativeElement, "input").subscribe(({ target }) => {
      this.transformValue(target.value);
    });
  }

  transformValue(value: string) {
    value = value.replace(/\s/g, "");
    console.log("value", value);
    console.log("value.length", value.length);
    console.log("this.actualValue.length", this.actualValue.length);
    console.log("this.actualValue", this.actualValue);

    if (value.length > this.actualValue.length) {
      this.actualValue =
        this.actualValue + value.slice(this.actualValue.length, value.length);
      console.log("this.actualValue before emit first if", this.actualValue);
      this.valueChanged.emit(this.actualValue);
    } else {
      this.actualValue = this.actualValue.slice(0, value.length);
      console.log("this.actualValue before emit from else", this.actualValue);
      this.valueChanged.emit(this.actualValue);
    }

    this.transformedValue = this.formatValue(this.actualValue);
    this.element.nativeElement.value = this.transformedValue;
  }

  formatValue(value: any) {
    const s = value
      .replace(/\s+/g, "")
      .replace(/([\w*]{4})/g, "$1 ")
      .trim();
    console.log("s from format value:", s);
    const visibleDigits = 4;
    let maskedSection = s.slice(0, -visibleDigits);
    console.log("maskedSection in pipe", maskedSection);
    let visibleSection = s.slice(-visibleDigits);
    console.log("visibleSection in pipe", visibleSection);
    console.log(
      'maskedSection.replace(/./g, "*") + visibleSection',
      maskedSection.replace(/\w/g, "*") + visibleSection
    );
    return maskedSection.replace(/\w/g, "*") + visibleSection;
    // return s.replace(/\w/g, "*");
  }

  ngOnChanges(changes: SimpleChanges) {
    let cardNumbers = changes.cardNumbers;
    if (cardNumbers && cardNumbers.firstChange) {
      this.transformValue(this.cardNumbers);
    }
  }

  // ngOnDestroy() {
  //   this.currentSubscription.unsubscribe();
  // }
}
