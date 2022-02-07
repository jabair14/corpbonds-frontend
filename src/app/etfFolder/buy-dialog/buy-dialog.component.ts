import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/user.service';
import { EtfService } from '../etf.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-buy-dialog',
  templateUrl: './buy-dialog.component.html',
  styleUrls: ['./buy-dialog.component.scss'],
})
export class BuyDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    public etfService: EtfService
  ) {}

  numberInputFormControl = new FormControl('', [Validators.required])

  receivedEtfData: any = [];
  receivedUserData: any = [];

  ngOnInit(): void {
    console.log('BUYING DIALOG OPEN', this.data);
    this.receivedEtfData = this.data;
    this.userService.postAccount().subscribe(payload => {
      console.log("user info passed along:", payload)
    })
  }



}
