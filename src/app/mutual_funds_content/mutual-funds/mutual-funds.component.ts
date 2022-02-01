import { Component, OnInit } from '@angular/core';
import { MutualFundsService } from '../mutual-funds.service';
import { MutualFunds } from './mutual-funds.model';

@Component({
  selector: 'app-mutual-funds',
  templateUrl: './mutual-funds.component.html',
  styleUrls: ['./mutual-funds.component.scss']
})
export class MutualFundsComponent implements OnInit {

  mutualFunds: MutualFunds[] = []

  tempMutualFund: any = {
    ticker: "",
    name: "",
    assetClass: "",
    risk: "",
    expenseRatio: 0,
    secYield: 0,
    ytd: 0,
    oneYr: 0,
    threeYr: 0,
    fiveYr: 0,
    tenYr: 0,
    sinceInception: 0,
    initialInvestment: 0,
    price: 0,
    changePrice: 0,
    chanePricePercent: 0
  }

  constructor(private mutualFundsService: MutualFundsService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.mutualFundsService.getMutualFundss().subscribe(data => {
      this.mutualFunds = data;
      console.log(data);
    })
  }

  getSingleData(mutualFundId: any) {
    this.mutualFundsService.getSingleMutualFund(mutualFundId).subscribe(data => {
      this.getData();
      this.tempMutualFund = data;
    })
  }

}
