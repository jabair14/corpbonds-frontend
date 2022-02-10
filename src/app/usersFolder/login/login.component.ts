import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/user.service';
import { Router } from '@angular/router';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('bottomFade', [
      state('void', style({ opacity: 0, transform: 'translateY(2rem)' })),
      state('*', style({ opacity: 1, transform: 'translateY(0)' })),
      transition(':enter', [animate(500), style({ opacity: 1 })]),
    ]),
  ],
})
export class LoginComponent implements OnInit {
  loginObj: { email: string; password: string } = {
    email: '',
    password: '',
  };
  constructor(
    private userService: UserService,
    private cookie: CookieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cookieCheck();
  }

  postMe() {
    this.userService.postLogin(this.loginObj).subscribe((data: any) => {
      if (data.body.status === 'success') {
        this.router.navigate(['/account']);
      }
      console.log(`I'm the response`, data.body);
    });
  }

  async cookieCheck() {
    try {
      this.userService.whoAmI().subscribe((data) => {
        if (data.body.status === 'ok') this.router.navigate(['/account']);
      });
    } catch (err) {
      console.log(err);
    }
  }
}
