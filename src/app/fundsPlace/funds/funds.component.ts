import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Fund } from '../fund/fund.model';
import { FundService } from '../fund.service';

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
  public labels: any = {
      previousLabel: '<--',
      nextLabel: '-->',
      screenReaderPaginationLabel: 'Pagination',
      screenReaderPageLabel: 'page',
      screenReaderCurrentLabel: `You're on page`
  };


  constructor(private router: Router, 
    private fundService: FundService, 
    private route: ActivatedRoute) {  }


  config: any;
  collection = {};
  term: string = '';
  funds:Fund[] = [];
    
  isShowDivIf  = false;
   
  toggleDisplayDiv() {
    this.isShowDivIf  = !this.isShowDivIf;
  }
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

  // this should be in hte dyn-table.component.ts
  sortChanged(e: any) {
    // save cookie with table sort data here
    console.log(e);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      const myid = +params['id'];
      this.sortChanged;
      this.fundService.getFunds().subscribe(payload=>{
        console.log(payload);
        this.funds = payload;
        
        this.config ={
          id: 'custom',
          itemsPerPage: 50,
          currentPage: 1,
          totalItems: this.funds.length,
          
        };
        
    })
  })
}


  deleteFunds(id: number){
    this.fundService.deleteFunds(id).subscribe(data =>{
      this.ngOnInit();
      })
    }

    onPageChanged(event: any){
      this.config.currentPage = event;
    }

 }