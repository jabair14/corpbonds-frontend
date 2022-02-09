import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ETF } from './etf.model';

@Injectable({
  providedIn: 'root',
})
export class EtfService {
  constructor(private http: HttpClient) {}

  // get request for ETFs
  getETFs(): Observable<any> {
    return this.http.get('https://etf-microservice.herokuapp.com/etfs');
  }

  // add/post holding to database
  addHolding(data: any): Observable<any> {
    console.log('this is to be sent to the service', data);
    return this.http.post('http://localhost:5280/holdings/', data);
  }

  // get all holdings in databse
  getAllHoldings(userId: any): Observable<any> {
    console.log("BACK END SENDING THIS USER ID", userId)
    return this.http.get('http://localhost:5280/holdings/'+ userId);
  }
}
