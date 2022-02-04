import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http' 

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(public http: HttpClient) { }

  getReviews(): Observable<any> {
    return this.http.get("https://consultantreviews.herokuapp.com/reviews")
  }

}
