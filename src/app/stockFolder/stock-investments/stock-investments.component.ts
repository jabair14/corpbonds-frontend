import { Component, OnInit } from '@angular/core';
import { StocksService } from 'src/app/stocks.service';
import { Investment } from '../stock-invest-modal/investment.model';

@Component({
  selector: 'app-stock-investments',
  templateUrl: './stock-investments.component.html',
  styleUrls: ['./stock-investments.component.scss']
})
export class StockInvestmentsComponent implements OnInit {
  config: any
  term: string = ""
  idDir: boolean = true //true is a -> z, low -> high,   false is opposite 
  stockIdDir: boolean = true
  numSharesDir: boolean = true
  ipoYearDir: boolean = true
  showDir: boolean = false
  investments:Investment[] = []
  constructor(private stockService:StocksService) { }

  ngOnInit(): void {
    this.stockService.getInvestments("mat123").subscribe(payload => {
      this.investments = payload
      console.log(this.investments)
      this.config = {
        id: "custom",
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: this.investments.length
      }
    })
  }

  resetFilters() {
    this.resetArrows()
    this.term = ""
    this.idDir = false
    this.reorderId();
  }

  reorderId(): void {
    let tempBool = this.idDir
    this.resetArrows()
    this.idDir = tempBool
    if(this.idDir) {
      this.investments = this.investments.sort(
        (a:any, b:any) => b.id - a.id
      )
    } else {
      this.investments = this.investments.sort(
        (a:any, b:any) => a.id - b.id 
      )
    }
    this.idDir = !this.idDir
  }

  reorderStockId(): void {
    let tempBool = this.stockIdDir
    this.resetArrows()
    this.stockIdDir = tempBool
    if(this.stockIdDir) {
      this.investments = this.investments.sort(
        (a:any, b:any) => b.stockId - a.stockId
      )
    } else {
      this.investments = this.investments.sort(
        (a:any, b:any) => a.stockId - b.stockId 
      )
    }
    this.stockIdDir = !this.stockIdDir
  }


  reorderNumShares(): void {
    let tempBool = this.numSharesDir
    this.resetArrows()
    this.numSharesDir = tempBool
    if(this.numSharesDir) {
      this.investments = this.investments.sort(
        (a:any, b:any) => b.numShares - a.numShares
      )
    } else {
      this.investments = this.investments.sort(
        (a:any, b:any) => a.numShares - b.numShares 
      )
    }
    this.numSharesDir = !this.numSharesDir
  }

  reorderIpoYear(): void {
    let tempBool = this.ipoYearDir
    this.resetArrows()
    this.ipoYearDir = tempBool
    if(this.ipoYearDir) {
      this.investments = this.investments.sort(
        (a:any, b:any) => b.stock.ipoYear - a.stock.ipoYear
      )
    } else {
      this.investments = this.investments.sort(
        (a:any, b:any) => a.stock.ipoYear - b.stock.ipoYear 
      )
    }
    this.ipoYearDir = !this.ipoYearDir
  }

  


  resetArrows(): void {
    this.idDir = true;
    this.ipoYearDir = true;
  }

}
