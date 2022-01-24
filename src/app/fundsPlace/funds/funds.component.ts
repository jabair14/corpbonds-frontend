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

  constructor(private router: Router, 
    private fundService: FundService, 
    private route: ActivatedRoute) { }

  term: string = '';
  funds:Fund[] = [];

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      const myid = +params['id'];
      this.fundService.getFunds().subscribe(payload=>{
        console.log(payload);
        this.funds = payload;
    })
  })
}


  deleteFunds(id: number){
    this.fundService.deleteFunds(id).subscribe(data =>{
      this.ngOnInit();
      })
    }

 }