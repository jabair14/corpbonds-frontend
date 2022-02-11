import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MutualFundsService {
  link = "https://mutual-funds-service.herokuapp.com/";
  // link = "http://localhost:4000/";

  constructor(private http: HttpClient) { }
  
  getMutualFunds(): Observable<any> {
    return this.http.get(this.link + "mutual_funds");
  }

  getSingleMutualFund(mutualFundId: number) {
    return this.http.get(this.link + "mutual_funds/" + mutualFundId)
  }

  /* 
  
  *** ADDITIONAL ROUTING CURRENTLY UNUSED ***

  addMutualFund(mutualFund: MutualFunds): Observable<any> {
    const headers = {'Content-Type': 'application/json'};
    return this.http.post(this.link + 'mutual_funds', mutualFund, {'headers': headers});
  }

  editMutualFund(mutualFund: MutualFunds): Observable<any> {
    const headers = {'Content-Type': 'application/json'};
    return this.http.put(this.link + 'mutual_funds/' + mutualFund.id, mutualFund, {'headers': headers});
  }

  deleteMutualFund(mutualFundId: number) {
    return this.http.delete(this.link + "mutual_funds/" + mutualFundId);
  }

  */
}
