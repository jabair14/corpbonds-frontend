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
import { MatDialog } from '@angular/material/dialog';
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
    trigger('rightFade', [
      state('void', style({ opacity: 0, transform: 'translateX(3rem)' })),
      state('*', style({ opacity: 1, transform: 'translateX(0)' })),
      transition(':enter', [animate(500), style({ opacity: 1 })]),
    ]),
  ],
})
export class AccountsComponent implements OnInit {
  unpressed: boolean = true;
  flaggy: boolean = false;

  dialcodes: any = [];

  ///////////////////////////////Account redirection
  redir: boolean = false;
  accountDis: boolean = false;

  /////////////////////////////////Account Object for creation
  enableMFA: boolean = false;
  code: any;
  num: string = '';
  accountObj: any = {};
  name: string = '';
  balance: any;
  ver = {
    verificationCode: '',
  };

  add: string = '0';

  profPic: string = '';
  /////////////////////////////////////////constructor

  constructor(
    private user: UserService,
    private router: Router,
    private cookie: CookieService,
    public dialog: MatDialog
  ) {}

  ////////////////////////////////////////////////Init function
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
      } else if (data.body.message === 'success') {
        this.redir = false;
        this.accountDis = true;
        console.log(data.body);
        this.name = data.body.name.split(' ')[0].toLowerCase();
        this.balance = Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(data.body.data.Account_Balance);
        this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1);
        this.profPic = `./../../../assets/userIcons/${data.body.data.settings.icon}.png`;
        console.log(this.profPic);
      }
    });
  }

  //////////////////////////////Functions

  postMe() {
    this.accountObj.MFA = this.enableMFA;
    this.accountObj.phone = `${this.code}${this.num}`;
    console.log(this.accountObj, this.enableMFA, this.code, this.num);
    this.user.postMakeAcct(this.accountObj).subscribe((data) => {
      this.ngOnInit();
    });
  }

  openDialog() {
    let dialogRef = this.dialog.open(VerifyDialogComponent, {
      panelClass: 'textVerBox',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('Im closed');
      this.user.postVerCode(result).subscribe((data) => {
        console.log(data);
        if (data.body.valid) this.ngOnInit();
        else if (!data.body.valid) this.openDialog();
      });
    });
  }

  postBal() {
    this.user.postBalance({ change: parseInt(this.add) }).subscribe((data) => {
      console.log('balance added', this.add);
      this.ngOnInit();
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
}
