import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
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
