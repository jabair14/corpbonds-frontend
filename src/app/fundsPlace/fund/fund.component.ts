import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FundService } from '../fund.service';
import { Fund } from './fund.model';
import { UserService } from 'src/app/user.service';
import { PurchaseService } from 'src/app/purchasesPlace/purchase.service';
import { Purchase } from 'src/app/purchasesPlace/purchase/purchase.model';

@Component({
  selector: 'app-fund',
  templateUrl: './fund.component.html',
  styleUrls: ['./fund.component.scss']
})
export class FundComponent implements OnInit {

  user: any ={}

  fund:Fund = {
    id: 0,
    symbol: '',
    name: ''
  };

  purchases: Purchase = {
    id: 0,
    amount: 0,
    fundId: 0,
    userId: '',
  };


  constructor(private route:ActivatedRoute, 
    private fundService: FundService,
    private router: Router,
    private userService: UserService,
    private purchaseService: PurchaseService,
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      const myid = +params['id'];
      this.fundService.getFund(myid).subscribe(payload=>{
        console.log(payload);
        this.fund = payload;
      })
    })

    this.userService.postAccount().subscribe(payload => {

      this.user = payload.body.data
      this.purchases.userId = this.user.uniqueID
      console.log("userData", payload.body.data)
      console.log("purchase userId", this.purchases.userId)
    })
  }

    edit():void {
      this.router.navigateByUrl(`/funds/${this.fund.id}/edit`);
    }

    purchase():void {
      this.router.navigateByUrl(`/funds/${this.fund.id}/create`);
    }
}
