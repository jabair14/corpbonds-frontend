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
import { iconsArray } from './../../../assets/data/icons';
import { dialcodes } from 'src/assets/data/dialcodes';

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
  dialcodes: any = [];
  code: any;
  num: string = '';

  chooseIcon: boolean = false;
  icons: any[] = [];
  iconVal: number = 0;
  MFA: boolean = true;

  constructor(private user: UserService, private router: Router) {
    this.icons = iconsArray;
  }

  ngOnInit(): void {
    this.dialcodes = dialcodes;
    this.user.postAccount().subscribe((data) => {
      if (data.body.message === 'login') {
        this.router.navigate(['/login']);
      } else if (data.body.message === 'success') {
        console.log(data);
        this.iconVal = data.body.data.settings.icon;
        this.MFA = data.body.data.settings.MFA;
      } else {
        this.router.navigate(['/account']);
      }
    });
  }

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

  iconSet(x: number) {
    this.iconVal = x;
    console.log(this.iconVal);
  }

  iconPost() {
    this.user.postIcon({ icon: this.iconVal }).subscribe((data) => {
      this.chooseIcon = false;
    });
  }

  postSettings() {
    this.user
      .postSettings({ icon: this.iconVal, MFA: this.MFA, phoneNumber: `${this.code}${this.num}`})
      .subscribe((data) => {
        this.chooseIcon = false;
      });
  }


}
