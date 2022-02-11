import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MutualFundInvestments } from './mutual-funds-investments/mutual-funds-investments.model';

@Injectable({
  providedIn: 'root'
})

export class MutualFundsInvestmentsService {
  link = "https://mutual-funds-investments.herokuapp.com/";
  // link = "http://localhost:4000/";

  constructor(private http: HttpClient) { }
  
  getInvestmentsByUser(userId: string): Observable<any> {
    return this.http.get(this.link + "investments/users/" + userId);
  }

  getSingleInvestmentByUser(userId: string, investmentId: number) {
    return this.http.get(this.link + "investments/users/" + userId + "/investments/" + investmentId)
  }

  getSingleInvestmentByUserFund(userId: string, mutualFundId: number) {
    return this.http.get(this.link + "investments/users/" + userId + "/funds/" + mutualFundId)
  }

  addInvestment(mutualFundInvestments: MutualFundInvestments): Observable<any> {
    const headers = {'Content-Type': 'application/json'};
    return this.http.post(this.link + 'investments', mutualFundInvestments, {'headers': headers});
  }

  editInvestment(mutualFundInvestments: MutualFundInvestments): Observable<any> {
    const headers = {'Content-Type': 'application/json'};
    return this.http.put(this.link + 'investments/' + mutualFundInvestments.id, mutualFundInvestments, {'headers': headers});
  }

  deleteInvestment(investmentsId: number) {
    return this.http.delete(this.link + "investments/" + investmentsId);
  }

  /*

  *** ADDITIONAL ROUTING CURRENTLY UNUSED ***

  getInvestments(): Observable<any> {
    return this.http.get(this.link + "investments");
  }

  getSingleInvestment(investmentsId: number) {
    return this.http.get(this.link + "investments/" + investmentsId)
  }

  */
}
