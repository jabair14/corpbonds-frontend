import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BondService } from '../bond.service';
import { Bond } from './bond.model';
import { UserService } from 'src/app/user.service';
import { Investment } from '../investment/investment.model';
import { InvestmentService } from '../investment/investment.service';




@Component({
  selector: 'app-bond',
  templateUrl: './bond.component.html',
  styleUrls: ['./bond.component.scss']
})
export class BondComponent implements OnInit {

  bond: Bond = {
    id: 0
  }

  user: any = {}

  investment: Investment = {
    id: 0,
    userId: '',
    amount: 0
  }



  constructor(
    private route: ActivatedRoute, private bondService: BondService,
    private router: Router, private userService: UserService, 
    private investmentService: InvestmentService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const myid = +params['id'];
      this.bondService.getBond(myid).subscribe(payload => {
        console.log("this is payload on bond", payload)
        this.bond = payload
      })
    })
    this.userService.postAccount().subscribe(payload => {
      // payload = this.user
      console.log("user data?", payload.body.data)
      this.user = payload.body.data
    })
  }

  onCreateInvestment(investment: any) {
    console.log(investment)
    this.investmentService.postInvestment(investment).subscribe(payload => {
      console.log("this is the createInvestment payload=", payload)
    })
  }
}
