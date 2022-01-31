import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ETF } from './etf.model'

@Injectable({
  providedIn: 'root'
})
export class EtfService {

  constructor(private http: HttpClient) { }

  // get request for ETFs
  getETFs(): Observable<any>{
    return this.http.get("https://etf-microservice.herokuapp.com/etfs");
  }
}
