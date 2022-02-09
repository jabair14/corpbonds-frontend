import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EtfService } from '../etf.service';
import { UserService } from 'src/app/user.service';
import { InvestmentModel } from './investment.model';

@Component({
  selector: 'app-etf-investments',
  templateUrl: './etf-investments.component.html',
  styleUrls: ['./etf-investments.component.scss'],
})
export class EtfInvestmentsComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private etfService: EtfService,
    private userService: UserService
  ) {}

  userInvestments: InvestmentModel[] = [];
  tableConfig: string[] = ['fund_symbol', 'fund_long_name', 'price', 'amount', 'actions'];

  ngOnInit(): void {
    this.userService.whoAmI().subscribe((payload) => {
      // console.log('USER PAYLOAD', payload);
      let IncomingUserId = payload.body.userID;
      this.getUserInvestments(IncomingUserId);
    });
  }

  getUserInvestments(userId: any) {
    console.log('INCOMING ID //////', userId);
    this.etfService.getAllHoldings(userId).subscribe((payload) => {
      console.log('INVESTMENTS THAT USER MADE:', payload);
      this.userInvestments = payload;
      this.userInvestments = payload;
      console.log(this.userInvestments);
    });
  }

  deleteInvestment(holdingId: any){
    console.log("DELETING THIS HOLDING:",holdingId);
    this.etfService.deleteHolding(holdingId).subscribe(payload => {
      console.log("SUCCESS IN DELETING HOLDING", payload)
      this.ngOnInit();
    })
  }
}
