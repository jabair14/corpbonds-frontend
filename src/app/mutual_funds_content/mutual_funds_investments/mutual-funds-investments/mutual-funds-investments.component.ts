import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/user.service';
import { MutualFundsService } from '../../mutual_funds_display/mutual-funds.service';
import { MutualFundsBuyDialogComponent } from '../mutual-funds-buy-dialog/mutual-funds-buy-dialog.component';
import { MutualFundsBuySellDialogComponent } from '../mutual-funds-buy-sell-dialog/mutual-funds-buy-sell-dialog.component';
import { MutualFundsInvestmentsService } from '../mutual-funds-investments.service';
import { MutualFundInvestments } from './mutual-funds-investments.model';

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-mutual-funds-investments',
  templateUrl: './mutual-funds-investments.component.html',
  styleUrls: ['./mutual-funds-investments.component.scss']
})

export class MutualFundsInvestmentsComponent implements OnInit {

  constructor(private mutualFundsInvestmentsService: MutualFundsInvestmentsService,
              private mutualFundsService: MutualFundsService,
              private liveAnnouncer: LiveAnnouncer,
              private userService: UserService,
              private dialog: MatDialog) 
  { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  searchKey: string = '';

  investments: MutualFundInvestments[] = []
  dataSource: any =  new MatTableDataSource<MutualFundInvestments>(this.investments);

  userId: any;
  userData: any;

  loggedIn: boolean = false;
  invested: boolean = false;

  tempInvestment: any = {
    id: 0, folioNumber: 0, shares: 0,
    purchaseDate: "", totalInvested: "", userId: 0, mutualFundId: 0
  }

  tempMutualFund: any = {
    ticker: "", name: "",
    assetClass: "", risk: "", expenseRatio: 0,
    secYield: 0, ytd: 0, oneYr: 0, threeYr: 0, fiveYr: 0, tenYr: 0, sinceInception: 0,
    initialInvestment: 0, price: 0, changePrice: 0, chanePricePercent: 0,
    inceptionDate: "", shortName: "", subsequentInvestment: 0, fundFamily: "",
    totalNetAssets: 0, investmentType: "", sizeType: "", investmentStrategy: ""
  }

  displayedColumns: string[] = [
    'name', //'ticker',
    'folioNumber', 'shares', 'purchaseDate', 
    'totalInvested', 'buySell'
  ]

  ngOnInit(): void {
    this.getUserId();
    console.log('logged in? ', this.loggedIn);

    setTimeout(()=> {
      this.getInvestmentsTableData();
    }, 1000);
  }

  getUserId() {
    try {
      this.userService.whoAmI().subscribe(payload => {
        if (payload.body.status === 'ok') {
          this.loggedIn = true;
          this.userId = payload.body.userID;
        }
        if (payload.body.status === 'fail') {
          this.loggedIn = false;
          this.userId = "-1";
        }
      })
    } catch (error) {
      console.log('getUserId - Mutual Funds Error:', error);
    }

    // this.loggedIn = true;
    // this.userId = "testId";

  }

  getInvestmentsTableData() {
    this.getInvestmentData();

    setTimeout(()=> {
      this.dataSource = new MatTableDataSource(this.investments);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 1000);
  }

  getInvestmentData() {
    if(this.loggedIn) {
      this.mutualFundsInvestmentsService.getInvestmentsByUser(this.userId).subscribe(data => {
        this.setInvestmentData(data);
      })
    }
  }

  setInvestmentData(data: any) {
    data.forEach((ele: any) => {
      
      var tempInvestmentModel = {
        ticker: "", name: "",
        id: 0, folioNumber: 0, shares: 0,
        purchaseDate: "", totalInvested: "", userId: 0, mutualFundId: 0
      }

      this.mutualFundsService.getSingleMutualFund(ele.mutualFundId).subscribe((payload: any) => {
        tempInvestmentModel.name = payload.name;
        tempInvestmentModel.ticker = payload.ticker;
        tempInvestmentModel.id = ele.id;
        tempInvestmentModel.folioNumber = ele.folioNumber;
        tempInvestmentModel.shares = ele.shares;
        tempInvestmentModel.purchaseDate = ele.purchaseDate;
        tempInvestmentModel.totalInvested = ele.totalInvested;
        tempInvestmentModel.userId = ele.userId;
        tempInvestmentModel.mutualFundId = ele.mutualFundId;
      })

      this.investments.push(tempInvestmentModel);
    })
  }

  getSingleInvestmentData(investmentId: number) {
    this.getUserId();

    if(this.loggedIn) {
      this.mutualFundsInvestmentsService.getSingleInvestmentByUser(this.userId, investmentId).subscribe(data => {
        this.tempInvestment = data;
      })
    }
  }

  getSingleInvestmentDataByFund(mutualFundId: number){
    this.getUserId();

    if(this.loggedIn) {
      try {
        this.mutualFundsInvestmentsService.getSingleInvestmentByUserFund(this.userId, mutualFundId).subscribe((data: any) => {
          if (data.status === 'ok') {
            this.invested = true;
            this.tempInvestment = data.investments;
          }
          if (data.status === 'fail') {
            this.invested = false;
          }
        })
      } catch (error) {
        console.log('getSingleInvestmentDataByFund - Mutual Funds Error:', error);
      }
    }
  }

  getSingleMutualFundData(mutualFundId: number) {
    this.mutualFundsService.getSingleMutualFund(mutualFundId).subscribe(data => {
      this.tempMutualFund = data;
    })
  }

  addInvestment(investment: any) {
    this.getUserId();

    if(this.loggedIn) {
      this.mutualFundsInvestmentsService.addInvestment(investment).subscribe(data => {
        alert("Congratulations on your investment!");
      })
    }
  }

  editInvestment(investment: any) {
    this.getUserId();
    if(this.loggedIn) {
      this.mutualFundsInvestmentsService.editInvestment(investment).subscribe(data => {
        alert("Investment successfully updated!");
      })
    }
  }

  deleteInvestment(investmentId: number) {
    this.getUserId();
    if(this.loggedIn) {
      this.mutualFundsInvestmentsService.deleteInvestment(investmentId).subscribe(data => {
        alert("Investment successfully sold!");
      })
    }
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction} ending`);
    }
    else {
      this.liveAnnouncer.announce(`Sorting cleared`);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openBuyDialog(mutualFundId: number) {
    this.getUserId();
    this.getSingleMutualFundData(mutualFundId);

    setTimeout(()=> {
      if(this.loggedIn) {
        this.getSingleInvestmentDataByFund(mutualFundId);
        
        setTimeout(()=> {
          if(this.invested) {
            // Already paid into fund
            this.dialog.open(MutualFundsBuySellDialogComponent, {
              data: {tempMutualFund: this.tempMutualFund,
                     tempInvestment: this.tempInvestment}
            });
          }
    
          else {
            this.dialog.open(MutualFundsBuyDialogComponent, {
              data: {tempMutualFund: this.tempMutualFund,
                     userId: this.userId}
            });
          }
        }, 1000);
      }
  
      else {
        alert("Please sign in to continue.");
        // Toss in a ridirect to the login page?
        // Pop up box to sign in?
      }
    }, 1000);

  }

  openBuySellDialog(investmentId: number, mutualFundId: number) {
    this.getUserId();
    this.getSingleInvestmentData(investmentId)
    this.getSingleMutualFundData(mutualFundId);

    setTimeout(()=> {
      this.dialog.open(MutualFundsBuySellDialogComponent, {
        data: {tempMutualFund: this.tempMutualFund,
               tempInvestment: this.tempInvestment}
      });
    }, 1000);
  }

  changeBalance(obj: any) {
    console.log('Investments - changeBalance obj: ', obj)
    
    this.userService.postBalance(obj).subscribe(payload => {
      console.log(payload);
    });
  }

}
