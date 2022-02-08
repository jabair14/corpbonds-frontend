import { Component, OnInit } from '@angular/core';
import { Investment } from '../investment/investment.model';
import { InvestmentService } from '../investment/investment.service';
import { UserService } from 'src/app/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BondService } from '../bond.service';
import { Bond } from '../bond/bond.model';

@Component({
  selector: 'app-bondprofile',
  templateUrl: './bondprofile.component.html',
  styleUrls: ['./bondprofile.component.scss']
})
export class BondprofileComponent implements OnInit {

  constructor(
    private route: ActivatedRoute, private bondService: BondService,
    private router: Router, private userService: UserService, 
    private investmentService: InvestmentService,
  ) { }

  investment: Investment = {
    id: 0,
    userId: '',
    amount: 0
  }

  bond: Bond = {
    id: 0
  }

  user: any = {}

  userInvestments: any = []

  // userInvestments: UserInvestment[] = []

  // bonds:Bond[] = []

  ngOnInit(): void {
    this.userService.postAccount().subscribe(payload => {
      if(payload) {
        // payload = this.user
        this.user = payload.body.data
        this.investment.userId = this.user.uniqueID
        
        // this.investmentService.getUserInvestments(this.investment.userId).subscribe(payload => {
        //   console.log("this is the user investments", payload)
        // })
      } else {
        alert ("user not found, please login")
        this.router.navigateByUrl("/login")
      }
      // this.bondInvestment.bondId = this.bond.id
      // this.bondInvestment.investmentId = this.investment.id
      // console.log("user data?", payload.body.data)
      // console.log("investment userid", this.investment.userId)
    })
  }

  findUserInvestments(id: string) {
    console.log(this.investment.userId)
    this.investmentService.getUserInvestments(this.investment.userId!).subscribe(payload => {
      console.log("user investments payload", payload)
      // payload = this.userInvestments
      // this.userInvestments = this.userInvestments.push(payload)
      // console.log(this.userInvestments)
    })
  }

}
