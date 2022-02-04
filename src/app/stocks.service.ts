import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StocksService {
  url: string = "https://stocks-microservice-app.herokuapp.com";

  constructor(private http:HttpClient) { }

  getStocks(): Observable<any> {
    return this.http.get(`${this.url}/stocks`)
  }
}
