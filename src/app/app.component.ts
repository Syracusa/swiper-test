import { Component, ElementRef, ViewChild } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { Swiper } from 'swiper/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'swiper-test';

  @ViewChild('swiperParentRef')
  swiperParentRef: ElementRef | undefined;
  swiperParent?: Swiper;

  @ViewChild('swiperChildRef')
  swiperChildRef: ElementRef | undefined;
  swiperChild?: Swiper;

  handleSwiperScrollEvent() {
    if (this.swiperParent?.activeIndex === 1) {
      if (this.swiperChild?.activeIndex === 0) {
        this.swiperParent!.allowSlideNext = false;
        this.swiperParent!.allowSlidePrev = true;
      } else if (this.swiperChild?.activeIndex === 1) {
        this.swiperParent!.allowSlidePrev = false;
        this.swiperParent!.allowSlideNext = true;
      } else {
        this.swiperParent!.allowSlideNext = false;
        this.swiperParent!.allowSlidePrev = false;
      }
    } else {
      this.swiperChild?.mousewheel.disable();
      this.swiperParent!.allowSlideNext = true;
      this.swiperParent!.allowSlidePrev = true;
    }
  }

  ngAfterViewInit() {
    register();
    this.swiperParent = this.swiperParentRef?.nativeElement.swiper;
    this.swiperParent?.mousewheel.enable();

    this.swiperChild = this.swiperChildRef?.nativeElement.swiper;
    this.swiperChild?.mousewheel.enable();

    /* Mouse scroll event handle */
    this.swiperParent?.on('scroll', (s, e) => {
      console.log('parentScroll', s.activeIndex, e);
      if (this.swiperParent?.allowSlideNext == false && e.deltaY > 0) {
        this.swiperChild?.slideNext();
      }
      if (this.swiperParent?.allowSlidePrev == false && e.deltaY < 0) {
        this.swiperChild?.slidePrev();
      }
      this.handleSwiperScrollEvent();
    });

    this.swiperChild?.on('scroll', (s, e) => {
      console.log('childScroll', s.activeIndex, e);
      this.handleSwiperScrollEvent();
    });

  }
}
