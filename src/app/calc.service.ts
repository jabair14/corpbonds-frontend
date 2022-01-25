import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Calc } from './retcalc/calc.model';

@Injectable({
  providedIn: 'root'
})
export class CalcService {

  constructor(private http: HttpClient) { }

  apiUrl = 'https://ret-calc-db.herokuapp.com/calcs/';

  getCalc(id: number): Observable<any> {
    return this.http.get(this.apiUrl+id);
  }

  addCalc(calc: Calc): Observable<any> {
    return this.http.post<any>(this.apiUrl, calc);
  }
}