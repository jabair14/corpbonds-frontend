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
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.scss'],
  animations: [
    trigger('bottomFade', [
      state('void', style({ opacity: 0, transform: 'translateY(2rem)' })),
      state('*', style({ opacity: 1, transform: 'translateY(0)' })),
      transition(':enter', [animate(500), style({ opacity: 1 })]),
    ]),
  ],
})
export class ResetPassComponent implements OnInit {
  passObj: any = {
    email: '',
  };
  constructor(private user: UserService, private router: Router) {}

  error: string = '';

  ngOnInit(): void {}

  postEmail() {
    this.user.postPass(this.passObj).subscribe(() => {
      alert('Check your Email!');
      this.router.navigate(['/login']);
    });
  }
}
