import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http' 


@Injectable({
  providedIn: 'root'
})
export class SocialmediaService {

  constructor(public http: HttpClient) { }
  
  getSocialmedias(): Observable<any> {
    return this.http.get("https://kitemutualsocialmedia.herokuapp.com/socialmedias")
  }

  getSocialmedia(id: number): Observable<any> {
    return this.http.get(`https://kitemutualsocialmedia.herokuapp.com/socialmedias/${id}`)
  }
}
