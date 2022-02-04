import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  slides = [
    { src: "https://g.foolcdn.com/editorial/images/537976/19_06_05-a-man-sitting-in-front-of-computer-screens-with-stock-information-on-them_gettyimages-944365476.jpg"},
    { src: "https://www.bankrate.com/2020/12/10104313/nyse-uber-ipo.jpg?auto=webp&optimize=high&crop=16:9"},
    { src: "https://www.gannett-cdn.com/-mm-/9e1f6e2ee20f44aa1f3be4f71e9f3e52b6ae2c7e/c=0-110-2121-1303/local/-/media/2020/11/21/USATODAY/usatsports/warren-buffetts-top-stock-buy.jpg?width=660&height=372&fit=crop&format=pjpg&auto=webp"}

  ]

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  goToStocks(): void {
    this.router.navigateByUrl('stocks')
  }
}
