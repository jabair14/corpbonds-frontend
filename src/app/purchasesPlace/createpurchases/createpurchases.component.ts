import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Purchase } from '../purchase/purchase.model';
import { PurchaseService } from 'src/app/purchasesPlace/purchase.service';
import { Fund } from 'src/app/fundsPlace/fund/fund.model';
import { FundService } from 'src/app/fundsPlace/fund.service';

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

  createPurchase: any ={
    amount: '',
    fundId: '',
    userId: '',

  }
  constructor(private router: Router,
    private fundService: FundService, 
    private purchaseService: PurchaseService, 
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      const myid = +params['id'];
      this.fundService.getFund(myid).subscribe(payload=>{
        console.log("This Fund", payload);
        this.fund = payload;

      })
    })
  }


  createPurchases(createPurchase: any){
    createPurchase.fundId = this.fund.id;
    if(confirm("Are you sure you want to delete this item?") == true){
    this.purchaseService.createPurchase(createPurchase).subscribe(data => {
      if (data){
        this.router.navigateByUrl("/purchases");
      }
      console.log("Purchase is Created ", data);
      this.ngOnInit();
    })
  }
  else{
      
  }
  }

}
