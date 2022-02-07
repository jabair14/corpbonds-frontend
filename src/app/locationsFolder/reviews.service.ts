import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http' 
import { Review } from './consultant/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(public http: HttpClient) { }

  getReviews(): Observable<any> {
    return this.http.get("https://consultantreviews.herokuapp.com/reviews")
  }

  addReview(review: Review): Observable<any> {
    return this.http.post("https://consultantreviews.herokuapp.com/reviews", review, {responseType:'text'})
  }

  addUser(user: any): Observable<any> {
    return this.http.post("https://consultantreviews.herokuapp.com/users", user)
  }

  getUsers(): Observable<any> {
    return this.http.get("https://consultantreviews.herokuapp.com/users")
  }

}
