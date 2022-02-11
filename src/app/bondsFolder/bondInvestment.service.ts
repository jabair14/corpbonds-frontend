import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class BondInvestmentService {
  
    constructor(private http:HttpClient) { }
  
    postBondInvestment(bondInvestment: any): Observable<any> {
        console.log('in bondinvestmentservice', bondInvestment)
      return this.http.post("https://corp-bonds-new-db.herokuapp.com/bondInvestments", bondInvestment)
    }
  
    // getBond(id: number): Observable<any> {
    //   return this.http.get(`https://corp-bonds-new-db.herokuapp.com/bonds/${id}`)
    // }
  }
  