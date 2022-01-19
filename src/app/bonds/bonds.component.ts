import { Component, OnInit } from '@angular/core';
import { BondService } from '../bond.service';
import { Bond } from './bond.model';

@Component({
  selector: 'app-bonds',
  templateUrl: './bonds.component.html',
  styleUrls: ['./bonds.component.scss']
})
export class BondsComponent implements OnInit {

  constructor(private bondService: BondService) { }

  bonds:Bond[] = []

  ngOnInit(): void {
    this.bondService.getBonds().subscribe(
      payload => {
        this.bonds = payload
      }
    )
  }

}
