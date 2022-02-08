import { Component, OnInit } from '@angular/core';
import { StocksService } from '../../stocks.service';
import { Stock } from './stock.model';
import { MatDialog } from '@angular/material/dialog';
import { StockInvestModalComponent } from '../stock-invest-modal/stock-invest-modal.component';
import { UserService } from 'src/app/user.service';


@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss']
})
export class StocksComponent implements OnInit {
  stocks: Stock[] =[];
  term: string = ""
  idDir: boolean = true //true is a -> z, low -> high,   false is opposite 
  ipoYearDir: boolean = true
  lastSaleDir: boolean = true
  netChangeDir: boolean = true
  percentChangeDir: boolean = true
  marketCapDir: boolean = true
  volumeDir: boolean = true
  show: boolean = false
  signedIn: boolean = false
  config: any
  constructor(
    private stocksService: StocksService,
    public dialog: MatDialog,
    private userService: UserService) { }

  async ngOnInit(): Promise<void> {
    await this.stocksService.getStocks().subscribe(payload => {
      this.userService.whoAmI().subscribe(payload => {
        console.log(payload)
        console.log("userId:", String(payload.body.userID))
        if(payload.body.userID) {
          this.signedIn = true;
        } else {
          this.signedIn = false;
        }
        
      })
      //this.data.push(...payload.sort(this.sortbyId));
      this.stocks = payload
      this.config = {
        id: "custom",
        itemsPerPage: 100,
        currentPage: 1,
        totalItems: this.stocks.length
      }
    })
  }

  openDialog(stock: Stock): void {
    const dialogRef = this.dialog.open(StockInvestModalComponent, {
      width: '400px',
      data: {stock: stock}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog Result: ${result}`);
    })
  }

  toggleModal() {
    this.show = !this.show
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
      this.stocks = this.stocks.sort(
        (a:any, b:any) => b.id - a.id
      )
    } else {
      this.stocks = this.stocks.sort(
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
      this.stocks = this.stocks.sort(
        (a:any, b:any) => b.ipoYear - a.ipoYear
      )
    } else {
      this.stocks = this.stocks.sort(
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
      this.stocks = this.stocks.sort(
        (a:any, b:any) => b.dynamicInfo.lastSale - a.dynamicInfo.lastSale
      )
      console.log("potentially new stocks", this.stocks)
    } else {
      this.stocks = this.stocks.sort(
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
      this.stocks = this.stocks.sort(
        (a:any, b:any) => b.dynamicInfo.netChange - a.dynamicInfo.netChange
      )
      console.log("potentially new stocks", this.stocks)
    } else {
      this.stocks = this.stocks.sort(
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
      this.stocks = this.stocks.sort(
        (a:any, b:any) => b.dynamicInfo.percentChange - a.dynamicInfo.percentChange
      )
      console.log("potentially new stocks", this.stocks)
    } else {
      this.stocks = this.stocks.sort(
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
      this.stocks = this.stocks.sort(
        (a:any, b:any) => b.dynamicInfo.marketCap - a.dynamicInfo.marketCap
      )
      console.log("potentially new stocks", this.stocks)
    } else {
      this.stocks = this.stocks.sort(
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
      this.stocks = this.stocks.sort(
        (a:any, b:any) => b.dynamicInfo.volume - a.dynamicInfo.volume
      )
      console.log("potentially new stocks", this.stocks)
    } else {
      this.stocks = this.stocks.sort(
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