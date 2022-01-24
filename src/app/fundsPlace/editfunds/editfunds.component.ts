import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Fund } from '../fund/fund.model';
import { FundService } from 'src/app/fundsPlace/fund.service';


@Component({
  selector: 'app-editfunds',
  templateUrl: './editfunds.component.html',
  styleUrls: ['./editfunds.component.scss']
})
export class EditFundsComponent implements OnInit {


  fund: Fund = {
    id: 0,
    symbol: '',
    name:''
  };
  
  constructor(private router: Router, 
    private fundService: FundService, 
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      const myid = +params['id'];
      this.fundService.getFund(myid).subscribe(payload=>{
        console.log("editing this", payload);
        this.fund = payload;
      })
    })
  }

  update():void{
    this.fundService.updateFunds(this.fund).subscribe(data => {
      if (data){
        this.router.navigateByUrl(`/funds/${this.fund.id}`);
      }
      console.log("Fund is Updated ", data);
    })
  }
}
