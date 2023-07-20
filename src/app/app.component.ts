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
  
  ngAfterViewInit() {
    register();
    this.swiperParent = this.swiperParentRef?.nativeElement.swiper;
    this.swiperParent?.mousewheel.enable();
    
    /* Only enable child mousewheel if parent's activeIndex is 1 */
    // this.swiperParent?.on('slideChangeTransitionStart', () => {
    //   console.log('ParentSlideChangeTransitionStart', this.swiperParent?.activeIndex);
    //   if (this.swiperParent?.activeIndex === 1) {
    //     this.swiperChild?.mousewheel.enable();
    //   } else {
    //     this.swiperChild?.mousewheel.disable();
    //   }
    // });

    this.swiperParent?.on('slideChangeTransitionEnd', () => {
      console.log('ParentSlideChangeTransitionEnd', this.swiperParent?.activeIndex);
    });

    /* Mouse scroll event handle */
    this.swiperParent?.on('scroll', (s, e) => {
      console.log('scroll', s, e);
    });
    
    this.swiperChild = this.swiperChildRef?.nativeElement.swiper;
    this.swiperChild?.mousewheel.enable();
    this.swiperChild?.on('slideChangeTransitionEnd', () => {
      console.log('childSlideChangeTransitionEnd', this.swiperChild?.activeIndex);
    });


  }
}
