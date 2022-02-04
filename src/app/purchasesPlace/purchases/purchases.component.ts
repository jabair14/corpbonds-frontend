import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Purchase } from '../purchase/purchase.model';
import { PurchaseService } from '../purchase.service';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.scss']
})

export class PurchasesComponent implements OnInit {
  public maxSize: number = 5;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;

  // public labels: any = {
  //     previousLabel: '<--',
  //     nextLabel: '-->',
  //     screenReaderPaginationLabel: 'Pagination',
  //     screenReaderPageLabel: 'page',
  //     screenReaderCurrentLabel: `You're on page`
  // };


  constructor(private router: Router, 
    private purchaseService: PurchaseService, 
    private route: ActivatedRoute) {}


  config: any;
  collection = {};
  term: string = '';
  purchases:Purchase[] = [];
    

showDiv = {
  id : false,
  amount : false,
  fundId : false,
  userId : false,
}

  // this should be in hte dyn-table.component.ts
  sortChanged(e: any) {
    // save cookie with table sort data here
    console.log(e);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      const myid = +params['id'];
      this.sortChanged;
      this.purchaseService.getPurchases().subscribe(payload=>{
        console.log(payload);
        this.purchases = payload;
        
        this.config ={
          id: '1',
          itemsPerPage: 25,
          currentPage: 1,
          totalItems: this.purchases.length,
          
        };
        
    })
  })
}


  deletePurchases(id: number){
    this.purchaseService.deletePurchases(id).subscribe(data =>{
      this.ngOnInit();
      })
    }

    onPageChanged(event: any){
      this.config.currentPage = event;
    }

 }