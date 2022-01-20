import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BondService {

  constructor(private http:HttpClient) { }


  getBonds(): Observable<any> {
    return this.http.get("http://localhost:4000/bonds/random")
  }

  getBond(id: number): Observable<any> {
    return this.http.get(`http://localhost:4000/bonds/${id}`)
  }
}
