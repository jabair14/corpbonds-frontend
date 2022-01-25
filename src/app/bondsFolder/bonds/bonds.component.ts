import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BondService } from '../bond.service';
import { Bond } from '../bond/bond.model';


@Component({
  selector: 'app-bonds',
  templateUrl: './bonds.component.html',
  styleUrls: ['./bonds.component.scss']
})
export class BondsComponent implements OnInit {

  
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

    


    
    


}
