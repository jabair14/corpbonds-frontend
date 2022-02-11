import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EtfService } from '../etf.service';
import { UserService } from 'src/app/user.service';
import { InvestmentModel } from '../etf-investments/investment.model';

@Component({
  selector: 'app-service-table',
  templateUrl: './service-table.component.html',
  styleUrls: ['./service-table.component.scss'],
})
export class ServiceTableComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private etfService: EtfService,
    private userService: UserService
  ) {}

  hasInvestments: boolean = false;
  userInvestments: InvestmentModel[] = [];
  tableConfig: string[] = [
    'fund_symbol',
    'fund_long_name',
    'price',
    'amount',
    'actions',
  ];

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
}
