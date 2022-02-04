import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseService } from '../purchase.service';
import { Purchase } from './purchase.model';
import { Fund } from 'src/app/fundsPlace/fund/fund.model';
import { FundService } from 'src/app/fundsPlace/fund.service';
import { FundComponent } from 'src/app/fundsPlace/fund/fund.component';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})


export class PurchaseComponent implements OnInit {

  funds: Fund[] =[];


  purchase:Purchase = {
    id: 0,
    amount: 0,
    fundId: 0,
    userId: '',
  };

  constructor(private route:ActivatedRoute, 
    private purchaseService: PurchaseService,
    private fundService: FundService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      var myid = +params['id'];
      this.purchaseService.getPurchase(myid).subscribe(payload=>{
        console.log(payload);
        this.purchase = payload;
      })

      this.fundService.getFunds().subscribe(payload=>{
        console.log("This Fund", payload);
        this.funds = payload;
        
      })
    })
  }

    edit():void {
      this.router.navigateByUrl(`/purchases/${this.purchase.id}/edit`);
    }
}
