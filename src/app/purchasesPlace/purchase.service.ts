import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Purchase } from './purchase/purchase.model';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  this: any;

  constructor(private http:HttpClient) { }

 
  createPurchase(createPurchase: any) {
    return this.http.post('https://francs.herokuapp.com/purchases', createPurchase);
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
//**************************************************************************************** */
  //   createPurchase(createPurchase: any) {
  //   return this.http.post('http://localhost:3000/purchases', createPurchase);
  // }

  // deletePurchases(id: any) {
  //   return this.http.delete(`http://localhost:3000/purchases/${id}`,{responseType: 'text'});
  // }

  // getPurchases(): Observable<any> {
  //   return this.http.get("http://localhost:3000/purchases");

  // }

  // getPurchasesByUser(id: any): Observable<any> {
  //   return this.http.get(`http://localhost:3000/purchases/user/${id}`);

  // }
  // updatePurchases(purchase: Purchase): Observable<any>{
    
  //   return this.http.patch(`http://localhost:3000/purchases/${purchase.id}`, purchase);
  // }


  // getPurchase(id: number): Observable<any> {
  //   return this.http.get("http://localhost:3000/purchases/"+id);

  // }

}