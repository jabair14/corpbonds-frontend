import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MutualFundsComponent } from '../mutual-funds/mutual-funds.component';
import { MutualFunds } from '../mutual-funds/mutual-funds.model';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-mutual-funds-table',
  templateUrl: './mutual-funds-table.component.html',
  styleUrls: ['./mutual-funds-table.component.scss']
})
export class MutualFundsTableComponent implements OnInit {

  constructor(private mutualFundsComponent: MutualFundsComponent,
              private liveAnnouncer: LiveAnnouncer) { }

  dataSource: any =  new MatTableDataSource<MutualFunds>(this.mutualFundsComponent.mutualFunds);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

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

  ngOnInit(): void {
    setTimeout(()=> {
      this.getTableData();
    }, 2000);
  }

  getTableData() {
    this.mutualFundsComponent.getData();
    this.dataSource = new MatTableDataSource(this.mutualFundsComponent.mutualFunds);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.displayedColumns = this.displayedColumnsOverview;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction} ending`);
    }
    else {
      this.liveAnnouncer.announce(`Sorting cleared`);
    }
  }

}
