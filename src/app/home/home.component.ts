import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { trigger, transition, animate, style } from '@angular/animations';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('carouselAnimation', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ]),
      transition('* => void', [
        animate('300ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  slides = [
    's1', 's2', 's3'
  ]

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

}
