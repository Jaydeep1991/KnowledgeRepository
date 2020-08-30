import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../shared/storage.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.baseUrl;
  constructor(
    private http: HttpClient,
    private _storage: StorageService,
    private router: Router
  ) { }

  //Get All User
  getAllUser(): Observable<any> {
    return this.http.get(this.baseUrl + '/api/dropbox/admin/allUser');
  }

  //Delete User
  deleteUser(email: string): Observable<any> {
    var user: { 'eMail': string} = { 'eMail':email};
    return this.http.post(this.baseUrl + '/api/dropbox/admin/deleteUser',user
      , {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    );
  }
}
