import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { SocialmediaComponent } from './socialmedia/socialmedia.component';
import { SocialmediaService } from './socialmedia/socialmedia.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'capstone-frontend';
  imageSrc = "./assets/default-monochrome.svg"
  imageAlt = "logo"

  socialmedias = []

  constructor(private router:Router, private socialmediaService: SocialmediaService){}

  ngOnInit(): void {
    this.socialmediaService.getSocialmedias().subscribe(
      payload => {
        this.socialmedias = payload.map((social: string) => social.link)
        console.log(this.socialmedias)
      }
    )
  }

  scrollToTop() {
    let element = document.getElementById("top")!;
    element.scrollIntoView({behavior: 'smooth'});
  }
}

