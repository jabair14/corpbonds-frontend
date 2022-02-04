import { Component, OnInit, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StocksService } from 'src/app/stocks.service';
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
  
  constructor(
    private stockService: StocksService,
    public dialogRef: MatDialogRef<StockInvestModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit(): void {
  }

  cancel(): void {
    this.dialogRef.close()
    this.purchaseAmount = 1
    this.buyBought = true;
  }

  makeInvestment(stock: Stock) {
    const investment:Investment = {
      "userId": "mat123",
      "stockId": stock.id,
      "numShares": this.purchaseAmount
    }
    this.stockService.makeInvestment(investment).subscribe(payload => {
      console.log(payload)
    })
    this.buyBought = false
  }

}
