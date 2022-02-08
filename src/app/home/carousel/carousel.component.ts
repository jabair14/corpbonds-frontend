import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  @Input() slides: any;
  currentSlide = 0;

  constructor() { }

  ngOnInit(): void {
    
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
