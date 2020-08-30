import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { StorageService } from '../../shared/storage.service';

@Injectable({
  providedIn: 'root'
})
export class EditCientService {

  baseUrl = environment.baseUrl;
  companyIdForEdit: number;
  companyNameForEdit: string;
  constructor(private http: HttpClient,
    private _storage: StorageService
  ) { }

  editClient(editClientData) {
    this.companyIdForEdit = this._storage.getSession('companyIdForEdit');
    var create: { 'companyId': number, 'companyName': string } = { 'companyName':  editClientData.companyName,'companyId': this.companyIdForEdit };
    return this.http.post(this.baseUrl + '/api/dropbox/admin/editCompany', create
      , {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    );
  }
}

