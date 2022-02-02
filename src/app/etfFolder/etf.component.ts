import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EtfService } from './etf.service';
import { ETF } from './etf.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogEtfComponent } from './dialog-etf/dialog-etf.component';
import { DialogSingleEtfComponent } from './dialog-single-etf/dialog-single-etf.component';

@Component({
  selector: 'app-etf',
  templateUrl: './etf.component.html',
  styleUrls: ['./etf.component.scss'],
})
export class EtfComponent implements OnInit {
  constructor(
    private etfService: EtfService,
    private http: HttpClient,
    public dialog: MatDialog,
  ) {}


  etfData: ETF[] = [];
  dataSource: any = new MatTableDataSource(this.etfData);
  searchKey: string = '';
  config: any;

  tableConfig: string[] = [
    'id',
    'fund_symbol',
    'fund_long_name',
    'fund_family',
    'total_net_assets',
    'fund_yield',
    'fund_annual_report_net_expense_ratio',
    'category_return_ytd',
    'fund_return_ytd',
    'week52_high_change',
    'week52_low_change',
    'inception_date',
    'exchange_name',
    'actions',
  ];

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.etfService.getETFs().subscribe((payload) => {
      this.dataSource = payload;
      this.config = {
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: this.dataSource.length
      };
    });
  }

  applyFilter(filterValue: any) {
    this.dataSource = this.dataSource.filter((el: any) => {
      return el.fund_long_name.toLowerCase().match(filterValue.toLowerCase());
    });
  }

  // clears the search input field / functionality
  applyClear() {
    this.searchKey = '';
    this.ngOnInit();
  }

  // opens the ETF general information dialog
  openDialog() {
    this.dialog.open(DialogEtfComponent);
  }

  // opens a selected ETF expanded information dialog
  openSingleETF(data: any) {
    console.log('this is the incoming id:', data);
    this.dialog.open(DialogSingleEtfComponent, {data: data})
  }

  // changes table page 
  pageChanged(event: any){
    this.config.currentPage = event;
  }
}
