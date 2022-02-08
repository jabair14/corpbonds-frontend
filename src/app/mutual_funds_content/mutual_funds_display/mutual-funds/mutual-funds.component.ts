import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { MutualFundsService } from '../mutual-funds.service';
import { MutualFunds } from './mutual-funds.model';
import { MutualFundsTableComponent } from '../mutual-funds-table/mutual-funds-table.component';
import { MutualFundsDialogComponent } from '../mutual-funds-dialog/mutual-funds-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-mutual-funds',
  templateUrl: './mutual-funds.component.html',
  styleUrls: ['./mutual-funds.component.scss']
})

export class MutualFundsComponent implements OnInit {

  constructor(private mutualFundsService: MutualFundsService,
              private dialog: MatDialog,) { }

  @ViewChild(MutualFundsTableComponent) mutualFundsTableComponent!: MutualFundsTableComponent;

  mutualFunds: MutualFunds[] = []

  displayedColumnsOverview: string[] = [
    'name', //'ticker',
    'assetClass', 'risk', 'expenseRatio',
  ]

  displayedColumnsPerformance: string[] = [
    'name', //'ticker',
    'secYield', 'ytd', 'oneYr', 'threeYr', 'fiveYr', 'tenYr', 'sinceInception',
  ]

  displayedColumnsPrice: string[] = [
    'name', //'ticker',
    'initialInvestment', 'price', 'changePrice' // 'changePricePercent'
  ]

  displayedColumnsAll: string[] = [
    'name', //'ticker',
    'assetClass', 'risk', 'expenseRatio',
    'secYield', 'ytd', 'oneYr', 'threeYr', 'fiveYr', 'tenYr', 'sinceInception',
    'initialInvestment', 'price', 'changePrice' // 'changePricePercent'
  ]

  displayedColumns: string[] = []

  tempMutualFund: any = {
    ticker: "", name: "",
    assetClass: "", risk: "", expenseRatio: 0,
    secYield: 0, ytd: 0, oneYr: 0, threeYr: 0, fiveYr: 0, tenYr: 0, sinceInception: 0,
    initialInvestment: 0, price: 0, changePrice: 0, chanePricePercent: 0
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.mutualFundsService.getMutualFunds().subscribe(data => {
      this.mutualFunds = data;
    })
  }

  getSingleData(mutualFundId: any) {
    this.mutualFundsService.getSingleMutualFund(mutualFundId).subscribe(data => {
      this.getData();
      this.tempMutualFund = data;
    })
  }

  applyFilterTable(filterValue: string) {
    this.mutualFundsTableComponent.dataSource.filter = filterValue.trim().toLowerCase();
  }

  scrollToTop() {
    let element = document.getElementById("tableTop")!;
    element.scrollIntoView({behavior: 'smooth'});
  }

  openMutualFundsDialog() {
    this.dialog.open(MutualFundsDialogComponent);
  }

}
