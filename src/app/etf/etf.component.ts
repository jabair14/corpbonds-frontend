import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EtfService } from './etf.service';
import { ETF } from './etf.model'
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-etf',
  templateUrl: './etf.component.html',
  styleUrls: ['./etf.component.scss']
})

export class EtfComponent implements OnInit, AfterViewInit {

  constructor(
    private etfService: EtfService,
    private http: HttpClient
  ) { }

  etfData: ETF[] = [];
  dataSource: any = new MatTableDataSource<ETF>(this.etfData)
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
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
      this.dataSource = payload;

    })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: any){
   this.dataSource = this.dataSource.filter((el: any) => {
    return el.name.toLowerCase().includes(filterValue.toLowerCase()) 
    }) 
  }

  applyClear(){
     this.searchKey = ''
     this.ngOnInit()
  }

}
