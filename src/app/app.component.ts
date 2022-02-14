import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SocialmediaComponent } from './socialmedia/socialmedia.component';
import { SocialmediaService } from './socialmedia/socialmedia.service';
import { filter } from 'rxjs';
import { CreatePurchasesComponent } from './purchasesPlace/createpurchases/createpurchases.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'capstone-frontend';
  imageSrc = './assets/default-monochrome.svg';
  imageAlt = 'logo';
  loc: any;
  socialmedias = [];

  ////// footer flag
  locFlag = true;

  //// no footer urls
  flagRoutes = [
    '/login',
    '/account',
    '/account/settings',
    '/register',
    '/register/*',
  ];

  constructor(
    private router: Router,
    private socialmediaService: SocialmediaService,
    private location: Location
  ) {
    this.loc = location.onUrlChange((val) => {
      if (this.flagRoutes.some((el) => val == el)) {
        this.locFlag = false;
      } else {
        this.locFlag = true;
      }
    });
  }

  ngOnInit(): void {
    this.socialmediaService.getSocialmedias().subscribe((payload) => {
      this.socialmedias = payload.map((social: string) => social.link);
      console.log(this.socialmedias);
    });
  }

  scrollToTop() {
    let element = document.getElementById('top')!;
    element.scrollIntoView({ behavior: 'smooth' });
  }
}
