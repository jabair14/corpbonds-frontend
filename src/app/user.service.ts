import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    withCredentials: true,
    observe: 'response' as 'response',
  };
  // urlStr: string = 'http://kmutlog.herokuapp.com/';
  urlStr: string = 'http://localhost:8500/';

  constructor(private http: HttpClient, private cookie: CookieService) {}

  postLogin(obj: any): Observable<any> {
    return this.http.post(`${this.urlStr}login`, obj, this.httpOptions);
  }

  postAccount(): Observable<any> {
    let _;
    return this.http.post(`${this.urlStr}account`, _, this.httpOptions);
  }

  postMakeAcct(accountObj: any): Observable<any> {
    return this.http.post(
      `${this.urlStr}makeAnAccount`,
      accountObj,
      this.httpOptions
    );
  }

  postRegister(obj: any): Observable<any> {
    return this.http.post(`${this.urlStr}register`, obj);
  }

  getEmailConf(token: any): Observable<any> {
    return this.http.post(`${this.urlStr}registration`, token);
  }

  whoAmI(): Observable<any> {
    let _ = {};
    return this.http.post(`${this.urlStr}whoAmI`, _, this.httpOptions);
  }
}
