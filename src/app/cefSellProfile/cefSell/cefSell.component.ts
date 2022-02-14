import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PurchaseService } from 'src/app/purchasesPlace/purchase.service';
import { Purchase } from 'src/app/purchasesPlace/purchase/purchase.model';
import { Fund } from 'src/app/fundsPlace/fund/fund.model';
import { FundService } from 'src/app/fundsPlace/fund.service';
import { UserService } from 'src/app/user.service';
import { SellService } from '../cef.service';
import { Sell } from './cefSell.model';


@Component({
  selector: 'app-user',
  templateUrl: './cefSell.component.html',
  styleUrls: ['./cefSell.component.scss']
})
export class CefSellComponent implements OnInit {

  public maxSize: number = 5;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;


  public labels: any = {
      previousLabel: '<--',
      nextLabel: '-->',
      screenReaderPaginationLabel: 'Pagination',
      screenReaderPageLabel: 'page',
      screenReaderCurrentLabel: `You're on page`
  };

  config: any;
  collection = {};
  term: string = '';

  showDiv = {
    id : false,
    amount : false,
    fundId : false,
    userId : false,
    previousBalance : false,
  }

  purchases: Purchase[] =[];
  sells: Sell[] =[];

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
    private sellService: SellService,
    private fundService: FundService,
    private router: Router,
    ) { }
//     ngOnInit(): void {this.purchaseService.getPurchases().subscribe(payload=>{
//         console.log(payload);
//         this.purchases = payload;
//     })
// }
  ngOnInit(): void {
    this.userService.postAccount().subscribe(payload => {

        if (payload.body.message == 'success'){
          this.config ={
            id: '1',
            itemsPerPage: 20,
            currentPage: 1,
            totalItems: this.purchases.length,         
          };

        this.user = payload.body.data
        // console.log("userData", payload.body.data)
        // console.log("purchase userId", this.createPurchase.userId)
      const myid = this.user.uniqueID;
    //   this.name = payload.body.name.split(' ')[0].toLowerCase();
    //     this.balance = payload.body.data.Account_Balance.toFixed(2);
    //     this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1);
    //   console.log("userid", myid)
      this.sellService.getSellsByUser(myid).subscribe(payload=>{
        this.sells = payload;
        console.log("purchase", payload)
      })

    } else {
        alert("Must be logged in!")
        this.router.navigateByUrl("/login");
    }
    })
}
onPageChanged(event: any){
  this.config.currentPage = event;
}
}
