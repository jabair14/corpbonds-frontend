import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Fund } from '../fund/fund.model';
import { FundService } from 'src/app/fundsPlace/fund.service';


@Component({
  selector: 'app-createfunds',
  templateUrl: './createfunds.component.html',
  styleUrls: ['./createfunds.component.scss']
})
export class CreateFundsComponent implements OnInit {


  createFund: any ={
    symbol: '',
    name: '',
    inceptionDate: '',
    categoryOne: '',
    categoryTwo: '',
    categoryThree: '',
    marketCap: '',
    currentDividendYield: '',
    historicalAverageDividendYield: '',
    everageFactor: '',
    averageVolume: '',
    action: ''
  }
  constructor(private router: Router, 
    private fundService: FundService, 
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  }


  createFunds(createFund: any){
    this.fundService.createFund(createFund).subscribe(data => {
      if (data){
        this.router.navigateByUrl("/funds");
      }
      console.log("Fund is Created ", data);
      this.ngOnInit();
    })
  }

}
