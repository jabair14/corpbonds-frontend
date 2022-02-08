import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PurchaseService } from 'src/app/purchasesPlace/purchase.service';
import { Purchase } from 'src/app/purchasesPlace/purchase/purchase.model';
import { Fund } from 'src/app/fundsPlace/fund/fund.model';
import { FundService } from 'src/app/fundsPlace/fund.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {


  purchases: Purchase[] =[];

  user: any= {}

  purchase: Purchase = {
    id: 0,
    amount: 0,
    userId: '',
    fundId: 0
  };

  accountObj: any = {};

  name: string = '';
  balance: string = '';


  constructor(private route:ActivatedRoute, 
    private userService: UserService,
    private purchaseService: PurchaseService,
    private fundService: FundService,
    private router: Router,
    ) { }
    ngOnInit(): void {this.purchaseService.getPurchases().subscribe(payload=>{
        console.log(payload);
        this.purchases = payload;
    })
}
//   ngOnInit(): void {
//     this.userService.postAccount().subscribe(payload => {


//         this.user = payload.body.data
//         // console.log("userData", payload.body.data)
//         // console.log("purchase userId", this.createPurchase.userId)
//       const myid = this.user.uniqueID;
//       this.name = payload.body.name.split(' ')[0].toLowerCase();
//         this.balance = payload.body.data.Account_Balance.toFixed(2);
//         this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1);
//       console.log("userid", myid)
//       this.purchaseService.getPurchasesByUser(myid).subscribe(payload=>{
//         this.purchases = payload;
//         console.log("purchase", payload)
//       })
    
//     })
// }
  
}
