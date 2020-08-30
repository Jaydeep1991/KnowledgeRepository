import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { StorageService } from '../../shared/storage.service';

@Injectable({
  providedIn: 'root'
})
export class EditUserService {

  baseUrl = environment.baseUrl;
  emailForEdit: string;
  constructor(private http: HttpClient,
    private _storage: StorageService
  ) { }

  editUser(editUserData) {
    this.emailForEdit = this._storage.getSession('emailForEdit');
    var create: { 'eMail': string, 'userRole': string } = { 'userRole': editUserData.userRole, 'eMail': this.emailForEdit };
    return this.http.post(this.baseUrl + '/api/dropbox/admin/editUser', create
      , {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    );
  }
}

