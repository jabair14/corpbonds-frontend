import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerObj: any = {
    siteName: 'http://localhost:4200',
  };
  constructor(private user: UserService, private router: Router) {}

  error: string = '';

  ngOnInit(): void {}
  postMe() {
    this.user.postRegister(this.registerObj).subscribe((data) => {
      this.router.navigate(['/home']);
    });
  }
}
