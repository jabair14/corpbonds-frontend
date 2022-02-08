import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StocksService } from 'src/app/stocks.service';
import { UserService } from 'src/app/user.service';
import { Investment } from '../stock-invest-modal/investment.model';
import { SellModalComponent } from '../sell-modal/sell-modal.component';

@Component({
  selector: 'app-stock-investments',
  templateUrl: './stock-investments.component.html',
  styleUrls: ['./stock-investments.component.scss']
})
export class StockInvestmentsComponent implements OnInit {
  config: any
  signedIn: boolean = false;
  term: string = ""
  stockIdDir: boolean = true //true is a -> z, low -> high,   false is opposite 
  numSharesDir: boolean = true
  ipoYearDir: boolean = true
  showDir: boolean = false
  currentUser: String = ""
  investments:Investment[] = []
  constructor(
    public dialog: MatDialog,
    private stockService:StocksService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.userService.whoAmI().subscribe(payload => {
      if(payload.body.userID) {
        console.log("hi")
        this.signedIn = true;
        this.stockService.getInvestments(payload.body.userID).subscribe(payload => {
          this.investments = payload
          this.reorderStockId()
          this.config = {
            id: "custom",
            itemsPerPage: 10,
            currentPage: 1,
            totalItems: this.investments.length
          }
        })
      } else {
        this.signedIn = false;
      }
      console.log(payload)
    })
    
  }

  sellStock(investment: Investment) {
      const dialogRef = this.dialog.open(SellModalComponent, {
        width: '400px',
        data: {investment: investment}
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog Result: ${result}`);
        this.ngOnInit()
      })

  }

  resetFilters() {
    this.resetArrows()
    this.term = ""
    this.stockIdDir = false
    this.reorderStockId();
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
    this.stockIdDir = true;
    this.ipoYearDir = true;
    this.numSharesDir = true;
  }

}