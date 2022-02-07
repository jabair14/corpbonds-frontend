import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CalcService } from '../calc.service';
import { Calc } from './calc.model';

@Component({
  selector: 'app-retcalc',
  templateUrl: './retcalc.component.html',
  styleUrls: ['./retcalc.component.scss']
})
export class RetcalcComponent implements OnInit {
  newcalc: Calc = {
    yrlyIncome: 0,
    currAge: 0,
    retAge: 67,
    monthlyCont: 0,
    rateReturn: 5.00,
    savBalance: 0,
    userId: 12345,
    id: 0 
  };
  ravC: string = "";
  shown: boolean = false;
  needAV: number = 0;
  show: boolean = false;
  diff: number = 0;
  graph = {
    data: [
        
        { x: ['Predicted Value', 'Needed Value'], y: [this.newcalc.retAccVal, this.needAV], type: 'bar', marker:{color: 'navy'}},
    ],
    layout: {width: 600, height: 500}
};
  
  constructor(private route: ActivatedRoute, private router: Router, private calcService: CalcService) { }

  ngOnInit(): void {
  }

  addCalc(newcalc: Calc): void {
    this.calcService.addCalc(newcalc).subscribe(payload => {
      this.getCalc(payload.id);
    })
  }

  getCalc(id: number): void {
    this.calcService.getCalc(id).subscribe(payload => {
      this.newcalc = payload;
      console.log(payload)
      this.ravC = payload.retAccVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.needAV = (payload.yrlyIncome*.8)*25;
      this.diff = (payload.retAccVal / this.needAV)*100;
      if(this.diff > 100){
        this.diff = 100;
      }
      // createGraph(payload.id);
      this.graph = {
        data: [
            
            { x: ['Predicted Value', 'Needed Value'], y: [this.newcalc.retAccVal, this.needAV], type: 'bar', marker:{color: 'navy'}},
        ],
        layout: {width: 600, height: 500}
    }
    })
  }

  showRes(): void {
    this.show = true;
  }

  toggleGraph(): void {
    this.shown = !this.shown;
  }

}
