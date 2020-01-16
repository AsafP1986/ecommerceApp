import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "creditcardpipe"
})
export class CreditcardpipePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    if (!value) {
      return null;
    } else {
      const visibleDigits = 4;
      let maskedSection = value.slice(0, -visibleDigits);
      console.log("maskedSection in pipe", maskedSection);
      let visibleSection = value.slice(-visibleDigits);
      console.log("visibleSection in pipe", visibleSection);
      return maskedSection.replace(/./g, "*") + visibleSection;
      // return (
      //   maskedSection.replace(/(\d{4})/g, match => {
      //     console.log("match", match);
      //     return match;
      //   }) + visibleSection
      // );
      // .replace(/\s+/g, "")
      // .replace(/(.{4})/g, "$1 - ") +
      // .trim()
      // visibleSection

      // return "*";
    }
  }
}
