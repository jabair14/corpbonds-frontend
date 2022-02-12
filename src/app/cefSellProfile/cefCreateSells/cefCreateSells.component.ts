import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Purchase } from 'src/app/purchasesPlace/purchase/purchase.model';
import { PurchaseService } from 'src/app/purchasesPlace/purchase.service';
import { Fund } from 'src/app/fundsPlace/fund/fund.model';
import { FundService } from 'src/app/fundsPlace/fund.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-cefCreateSells',
  templateUrl: './cefCreateSells.component.html',
  styleUrls: ['./cefCreateSells.component.scss']
})
export class CefCreateSellsComponent implements OnInit {

  fund: Fund = {
    id: 0,
    symbol: '',
    name:''
  };

  purchase: Purchase ={
      id: 0,
      amount: 0,
      fundId: 0,
      userId: ''
  }

  user: any ={}

  createSell: any ={
    purchaseId: '',
    amount: '',
    fundId: '',
    userId: '',
    previousBalance: '',

  }

  name: string = '';
  balance: number = 0;

  constructor(private router: Router,
    private fundService: FundService, 
    private purchaseService: PurchaseService, 
    private userService: UserService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userService.postAccount().subscribe(payload => {
      if (payload.body.message == 'success'){

        this.balance = payload.body.data.Account_Balance.toFixed(2);
        console.log("this is the balance1", this.balance)
      this.user = payload.body.data
      this.createSell.userId = this.user.uniqueID
      // console.log("userData", payload.body.data)
      // console.log("purchase userId", this.createPurchase.userId)
    this.route.params.subscribe(params=>{
      const myid = +params['id'];
      this.fundService.getFund(myid).subscribe(payload=>{
        console.log("This Fund", payload);
        this.fund = payload;
      })
      })
    }
     else{
        alert("Must be logged in!")
        this.router.navigateByUrl("/login");
      }
    })
}


  createPurchases(createPurchase: any){
    createPurchase.fundId = this.fund.id;
    createPurchase.userId = this.user.uniqueID;
    // console.log('this is the user Id', this.user.uniqueID)
    // console.log('this is the fund Id', this.fund.id)
    // console.log('this is the amount ', this.createPurchase.amount)
    if(this.balance < this.createSell.amount){
      alert("Not Enough Balance");
    }
    else{
    if(confirm(`Please Accept Invest for this Amount $${this.createSell.amount}` ) == true){
      console.log("this is balance", this.balance, "this is the amount", this.createSell.amount)
    this.purchaseService.createPurchase(createPurchase).subscribe(data => {
      this.userService.postBalance({change: -createPurchase.amount}).subscribe(data=>{
        console.log("this is the data", data)
      console.log("this is getting created",data )
      console.log("this purchast is being made", data)
    
      if (data){
        this.router.navigateByUrl("/account");
      }
      console.log("Purchase is Created ", data);
      this.ngOnInit();
    })      })
  }

  else{
      
  }}
  }
 
}