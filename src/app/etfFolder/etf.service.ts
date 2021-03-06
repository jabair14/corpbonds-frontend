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
    return this.http.post('https://etf-microservice.herokuapp.com/holdings/', data);
  }

  // get all holdings in databse related to current user
  getAllHoldings(userId: any): Observable<any> {
    console.log("BACK END SENDING THIS USER ID", userId)
    return this.http.get('https://etf-microservice.herokuapp.com/holdings/'+ userId);
  }

  // delete holding selected by current user
  deleteHolding(holdingId: any): Observable<any>{
    console.log("SENDING THIS ID FOR DELETION////", holdingId)
    return this.http.delete('https://etf-microservice.herokuapp.com/holdings/'+ holdingId)
  }
}
