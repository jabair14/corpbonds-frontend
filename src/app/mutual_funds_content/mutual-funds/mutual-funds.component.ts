import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MutualFundsService } from '../mutual-funds.service';
import { MutualFunds } from './mutual-funds.model';

@Component({
  selector: 'app-mutual-funds',
  templateUrl: './mutual-funds.component.html',
  styleUrls: ['./mutual-funds.component.scss']
})
export class MutualFundsComponent implements OnInit {

  constructor(private mutualFundsService: MutualFundsService,
              private liveAnnouncer: LiveAnnouncer) { }

  overview: boolean = true;
  performance: boolean = false;
  price: boolean = false;

  searchKey: string = '';

  mutualFunds: MutualFunds[] = []
  dataSource: any =  new MatTableDataSource<MutualFunds>(this.mutualFunds)

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

  tempMutualFund: any = {
    ticker: "", name: "",
    assetClass: "", risk: "", expenseRatio: 0,
    secYield: 0, ytd: 0, oneYr: 0, threeYr: 0, fiveYr: 0, tenYr: 0, sinceInception: 0,
    initialInvestment: 0, price: 0, changePrice: 0, chanePricePercent: 0
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.getData();
    }, 1000)
  }

  getData() {
    this.mutualFundsService.getMutualFunds().subscribe(data => {
      this.mutualFunds = data;

      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.displayedColumns = this.displayedColumnsOverview;
    })
  }

  getSingleData(mutualFundId: any) {
    this.mutualFundsService.getSingleMutualFund(mutualFundId).subscribe(data => {
      this.getData();
      this.tempMutualFund = data;
    })
  }

  clearChangeTable() {
    this.overview = false;
    this.performance = false;
    this.price = false;
  }

  changeTable(value: string) {
    switch(value) {
      case 'overview':
        this.clearChangeTable();
        this.overview = true;
        this.displayedColumns = this.displayedColumnsOverview;
        break;
      case 'performance':
        this.clearChangeTable();
        this.performance = true;
        this.displayedColumns = this.displayedColumnsPerformance;
        break;
      case 'price':
        this.clearChangeTable();
        this.price = true;
        this.displayedColumns = this.displayedColumnsPrice;
        break
    }
  }

  // syncPrimaryPaginator(event: PageEvent) {
  //   this.paginator.pageIndex = event.pageIndex;
  //   this.paginator.pageSize = event.pageSize;
  //   this.paginator.page.emit(event);
  // }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction} ending`);
    }
    else {
      this.liveAnnouncer.announce(`Sorting cleared`);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    
    // this.dataSource.filter = this.dataSource.filter((element: any) => {
    //   element.name.toLowerCase().includes(filterValue.trim().toLowerCase())
    // })

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // filterTable() {
  //   this.dataSource.filterPredicate = (data: MutualFunds, filter: string)  => {
  //       !filter || data.name == filter;
  //   }
  // }

}
