import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  

  constructor( 
    private investmentService: InvestmentService,
    private route: ActivatedRoute
    ) { }

  ngOnInit( ): void {
    this.route.params.subscribe(params => {
      const myid = +params['id'];
      this.investmentService.getInvestment(myid).subscribe(payload => {
        // console.log("this is payload on bond", payload)
        this.investment = payload
      })
    })
  }

  onCreateInvestment(investment: any) {
    this.investmentService.postInvestment(investment).subscribe(payload => {
      console.log("this is the createInvestment payload=", payload)
    })
  }

  // getInvestment(investment: any) {
  //   this.investmentService.getInvestment
  // }

}
