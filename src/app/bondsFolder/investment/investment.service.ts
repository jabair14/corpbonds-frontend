import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class InvestmentService {
  
    constructor(private http:HttpClient) { }
  
    postInvestment(investment: any): Observable<any> {
      return this.http.post("https://corp-bonds-new-db.herokuapp.com/investments", investment)
    }
  
    getInvestment(id: number): Observable<any> {
      return this.http.get(`https://corp-bonds-new-db.herokuapp.com/investments/${id}`)
    }

    getUserInvestments(id: string): Observable<any> {
        return this.http.get(`https://corp-bonds-new-db.herokuapp.com/investments/${id}`)
    }
  }
  