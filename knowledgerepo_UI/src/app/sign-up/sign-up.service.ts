import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class signUpService {
    
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  checkUserSignup(signupData): Observable<any> {
    var signup: { 'userName':string,'eMail': string, 'pHone': number, 'userRole':string} = { 'userName': signupData.userName,'eMail': signupData.eMail,'pHone': signupData.pHone, 'userRole': signupData.userRole };
    return this.http.post(this.baseUrl + '/api/dropbox/admin/createUser', signup
      , {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    );
  }
}