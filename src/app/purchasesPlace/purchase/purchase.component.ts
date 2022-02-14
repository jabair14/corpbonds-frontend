import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseService } from '../purchase.service';
import { Purchase } from './purchase.model';
import { Fund } from 'src/app/fundsPlace/fund/fund.model';
import { FundService } from 'src/app/fundsPlace/fund.service';
import { FundComponent } from 'src/app/fundsPlace/fund/fund.component';
import { UserService } from 'src/app/user.service';
import { CefCreateSellsComponent } from 'src/app/cefSellProfile/cefCreateSells/cefCreateSells.component';
import { CefComponent } from 'src/app/cefProfile/cef.component';
import { Sell } from 'src/app/cefSellProfile/cefSell/cefSell.model';
import { SellService } from 'src/app/cefSellProfile/cef.service';


@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})


export class PurchaseComponent implements OnInit {

  funds: Fund[] =[];

  sells: Sell[] =[];

  createSell: any ={
    amount: '',
    fundId: '',
    userId: '',
    previousBalance: '',

  }

  purchase:Purchase = {
    id: 0,
    amount: 0,
    fundId: 0,
    userId: '',
  };

  
  name: string = '';
  balance: number = 0;

  constructor(private route:ActivatedRoute, 
    private purchaseService: PurchaseService,
    private sellService: SellService,
    private fundService: FundService,
    private userService: UserService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      var myid = +params['id'];
      this.purchaseService.getPurchase(myid).subscribe(payload=>{
        this.purchase = payload;
        this.userService.postAccount().subscribe(payload => {
          if (payload.body.message == 'success'){
    
            this.balance = payload.body.data.Account_Balance.toFixed(2);
        console.log(payload);
        this.createSell.amount = this.purchase.amount
        this.createSell.fundId = this.purchase.fundId
        this.createSell.userId = this.purchase.userId
        this.createSell.previousBalance = this.balance
      console.log("this is the amount ", this.createSell.amount)
      console.log("this is the fund id", this.createSell.fundId)
      console.log("this is the user id", this.createSell.userId)
      console.log("this is the previous id", this.createSell.previousBalance)
          }})
    })

      this.fundService.getFunds().subscribe(payload=>{
        console.log("This Fund", payload);
        this.funds = payload;
        
      })
    })
  }


  sellFund(id: number, createSell: any){
    if(confirm(`Are you sure you want to sell this Fund for Amount of  $${this.purchase.amount}?`) == true){
      console.log("this is the amount ", this.purchase.amount)
      console.log("this is the fund id", this.purchase.fundId)
      console.log("this is the user id", this.purchase.userId)
      this.sellService.createSell(createSell).subscribe(data =>{
        createSell.amount = this.purchase.amount
        createSell.fundId = this.purchase.fundId
        createSell.userId = this.purchase.userId
        createSell.previousBalance = this.balance
        console.log("this is the user id", createSell.updatedBalance)
        console.log("this sell is getting create", data)
      })
        this.purchaseService.deletePurchases(id).subscribe(data =>{
      
      this.userService.postBalance({change: this.purchase.amount}).subscribe(data=>{
        console.log("this is the data", data)
      this.router.navigateByUrl(`/cefProfile`)
      })
    })
  }
    else{
      
    }
    }

    edit():void {
      this.router.navigateByUrl(`/purchases/${this.purchase.id}/edit`);
    }
}
