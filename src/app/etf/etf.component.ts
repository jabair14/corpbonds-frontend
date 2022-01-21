import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EtfService } from '../etf.service';
import { ETF } from './etf.model'

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
    "sinceInception"
  ];

  ngOnInit(): void {
    this.etfService.getETFs().subscribe(payload => {
      console.log("this is the ETF data:", payload);
      this.etfData = payload;
  console.log("look at dis data", this.etfData)

    })
  }

}
