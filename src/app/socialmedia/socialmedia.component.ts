import { Component, OnInit } from '@angular/core';
import { SocialmediaService } from './socialmedia.service';
import { Routes, Router} from 'node_modules/@angular/router';
import { Socialmedia } from './socialmedia.model'

@Component({
  selector: 'app-socialmedia',
  templateUrl: './socialmedia.component.html',
  styleUrls: ['./socialmedia.component.scss']
})
export class SocialmediaComponent implements OnInit {


  response: any[]=[];
  socialmedias: Socialmedia[] = []
  email: any[] = []

  constructor(private socialmediaService: SocialmediaService, public router: Router) { }

  ngOnInit(): void {

    this.socialmediaService.getSocialmedias().subscribe(
      payload => {
        this.socialmedias = payload
        this.email.push(this.socialmedias[0])
        this.socialmedias.shift()
        console.log(this.socialmedias, this.email)
      }
    )
  }

}
