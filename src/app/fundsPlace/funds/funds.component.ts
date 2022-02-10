import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Fund } from '../fund/fund.model';
import { FundService } from '../fund.service';
import { UserService } from 'src/app/user.service';
import { MatDialog } from '@angular/material/dialog';
import { PurchaseComponent } from 'src/app/purchasesPlace/purchase/purchase.component';
@Component({
  selector: 'app-funds',
  templateUrl: './funds.component.html',
  styleUrls: ['./funds.component.scss']
})

export class FundsComponent implements OnInit {
  public maxSize: number = 5;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;
  public changeText: boolean;
  signedIn: boolean = false;


  public labels: any = {
      previousLabel: '<--',
      nextLabel: '-->',
      screenReaderPaginationLabel: 'Pagination',
      screenReaderPageLabel: 'page',
      screenReaderCurrentLabel: `You're on page`
  };


  constructor(private router: Router, 
    private fundService: FundService, 
    private route: ActivatedRoute,
    private userService: UserService,
    public dialog: MatDialog,) { this.changeText = false; }


  config: any;
  collection = {};
  term: string = '';
  funds:Fund[] = [];
    

showDiv = {
  symbol : false,
  name : false,
  incep : false,
  cat1 : false,
  cat2 : false,
  cat3 : false,
  mark : false,
  curr : false,
  hist : false,
  lev : false,
  av : false,
  act : false,
  ed : false,
}
fund:Fund = {
  id: 0,
  symbol: '',
  name: ''
};
  // this should be in hte dyn-table.component.ts
  sortChanged(e: any) {
    // save cookie with table sort data here
    console.log(e);
  }

  async ngOnInit(): Promise<void> {
      await this.fundService.getFunds().subscribe(payload=>{
        this.userService.whoAmI().subscribe(payload => {
          if(payload.body.userID){
            this.signedIn = true;
          }
          else {
            this.signedIn = false;

          }
        })
        this.funds = payload;
        this.config ={
          id: 'custom',
          itemsPerPage: 25,
          currentPage: 1,
          totalItems: this.funds.length,
          
        };
        
    })
  }


  deleteFunds(id: number){
    if(confirm("Are you sure you want to delete this item?") == true){
    this.fundService.deleteFunds(id).subscribe(data =>{
      this.ngOnInit();
      })
    }
    else{
      
    }
    }

    onPageChanged(event: any){
      this.config.currentPage = event;
    }

 }