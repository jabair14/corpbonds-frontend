import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http' 


@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(public http: HttpClient) { }
  
  getLocations(): Observable<any> {
    return this.http.get("https://locationsandconsultants.herokuapp.com/locations")
  }

  getLocation(id: number): Observable<any> {
    return this.http.get(`https://locationsandconsultants.herokuapp.com/locations/${id}`)
  }

  getConsultants(): Observable<any> {
    return this.http.get("https://locationsandconsultants.herokuapp.com/consultants")
  }

  getConsultant(id: number): Observable<any> {
    return this.http.get(`https://locationsandconsultants.herokuapp.com/consultants/${id}`)
  }
}
