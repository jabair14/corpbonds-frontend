import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss'],
  animations: [
    trigger('bottomFade', [
      state('void', style({ opacity: 0, transform: 'translateY(2rem)' })),
      state('*', style({ opacity: 1, transform: 'translateY(0)' })),
      transition(':enter', [animate(700), style({ opacity: 1 })]),
    ]),
    trigger('rightFade', [
      state('void', style({ opacity: 0, transform: 'translateX(3rem)' })),
      state('*', style({ opacity: 1, transform: 'translateX(0)' })),
      transition(':enter', [animate(300), style({ opacity: 1 })]),
    ]),
  ],
})
export class AccountSettingsComponent implements OnInit {
  constructor(private user: UserService, private router: Router) {}

  ngOnInit(): void {}

  async logOut() {
    try {
      this.user.postLogOut().subscribe((data) => {
        console.log('logged out!', data);
        this.router.navigate(['/login']);
      });
    } catch (e) {
      console.log(e);
      this.router.navigate(['/login']);
    }
  }
}
