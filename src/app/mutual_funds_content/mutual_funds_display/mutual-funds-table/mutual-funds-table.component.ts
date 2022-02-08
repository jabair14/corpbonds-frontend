import { Component, Injectable, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MutualFundsComponent } from '../mutual-funds/mutual-funds.component';
import { MutualFunds } from '../mutual-funds/mutual-funds.model';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Injectable({
  providedIn: 'root',
})

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

  @Input() displayedColumns: any;

  ngOnInit(): void {
    setTimeout(()=> {
      this.getTableData();
    }, 1000);
  }

  getTableData() {
    this.mutualFundsComponent.getData();
    this.dataSource = new MatTableDataSource(this.mutualFundsComponent.mutualFunds);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.mutualFundsComponent.displayedColumns = this.mutualFundsComponent.displayedColumnsOverview;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction} ending`);
    }
    else {
      this.liveAnnouncer.announce(`Sorting cleared`);
    }
  }

  changeTableColumns(value: string) {
    switch(value) {
      case 'overview':
        this.mutualFundsComponent.displayedColumns = this.mutualFundsComponent.displayedColumnsOverview;
        break;
      case 'performance':
        this.mutualFundsComponent.displayedColumns = this.mutualFundsComponent.displayedColumnsPerformance;
        break;
      case 'price':
        this.mutualFundsComponent.displayedColumns = this.mutualFundsComponent.displayedColumnsPrice;
        break
    }
  }

}
