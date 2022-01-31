import { Component } from '@angular/core';
import { Router } from '@angular/router'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'capstone-frontend';
  imageSrc = "./assets/default-monochrome.svg"
  imageAlt = "logo"

  constructor(private router:Router){}

  ngOnInit(): void {
  }
}

