import { Component, Injectable, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { MutualFundsComponent } from '../mutual-funds/mutual-funds.component';

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-mutual-funds-sidenav',
  templateUrl: './mutual-funds-sidenav.component.html',
  styleUrls: ['./mutual-funds-sidenav.component.scss']
})

export class MutualFundsSidenavComponent implements OnInit {

  constructor(private mutualFundsComponent: MutualFundsComponent,
              private appComponent: AppComponent) { }

  overview: boolean = true;
  performance: boolean = false;
  price: boolean = false;

  searchKey: string = '';

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.mutualFundsComponent.applyFilterTable(filterValue);
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
        this.mutualFundsComponent.displayedColumns = this.mutualFundsComponent.displayedColumnsOverview;
        break;
      case 'performance':
        this.clearChangeTable();
        this.performance = true;
        this.mutualFundsComponent.displayedColumns = this.mutualFundsComponent.displayedColumnsPerformance;
        break;
      case 'price':
        this.clearChangeTable();
        this.price = true;
        this.mutualFundsComponent.displayedColumns = this.mutualFundsComponent.displayedColumnsPrice;
        break
    }
  }

  scrollToTableTop() {
    this.mutualFundsComponent.scrollToTop();
  }

  scrollToPageTop() {
    this.appComponent.scrollToTop();
  }

}
