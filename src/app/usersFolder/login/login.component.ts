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

  ngOnInit(): void {}
  postMe() {
    this.userService.postLogin(this.loginObj).subscribe((data: any) => {
      // let { domain, httpOnly, secure, path, expires } = data.body.cookie;
      // this.cookie.set(
      //   'session',
      //   data.body.sessionID,
      //   new Date(expires),
      //   path,
      //   domain,
      //   secure,
      //   sameSite
      // );
      if (data.body.status === 'success') {
        this.router.navigate(['/account']);
      }
      console.log(`I'm the response`, data.body);
    });
  }
}
