import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Purchase } from '../purchase/purchase.model';
import { PurchaseService } from 'src/app/purchasesPlace/purchase.service';
import { Fund } from 'src/app/fundsPlace/fund/fund.model';
import { FundService } from 'src/app/fundsPlace/fund.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-createpurchases',
  templateUrl: './createpurchases.component.html',
  styleUrls: ['./createpurchases.component.scss']
})
export class CreatePurchasesComponent implements OnInit {

  fund: Fund = {
    id: 0,
    symbol: '',
    name:''
  };

  user: any ={}

  createPurchase: any ={
    amount: '',
    fundId: '',
    userId: '',

  }
  constructor(private router: Router,
    private fundService: FundService, 
    private purchaseService: PurchaseService, 
    private userService: UserService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      const myid = +params['id'];
      this.fundService.getFund(myid).subscribe(payload=>{
        console.log("This Fund", payload);
        this.fund = payload;

      })
    })
    this.userService.postAccount().subscribe(payload => {

      this.user = payload.body.data
      this.createPurchase.userId = this.user.uniqueID
      console.log("userData", payload.body.data)
      console.log("purchase userId", this.createPurchase.userId)
    })
  }


  createPurchases(createPurchase: any){
    createPurchase.fundId = this.fund.id;
    if(confirm("Please Accept Invest") == true){
    this.purchaseService.createPurchase(createPurchase).subscribe(data => {
      console.log("this is getting created",data )
      if (data){
        this.router.navigateByUrl("/funds");
      }
      console.log("Purchase is Created ", data);
      this.ngOnInit();
    })
  }
  else{
      
  }
  }

}
