import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EtfService } from './etf.service';
import { ETF } from './etf.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogEtfComponent } from './dialog-etf/dialog-etf.component';
import { DialogSingleEtfComponent } from './dialog-single-etf/dialog-single-etf.component';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from '../user.service';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

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
    private liveAnnouncer: LiveAnnouncer,
    private userService: UserService,
    private router: Router,
  ) {}

  etfData: ETF[] = [];
  dataSource: any = new MatTableDataSource<ETF>(this.etfData);
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  searchKey: string = '';
  config: any;

  tableConfig: string[] = [
    'id',
    'fund_symbol',
    'fund_long_name',
    'fund_family',
    "price",
    'total_net_assets',
    'fund_yield',
    'fund_annual_report_net_expense_ratio',
    'fund_return_ytd',
    'inception_date',
    'exchange_name',
    'actions',
  ];

  ngOnInit(): void {
    this.getData();
  }

  // get ETF data from database
  getData(): void {
    this.etfService.getETFs().subscribe((payload) => {
      console.log('this is the table payload:', payload);
      this.dataSource = payload;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.config = {
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: this.dataSource.length,
      };
    });
  }

  // filter through ETF names
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
    this.dialog.open(DialogSingleEtfComponent, { data: data });
  }

  // changes table page
  pageChanged(event: any) {
    this.config.currentPage = event;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction} ending`);
    } else {
      this.liveAnnouncer.announce(`Sorting cleared`);
    }
  }

  // check to see if user is logged in before routing to investment portal
  openInvestments(): void {
    this.userService.whoAmI().subscribe((payload) => {
      console.log("WHO AM I INFO", payload.body)
      if(payload.body.userID){
        this.router.navigate(['etfs/investments'])
      } else {
        console.log("log in first before moving on")
      }
    })
  }
}
