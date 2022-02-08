import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  slides = [
    's1', 's2', 's3'
  ]

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  goToStocks(): void {
    this.router.navigateByUrl('stocks')
  }
}
