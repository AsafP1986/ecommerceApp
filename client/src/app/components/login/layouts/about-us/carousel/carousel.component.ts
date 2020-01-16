import { Component, ViewChild, OnInit } from "@angular/core";
import {
  NgbCarousel,
  NgbSlideEvent,
  NgbSlideEventSource,
  NgbCarouselConfig
} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "ngbd-carousel",
  templateUrl: "./carousel.component.html",
  providers: [NgbCarouselConfig]
})
export class CarouselComponent implements OnInit {
  imagesT: String[] = [
    "crates",
    "freshyield",
    "palms",
    "tomatos",
    "tractor",
    "watering"
  ];
  images = this.imagesT.map(n => `/assets/images/${n}.jpeg`);

  ngOnInit() {
    console.log("this.imagesT", this.imagesT);
  }

  paused = false;
  unpauseOnArrow = true;
  pauseOnIndicator = true;
  pauseOnHover = true;

  @ViewChild("carousel", { static: true }) carousel: NgbCarousel;

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (
      this.unpauseOnArrow &&
      slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT ||
        slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
    ) {
      this.togglePaused();
    }
    if (
      this.pauseOnIndicator &&
      !slideEvent.paused &&
      slideEvent.source === NgbSlideEventSource.INDICATOR
    ) {
      this.togglePaused();
    }
  }
}
