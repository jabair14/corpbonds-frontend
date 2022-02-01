import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [
    trigger('bottomFade', [
      state('void', style({ opacity: 0, transform: 'translateY(2rem)' })),
      state('*', style({ opacity: 1, transform: 'translateY(0)' })),
      transition(':enter', [animate(500), style({ opacity: 1 })]),
    ]),
  ],
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
