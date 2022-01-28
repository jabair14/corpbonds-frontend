import { Component, OnInit } from '@angular/core';
import { StocksService } from '../stocks.service';
import { Stock } from './stock.model'
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss']
})
export class StocksComponent implements OnInit {
  data: Stock[] =[];
  term: string = ""
  idDir: boolean = true //true is a -> z, low -> high,   false is opposite 
  ipoYearDir: boolean = true
  lastSaleDir: boolean = true
  netChangeDir: boolean = true
  percentChangeDir: boolean = true
  marketCapDir: boolean = true
  volumeDir: boolean = true
  config: any
  constructor(private stocksService: StocksService) { }

  async ngOnInit(): Promise<void> {
    await this.stocksService.getStocks().subscribe(payload => {
      //this.data.push(...payload.sort(this.sortbyId));
      this.data = payload
      console.log(this.data)
      this.config = {
        id: "custom",
        itemsPerPage: 100,
        currentPage: 1,
        totalItems: this.data.length
      }
    })
  }

  reorderId(): void {
    let tempBool = this.idDir
    this.resetArrows()
    this.idDir = tempBool
    if(this.idDir) {
      this.data = this.data.sort(
        (a:any, b:any) => b.id - a.id
      )
    } else {
      this.data = this.data.sort(
        (a:any, b:any) => a.id - b.id 
      )
    }
    this.idDir = !this.idDir
  }


  reorderIpoYear(): void {
    let tempBool = this.ipoYearDir
    this.resetArrows()
    this.ipoYearDir = tempBool
    if(this.ipoYearDir) {
      this.data = this.data.sort(
        (a:any, b:any) => b.ipoYear - a.ipoYear
      )
    } else {
      this.data = this.data.sort(
        (a:any, b:any) => a.ipoYear - b.ipoYear 
      )
    }
    this.ipoYearDir = !this.ipoYearDir
  }

  reorderlastSale(): void {
    let tempBool = this.lastSaleDir
    this.resetArrows()
    this.lastSaleDir = tempBool
    if(this.lastSaleDir) {
      this.data = this.data.sort(
        (a:any, b:any) => b.dynamicInfo.lastSale - a.dynamicInfo.lastSale
      )
      console.log("potentially new data", this.data)
    } else {
      this.data = this.data.sort(
        (a:any, b:any) => a.dynamicInfo.lastSale - b.dynamicInfo.lastSale 
      )
    }
    this.lastSaleDir = !this.lastSaleDir
  }

  reordernetChange(): void {
    let tempBool = this.netChangeDir
    this.resetArrows()
    this.netChangeDir = tempBool
    if(this.netChangeDir) {
      this.data = this.data.sort(
        (a:any, b:any) => b.dynamicInfo.netChange - a.dynamicInfo.netChange
      )
      console.log("potentially new data", this.data)
    } else {
      this.data = this.data.sort(
        (a:any, b:any) => a.dynamicInfo.netChange - b.dynamicInfo.netChange 
      )
    }
    this.netChangeDir = !this.netChangeDir
  }

  reorderpercentChange(): void {
    let tempBool = this.percentChangeDir
    this.resetArrows()
    this.percentChangeDir = tempBool
    if(this.percentChangeDir) {
      this.data = this.data.sort(
        (a:any, b:any) => b.dynamicInfo.percentChange - a.dynamicInfo.percentChange
      )
      console.log("potentially new data", this.data)
    } else {
      this.data = this.data.sort(
        (a:any, b:any) => a.dynamicInfo.percentChange - b.dynamicInfo.percentChange 
      )
    }
    this.percentChangeDir = !this.percentChangeDir
  }

  reordermarketCap(): void {
    let tempBool = this.marketCapDir
    this.resetArrows()
    this.marketCapDir = tempBool
    if(this.marketCapDir) {
      this.data = this.data.sort(
        (a:any, b:any) => b.dynamicInfo.marketCap - a.dynamicInfo.marketCap
      )
      console.log("potentially new data", this.data)
    } else {
      this.data = this.data.sort(
        (a:any, b:any) => a.dynamicInfo.marketCap - b.dynamicInfo.marketCap 
      )
    }
    this.marketCapDir = !this.marketCapDir
  }

  reordervolume(): void {
    let tempBool = this.volumeDir
    this.resetArrows()
    this.volumeDir = tempBool
    if(this.volumeDir) {
      this.data = this.data.sort(
        (a:any, b:any) => b.dynamicInfo.volume - a.dynamicInfo.volume
      )
      console.log("potentially new data", this.data)
    } else {
      this.data = this.data.sort(
        (a:any, b:any) => a.dynamicInfo.volume - b.dynamicInfo.volume 
      )
    }
    this.volumeDir = !this.volumeDir
  }

  resetArrows(): void {
    this.idDir = true;
    this.ipoYearDir = true;
    this.lastSaleDir = true;
    this.netChangeDir = true;
    this.percentChangeDir = true;
    this.marketCapDir = true;
    this.volumeDir = true;
  }
  

  sortbyId(a:any, b:any) {a.id - b.id}
  sortbyName(a:any, b:any) {a.name - b.name}
  sortbycountry(a:any, b:any) {a.country - b.country}
  sortbyipoYear(a:any, b:any) {a.ipoYear - b.ipoYear}
  sortbylastSale(a:any, b:any) {a.lastSale - b.lastSale}

}
