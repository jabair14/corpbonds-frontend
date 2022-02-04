import { Component, OnInit, Inject } from '@angular/core';
import { ETF } from '../etf.model'
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-single-etf',
  templateUrl: './dialog-single-etf.component.html',
  styleUrls: ['./dialog-single-etf.component.scss']
})
export class DialogSingleEtfComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  receivedRow: any = {};

  ngOnInit(): void {
    this.receivedRow = this.data;
    console.log(this.receivedRow)
  }

}