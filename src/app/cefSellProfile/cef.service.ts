import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sell } from './cefSell/cefSell.model';

@Injectable({
  providedIn: 'root'
})
export class SellService {
  this: any;

  constructor(private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    withCredentials: true,
    observe: 'response' as 'response',
  };
  createSell(createSell: any) {
    return this.http.post('https://francs.herokuapp.com/sells', createSell, this.httpOptions);
  }

  deleteSells(id: any) {
    return this.http.delete(`https://francs.herokuapp.com/sells/${id}`,{responseType: 'text'});
  }

  getSells(): Observable<any> {
    return this.http.get("https://francs.herokuapp.com/sells");

  }

  getSellsByUser(id: any): Observable<any> {
    return this.http.get(`https://francs.herokuapp.com/sells/user/${id}`);

  }
  updateSells(sell: Sell): Observable<any>{
    
    return this.http.patch(`https://francs.herokuapp.com/sells/${sell.id}`, sell);
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