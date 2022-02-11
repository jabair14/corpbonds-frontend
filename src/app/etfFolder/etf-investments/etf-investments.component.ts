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
  tableConfig: string[] = [
    'fund_symbol',
    'fund_long_name',
    'price',
    'amount',
    'actions',
  ];
  hasInvestments: boolean = false;

  ngOnInit(): void {
    this.userService.whoAmI().subscribe((payload) => {
      let IncomingUserId = payload.body.userID;
      this.getUserInvestments(IncomingUserId);
    });
  }

  getUserInvestments(userId: any) {
    this.etfService.getAllHoldings(userId).subscribe((payload) => {
      if (payload.length === 0) {
        this.hasInvestments = false;
      } else {
        this.userInvestments = payload;
        this.hasInvestments = true;
      }
    });
  }

  deleteInvestment(holdingId: any) {
    this.etfService.deleteHolding(holdingId).subscribe((payload) => {
      this.ngOnInit();
    });
  }
}
