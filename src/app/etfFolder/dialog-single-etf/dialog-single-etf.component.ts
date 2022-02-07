import { Component, OnInit, Inject } from '@angular/core';
import { ETF } from '../etf.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { MatDialog } from '@angular/material/dialog';
import { BuyDialogComponent } from '../buy-dialog/buy-dialog.component';

@Component({
  selector: 'app-dialog-single-etf',
  templateUrl: './dialog-single-etf.component.html',
  styleUrls: ['./dialog-single-etf.component.scss'],
})
export class DialogSingleEtfComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private route: ActivatedRoute,
    private userService: UserService,
    public dialog: MatDialog,
  ) {}

  // hold user & single etf data
  receivedRow: any = {};
  userInformation: any = [];

  ngOnInit(): void {
    this.receivedRow = this.data;
    console.log('received single ETF:', this.receivedRow);
    this.userService.postAccount().subscribe(payload => {
      console.log("user information:", payload)
      this.userInformation = payload.body.data;
      console.log(this.userInformation)
    })
  }

  buyETF(): void {
    console.log("clicked buying option")
    console.log(this.userInformation)
    // check to see if user is logged in
    if(this.userInformation === undefined){
      alert("Please log in to access the buying portal")
    } else {
      this.dialog.open(BuyDialogComponent, {data: this.receivedRow})
    }
  }
}
