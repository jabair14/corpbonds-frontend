import { Component, OnInit } from '@angular/core';
import { BondInvestment } from '../bondInvestment.model';
import { BondInvestmentService } from '../bondInvestment.service';

@Component({
  selector: 'app-bond-investment',
  templateUrl: './bond-investment.component.html',
  styleUrls: ['./bond-investment.component.scss']
})
export class BondInvestmentComponent implements OnInit {

  bondInvestment: BondInvestment = {
    id: 0,
    investmentId: 0,
    bondId: 0
  }

  constructor( private bondInvestmentService: BondInvestmentService) { }

  ngOnInit(): void {
  }


  onCreateBondInvestment(bondInvestment: any) {
    this.bondInvestmentService.postBondInvestment(bondInvestment).subscribe(payload => {
      console.log(payload)
    })
  }
}
