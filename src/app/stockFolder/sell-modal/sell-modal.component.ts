import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StocksService } from 'src/app/stocks.service';
import { Investment } from '../stock-invest-modal/investment.model';

@Component({
  selector: 'app-sell-modal',
  templateUrl: './sell-modal.component.html',
  styleUrls: ['./sell-modal.component.scss']
})
export class SellModalComponent implements OnInit {
  totalAmount:Number = 0


  constructor(
    private stockService: StocksService,
    public dialogRef: MatDialogRef<SellModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log("data", this.data.investment.stockId)
    this.stockService.getStock(this.data.investment.stockId).subscribe(payload => {
      this.totalAmount = Math.round(payload.dynamicInfo.lastSale * Number(this.data.investment.numShares) * 100)  / 100
    })
    
  }

  cancel(): void {
    this.dialogRef.close({ data: false })
  }

  sellInvestment(): void {
    console.log("start sellInvestment", this.data.investment.id)
    this.stockService.deleteInvestment(this.data.investment.id).subscribe(payload => {
      console.log(payload)
    })
    this.dialogRef.close({data: true})
  }

}
