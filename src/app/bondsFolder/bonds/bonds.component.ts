import { NgxPaginationModule } from 'ngx-pagination'
import { Component, OnInit } from '@angular/core';
// import { SortDirective } from '../directive/sort.directive'
import { BondService } from '../bond.service';
import { Bond } from '../bond/bond.model';
import { animate, state, style, transition, trigger } from '@angular/animations';



@Component({
  selector: 'app-bonds',
  templateUrl: './bonds.component.html',
  styleUrls: ['./bonds.component.scss'],
  animations: [
    trigger('bottomFade', [
      state('void', style({opacity: 0, transform: 'translateY(2rem)'})),
      state('*', style({ opacity: 1, transform: 'translateY(0)'})),
      transition(':enter', [animate(500), style({ opacity: 1})])
    ])
  ]
  
})
export class BondsComponent implements OnInit {

  sortFlag: boolean = false;

  show = false;

  constructor(private bondService: BondService) { }

  config: any;

  collection = {};

  term:string = '' 

  bonds:Bond[] = []

  ngOnInit(): void {
    this.bondService.getBonds().subscribe(
       payload => {
        if (payload) {
      
        }
        this.bonds = payload
        this.config = {
          itemsPerPage: 100,
          currentPage: 1,
          totalItems: this.bonds.length
        };
      }
      )
     
      

  }
    
    pageChanged(event: any){
      this.config.currentPage = event;
    }

    clickSort(){

      this.sortFlag = !this.sortFlag
      if (this.sortFlag) {
        this.show = true
        this.bonds.sort(
          (a: any, b: any) => a.interestRate - b.interestRate
        )
      } else {
        this.show = false
        this.bonds.sort (
          (a: any, b: any) => b.interestRate - a.interestRate
        )
      }
    }




    


    
    


}
