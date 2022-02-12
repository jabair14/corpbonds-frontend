import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Investment } from './stockFolder/stock-invest-modal/investment.model';
import { Integer } from 'aws-sdk/clients/eventbridge';

@Injectable({
  providedIn: 'root',
})
export class StocksService {
  url: string = 'https://stocks-microservice-app.herokuapp.com';
  // url: string = "http://localhost:3000";

  constructor(private http: HttpClient) {}

  getStocks(): Observable<any> {
    return this.http.get(`${this.url}/stocks`);
  }

  getStock(stockId: Integer): Observable<any> {
    return this.http.get(`${this.url}/stocks/${stockId}`);
  }

  makeInvestment(investment: Investment): Observable<any> {
    return this.http.post(`${this.url}/invest`, investment);
  }

  getInvestments(userId: String): Observable<any> {
    return this.http.get(`${this.url}/invest/${userId}`);
  }

  deleteInvestment(investmentId: Integer) {
    console.log(`${this.url}/invest/${investmentId}`);
    return this.http.delete(`${this.url}/invest/${investmentId}`, {
      responseType: 'text',
    });
  }
}
