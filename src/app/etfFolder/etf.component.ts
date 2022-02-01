import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EtfService } from './etf.service';
import { ETF } from './etf.model';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DialogEtfComponent } from './dialog-etf/dialog-etf.component';
import { DialogSingleEtfComponent } from './dialog-single-etf/dialog-single-etf.component';

@Component({
  selector: 'app-etf',
  templateUrl: './etf.component.html',
  styleUrls: ['./etf.component.scss'],
})
export class EtfComponent implements OnInit, AfterViewInit {
  constructor(
    private etfService: EtfService,
    private http: HttpClient,
    public dialog: MatDialog,
  ) {}

  etfData: ETF[] = [];
  dataSource: any = new MatTableDataSource(this.etfData);
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  searchKey: string = '';

  tableConfig: string[] = [
    'name',
    'ticker',
    'assetClass',
    'expenseRatio',
    'price',
    'change',
    'SEC_yield',
    'YTD',
    'oneYear',
    'fiveYear',
    'tenYear',
    'sinceInception',
    'actions',
  ];

  ngOnInit(): void {
    this.etfService.getETFs().subscribe((payload) => {
      console.log('this is the ETF data:', payload);
      this.dataSource = payload;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: any) {
    this.dataSource = this.dataSource.filter((el: any) => {
      return el.name.toLowerCase().includes(filterValue.toLowerCase());
    });
  }

  applyClear() {
    this.searchKey = '';
    this.ngOnInit();
  }

  openDialog() {
    this.dialog.open(DialogEtfComponent);
  }

  openSingleETF(data: any) {
    console.log('this is the incoming id:', data);
    this.dialog.open(DialogSingleEtfComponent, {data: data})
  }
}
