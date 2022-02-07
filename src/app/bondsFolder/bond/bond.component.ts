import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BondService } from '../bond.service';
import { Bond } from './bond.model';
import { UserService } from 'src/app/user.service';
import { Investment } from '../investment/investment.model';
import { InvestmentService } from '../investment/investment.service';
import { BondInvestmentService } from '../bondInvestment.service';
import { BondInvestment } from '../bondInvestment.model';





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

  bondInvestment: BondInvestment = {
    id: 0,
    investmentId: 0,
    bondId: 0,
  }

  show = false
  showConfirm = false

  total = 0



  constructor(
    private route: ActivatedRoute, private bondService: BondService,
    private router: Router, private userService: UserService, 
    private investmentService: InvestmentService,
    private bondInvestmentService: BondInvestmentService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const myid = +params['id'];
      this.bondService.getBond(myid).subscribe(payload => {
        // console.log("this is payload on bond", payload)
        this.bond = payload
        
      })
    })
    this.userService.postAccount().subscribe(payload => {
      // payload = this.user
      this.user = payload.body.data
      this.investment.userId = this.user.uniqueID
      // this.bondInvestment.bondId = this.bond.id
      // this.bondInvestment.investmentId = this.investment.id
      console.log("user data?", payload.body.data)
      console.log("investment userid", this.investment.userId)
    })
  }

  

  onCreateInvestment(investment: any) {
     this.investmentService.postInvestment(investment).subscribe(payload => {
       console.log("this is the createInvestment payload=", payload)
       this.investment = payload
       this.total = this.investment.amount * 1000
       this.bondInvestment.investmentId = this.investment.id
       this.bondInvestment.bondId = this.bond.id
       this.showConfirm = true
       console.log("bondInvestmend Investmnet ID", this.bondInvestment.investmentId)
       console.log("bond Investment bond ID ", this.bondInvestment.bondId)
      
      
  
    })

  }

  

  onCreateBondInvestment(bondInvestment: any) {

    console.log("bondInvestmend Investmnet ID, after confirm", this.bondInvestment.investmentId)
    console.log("bond Investment bond ID, after confirm ", this.bondInvestment.bondId)
    console.log(bondInvestment)
    this.bondInvestmentService.postBondInvestment(bondInvestment).subscribe(payload => {
      if (payload) {
        this.bondInvestment = payload
        console.log("bondInvestment payload", payload)
        this.router.navigateByUrl("/bondprofile")
      } else {
        alert ("Investment unsuccessful")
      }
      })

  }

  
  // postToJoin(){
  //   this.onCreateInvestment(this.investment)
   
  // }

  // onCreateBondInvestment(bondInvestment: any) {
  //   this.bondInvestmentService.postBondInvestment(bondInvestment).subscribe(payload => {
  //     console.log("bondInvestment paylod =", payload)
  //   })
  // }
}
