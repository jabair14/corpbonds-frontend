import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EtfService } from '../etf.service';
import { ETF } from './etf.model'
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-etf',
  templateUrl: './etf.component.html',
  styleUrls: ['./etf.component.scss']
})
export class EtfComponent implements OnInit {

  constructor(
    private etfService: EtfService,
    private http: HttpClient
  ) { }

  etfData: ETF[] = [];
  // dataSource = new MatTableDataSource<any>(this.etfData)
  // @ViewChild(MatSort, { static: false }) sort!: MatSort;
  // @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  searchKey: string = '';
  

  tableConfig: string[] = [
    "name", 
    "ticker", 
    "assetClass", 
    "expenseRatio", 
    "price", 
    "change", 
    "SEC_yield", 
    "YTD", 
    "oneYear", 
    "fiveYear", 
    "tenYear", 
    "sinceInception",
    "actions"
  ];

  ngOnInit(): void {
    this.etfService.getETFs().subscribe(payload => {
      console.log("this is the ETF data:", payload);
      this.etfData = payload;
      // this.dataSource.sort = this.sort;
      // this.dataSource.paginator = this.paginator;


      console.log("look at dis data", this.etfData)
    })
  }

  // applyFilter(){
  //   this.etfData[1].filter = this.searchKey.trim().toLocaleLowerCase();
  // }

}
