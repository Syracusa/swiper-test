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

  @ViewChild('swiperGrandChildRef')
  swiperGrandChildRef: ElementRef | undefined;
  swiperGrandChild?: Swiper;

  handleSwiperScrollEvent() {
    if (this.swiperParent?.activeIndex === 1) {
      if (this.swiperChild?.activeIndex === 0) {
        this.swiperParent!.allowSlideNext = false;
        this.swiperParent!.allowSlidePrev = true;

        this.swiperChild!.allowSlideNext = true;
        this.swiperChild!.allowSlidePrev = true;
      } else if (this.swiperChild?.activeIndex === 1) {

        this.swiperParent!.allowSlidePrev = false;
        this.swiperParent!.allowSlideNext = false;

        if (this.swiperGrandChild?.activeIndex === 0) {
          this.swiperChild!.allowSlideNext = false;
          this.swiperChild!.allowSlidePrev = true;
        } else if (this.swiperGrandChild?.activeIndex === 2) {
          this.swiperChild!.allowSlideNext = true;
          this.swiperChild!.allowSlidePrev = false;
          
          this.swiperParent!.allowSlideNext = true;
        } else {
          this.swiperChild!.allowSlideNext = false;
          this.swiperChild!.allowSlidePrev = false;
        }
      } else {
        this.swiperParent!.allowSlideNext = false;
        this.swiperParent!.allowSlidePrev = false;

        this.swiperChild!.allowSlideNext = true;
        this.swiperChild!.allowSlidePrev = true;
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
    this.swiperGrandChild = this.swiperGrandChildRef?.nativeElement.swiper;

    /* Mouse scroll event handle */
    this.swiperParent?.on('scroll', (s, e) => {
      console.log('parentScroll', s.activeIndex, e);
      if (this.swiperParent?.allowSlideNext == false && e.deltaY > 0) {
        if (this.swiperChild?.allowSlideNext == true) {
          this.swiperChild?.slideNext();
        } else {
          this.swiperGrandChild?.slideNext();
        }
      }
      if (this.swiperParent?.allowSlidePrev == false && e.deltaY < 0) {
        if (this.swiperChild?.allowSlidePrev == true) {
          this.swiperChild?.slidePrev();
        } else {
          this.swiperGrandChild?.slidePrev();
        }
      }
      this.handleSwiperScrollEvent();
    });
  }
}
