import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Investment } from './stockFolder/stock-invest-modal/investment.model';

@Injectable({
  providedIn: 'root'
})
export class StocksService {
  url: string = "http://localhost:3000";

  constructor(private http:HttpClient) { }

  getStocks(): Observable<any> {
    return this.http.get(`${this.url}/stocks`)
  }
  
  makeInvestment(investment:Investment): Observable<any> {
    return this.http.post(`${this.url}/invest`, investment)
  }

  
  getInvestments(userId: Number): Observable<any> {
    return this.http.get(`${this.url}/invest/${userId}`)
  }
  
}
