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

  name: string = '';
  balance: string = '';

  userInvestments: any = []

  total: number = 0;

  panelOpenState = false;


  ngOnInit(): void {
    this.userService.postAccount().subscribe(payload => {
      console.log(payload.body)
      if (payload.body.message == 'success') {
        console.log(payload.body.message)
        this.user = payload.body.data 
        const myid = this.user.uniqueID;
        this.name = payload.body.name.split(' ')[0].toLowerCase();
        this.balance = payload.body.data.Account_Balance.toFixed(2);
        this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1);
        console.log("userid", myid)
        this.investmentService.getUserInvestments(myid).subscribe(payload => {
          this.userInvestments = payload;
          console.log("investments", payload)
        })
        
      } else {
        alert ("Must be logged in!")
        this.router.navigateByUrl("/login")
      }
      
    })
  }

  onDeleteInvestment(id: number) {
    this.investmentService.getInvestment(id).subscribe(payload => {
      this.total = payload.amount * 1000;
      console.log("this is the total", this.total)
      this.userService.postBalance({change: +this.total}).subscribe(payload => {
        console.log("payload for userService add funds", payload)
      })
    })
    this.investmentService.deleteInvestment(id).subscribe(
      data => {
        if (data) {
          console.log('delete loan data', data)
          
          this.router.navigateByUrl("/bondprofile")
        }
        this.ngOnInit();
      }
    )

  }
}
