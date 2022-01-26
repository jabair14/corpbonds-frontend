import { Component, OnInit } from '@angular/core';
// import { SortDirective } from '../directive/sort.directive'
import { BondService } from '../bond.service';
import { Bond } from '../bond/bond.model';



@Component({
  selector: 'app-bonds',
  templateUrl: './bonds.component.html',
  styleUrls: ['./bonds.component.scss']
})
export class BondsComponent implements OnInit {

  

  sortFlag: boolean = false
  show = false;

  
  constructor(private bondService: BondService) { }

  config: any;
  collection = {};

  term:string = '' 

  
  bonds:Bond[] = []

  

  
  
  
  
  ngOnInit(): void {
    this.bondService.getBonds().subscribe(
      payload => {
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
