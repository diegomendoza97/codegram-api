import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  APIURL = environment.APIURL;
  isAuth = new BehaviorSubject(false);

  
  constructor(private http: HttpClient) { }
  
  userIsAuthenticated(): Boolean {
    const token  = localStorage.getItem('token');
    return token ? true : false;
  }
  signup(body: Object): Observable<any> {
    return this.http.post<{result: any, errorCode: number, message: string}>(`${this.APIURL}/api/users/signup`, body);
  }

  login(body: Object): Observable<any> {
    return this.http.post<{token: string, message: string, errorCode: number}>(`${this.APIURL}/api/users/login`, body);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
