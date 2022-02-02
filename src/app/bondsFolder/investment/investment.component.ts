import { Component, OnInit } from '@angular/core';
import { AccountsComponent } from 'src/app/usersFolder/accounts/accounts.component';
import { Investment } from './investment.model';
import { InvestmentService } from './investment.service';

@Component({
  selector: 'app-investment',
  templateUrl: './investment.component.html',
  styleUrls: ['./investment.component.scss']
})
export class InvestmentComponent implements OnInit {

  investment: Investment = {
    id: 0,
    userId: '',
    amount: 0
  }

  

  constructor( private investmentService: InvestmentService ) { }

  ngOnInit( ): void {
  }

  onCreateInvestment(investment: any) {
    this.investmentService.postInvestment(investment).subscribe(payload => {
      console.log("this is the createInvestment payload=", payload)
    })
  }

}
