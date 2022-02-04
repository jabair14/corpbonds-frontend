import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/user.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { dialcodes } from 'src/assets/data/dialcodes';
import { MatDialog } from '@angular/material';
import { VerifyDialogComponent } from '../verify-dialog/verify-dialog.component';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
  animations: [
    trigger('bottomFade', [
      state('void', style({ opacity: 0, transform: 'translateY(2rem)' })),
      state('*', style({ opacity: 1, transform: 'translateY(0)' })),
      transition(':enter', [animate(500), style({ opacity: 1 })]),
    ]),
  ],
})
export class AccountsComponent implements OnInit {
  unpressed: boolean = true;

  dialcodes: any = [];

  redir: boolean = false;

  enableMFA: boolean = false;
  code: any;
  num: string = '';
  accountObj: any = {};

  name: string = '';

  balance: string = '';

  constructor(
    private user: UserService,
    private router: Router,
    private cookie: CookieService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.dialcodes = dialcodes;
    this.user.postAccount().subscribe((data) => {
      if (data.body.message === 'login') {
        this.router.navigate(['/login']);
      }
      if (data.body.message === 'redirect') {
        this.redir = true;
      } else if (data.body.message === 'MFArequired') {
        this.openDialog();
        // this.router.navigate(['/verify']);
      } else {
        this.redir = false;
        console.log(data.body);
        this.name = data.body.name.split(' ')[0].toLowerCase();
        this.balance = data.body.data.Account_Balance.toFixed(2);
        this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1);
      }
    });
  }

  postMe() {
    this.accountObj.MFA = this.enableMFA;
    // this.accountObj.MFA = false;
    this.accountObj.phone = `${this.code}${this.num}`;
    console.log(this.accountObj, this.enableMFA, this.code, this.num);
    this.user.postMakeAcct(this.accountObj).subscribe((data) => {
      console.log('Im workin here', data);
      this.ngOnInit();
    });
  }

  openDialog() {
    this.dialog.open(VerifyDialogComponent);
  }
}
