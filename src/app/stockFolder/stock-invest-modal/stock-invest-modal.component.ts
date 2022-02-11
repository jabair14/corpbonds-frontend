import { Component, OnInit, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { StocksService } from 'src/app/stocks.service';
import { UserService } from 'src/app/user.service';
import { Stock } from '../stocks/stock.model';
import { Investment } from './investment.model';

@Component({
  selector: 'app-stock-invest-modal',
  templateUrl: './stock-invest-modal.component.html',
  styleUrls: ['./stock-invest-modal.component.scss']
})
export class StockInvestModalComponent implements OnInit {
  purchaseAmount:Number = 1
  buyBought:Boolean = true //are you in the buying or bought stage
  signedIn:Boolean = false
  currentUser: String = ""
  totalAmount: Number = 0
  
  constructor(
    private router: Router,
    private stockService: StocksService,
    private userService: UserService,
    public dialogRef: MatDialogRef<StockInvestModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }


  ngOnInit(): void {
    this.userService.whoAmI().subscribe(payload => {
      console.log(payload)
      if(payload.body.userID) {
        this.signedIn = true;
        this.currentUser = String(payload.body.userID)
      } else {
        this.signedIn = false;
      }
    })
  }

  cancel(): void {
    this.purchaseAmount = 1
    this.buyBought = true;
    this.dialogRef.close()
  }
  goToLogin(): void{
    this.router.navigateByUrl("/login")
    this.dialogRef.close()
  }

  makeInvestment(stock: Stock) {
    console.log("investment params:", this.currentUser, stock.id, this.purchaseAmount)
    const investment:Investment = {
      "userId": this.currentUser,
      "stockId": stock.id,
      "numShares": this.purchaseAmount
    }
    this.stockService.makeInvestment(investment).subscribe(payload => {
      console.log(payload)
    })
    this.stockService.getStock(stock.id).subscribe(payload => {
      this.totalAmount = Math.round(payload.dynamicInfo.lastSale * Number(this.purchaseAmount) * 100) / 100
      this.userService.postBalance({change:Number(this.totalAmount) * -1}).subscribe(payload => {
        console.log(payload)
      })
      this.buyBought = false
    })
    
  }

}
