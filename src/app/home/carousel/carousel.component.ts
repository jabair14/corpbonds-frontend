import { Component, Input, OnInit } from '@angular/core';
import {map, Subscription, timer} from 'rxjs';  
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  animations: [
    trigger('carouselAnimation', [
      transition(':enter', [
        style({ opacity: 0.5 }),
        animate('1s', style({ opacity: 1 }))
      ]),
    ])
  ]
})
export class CarouselComponent implements OnInit {
  @Input() slides: any;
  currentSlide = 0;
  timerSubscription: Subscription | undefined; 

  constructor() { }

  ngOnInit(): void {
    this.timerSubscription = timer(8000, 8000).pipe(
      map(()=> {
        this.onNextClick();
      })
    ).subscribe();
  }

  onPreviousClick() {
    if (this.slides == 's1'){
      this.slides = 's3';
    }
    else if (this.slides == 's2') {
      this.slides = 's1';
    }
    else if (this.slides == 's3') {
      this.slides = 's2';
    }
  }

  onNextClick() {
    if (this.slides == 's1'){
      this.slides = 's2';
    }
    else if (this.slides == 's2') {
      this.slides = 's3';
    }
    else if (this.slides == 's3') {
      this.slides = 's1';
    }
  }
}
