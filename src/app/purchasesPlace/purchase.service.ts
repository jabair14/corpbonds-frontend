import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Purchase } from './purchase/purchase.model';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  this: any;

  constructor(private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    withCredentials: true,
    observe: 'response' as 'response',
  };
  createPurchase(createPurchase: any) {
    return this.http.post('https://francs.herokuapp.com/purchases', createPurchase, this.httpOptions);
  }

  deletePurchases(id: any) {
    return this.http.delete(`https://francs.herokuapp.com/purchases/${id}`,{responseType: 'text'});
  }

  getPurchases(): Observable<any> {
    return this.http.get("https://francs.herokuapp.com/purchases");

  }

  getPurchasesByUser(id: any): Observable<any> {
    return this.http.get(`https://francs.herokuapp.com/purchases/user/${id}`);

  }
  updatePurchases(purchase: Purchase): Observable<any>{
    
    return this.http.patch(`https://francs.herokuapp.com/purchases/${purchase.id}`, purchase);
  }


  getPurchase(id: number): Observable<any> {
    return this.http.get("https://francs.herokuapp.com/purchases/"+id);

  }

}