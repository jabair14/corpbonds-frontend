import { Component, OnInit } from '@angular/core';
import { StocksService } from '../stocks.service';
import { Stock } from './stock.model'

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss']
})
export class StocksComponent implements OnInit {
  data: Stock[] =[];

  constructor(private stocksService: StocksService) { }

  async ngOnInit(): Promise<void> {
    await this.stocksService.getStocks().subscribe(payload => {
      this.data.push(...payload.sort((a:any, b:any )=> a.id - b.id));
      console.log('sorted', this.data, 'payload', payload)
    })
  }

}
