import { Component, OnInit } from '@angular/core';
import { BondService } from '../bond.service';
import { Bond } from '../bond/bond.model';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-bonds',
  templateUrl: './bonds.component.html',
  styleUrls: ['./bonds.component.scss']
})
export class BondsComponent implements OnInit {

  constructor(private bondService: BondService) { }

  term:string = '' 

  bonds:Bond[] = []
  // displayedColumns = ['issuerName', 'issuerName'];

  ngOnInit(): void {
    this.bondService.getBonds().subscribe(
      payload => {
        this.bonds = payload
      }
    )
  }

}
