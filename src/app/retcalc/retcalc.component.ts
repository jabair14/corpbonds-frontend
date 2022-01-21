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
    })
  }

}
