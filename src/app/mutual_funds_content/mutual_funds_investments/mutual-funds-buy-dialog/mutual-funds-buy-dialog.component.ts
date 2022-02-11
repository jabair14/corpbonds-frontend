import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MutualFundsInvestmentsComponent } from '../mutual-funds-investments/mutual-funds-investments.component';

@Component({
  selector: 'app-mutual-funds-buy-dialog',
  templateUrl: './mutual-funds-buy-dialog.component.html',
  styleUrls: ['./mutual-funds-buy-dialog.component.scss'],
  template: 'passed in {{ data }}'
})
export class MutualFundsBuyDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private mutualFundsInvestmentsComponent: MutualFundsInvestmentsComponent,
              public dialogRef: MatDialogRef<MutualFundsBuyDialogComponent>) { }

  assetsAmount: number = 1;
  totalPayment: number = this.data.tempMutualFund.initialInvestment + (this.assetsAmount * this.data.tempMutualFund.price);

  tempFolio: number = 0;
  todaysDate: Date = new Date();

  tempInvestment: any = {
    folioNumber: 0, shares: 0,
    purchaseDate: "", totalInvested:"", userId: 0, mutualFundId: 0
  }

  obj: any = {};
  change: number = 0;

  ngOnInit(): void {
    this.tempFolio = Math.floor(Math.random() * (1000000 - 1 + 1)) + 1;
  }

  addInvestment() {
    this.totalPayment = parseFloat((<HTMLInputElement>document.getElementById("purchaseInputId")).value);
    this.setInvestment();

    this.change = -1 * this.totalPayment;
    this.obj['change'] = this.change;
    this.changeBalance(this.obj);

    this.mutualFundsInvestmentsComponent.addInvestment(this.tempInvestment);
    this.dialogRef.close("Congratulations on your investment!");
  }

  setInvestment() {
    this.tempInvestment.folioNumber = this.data.tempMutualFund.id + 2218493 + this.tempFolio;
    this.tempInvestment.shares = this.assetsAmount;
    this.tempInvestment.purchaseDate = formatDate(this.todaysDate, 'MMMM d, y', 'en-US');
    this.tempInvestment.totalInvested = this.totalPayment;
    this.tempInvestment.userId = this.data.userId;
    this.tempInvestment.mutualFundId = this.data.tempMutualFund.id;
  }

  changeBalance(obj: any) {
    this.mutualFundsInvestmentsComponent.changeBalance(obj);
  }

}
