import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-pass-token',
  templateUrl: './pass-token.component.html',
  styleUrls: ['./pass-token.component.scss'],
  animations: [
    trigger('bottomFade', [
      state('void', style({ opacity: 0, transform: 'translateY(2rem)' })),
      state('*', style({ opacity: 1, transform: 'translateY(0)' })),
      transition(':enter', [animate(500), style({ opacity: 1 })]),
    ]),
  ],
})
export class PassTokenComponent implements OnInit {
  tokenObj: any = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private user: UserService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param: any) => {
      this.tokenObj.token = param.token;
    });
  }

  postToken() {
    this.user.postPassToken(this.tokenObj).subscribe((data) => {
      console.log(data);
    });
  }
}
