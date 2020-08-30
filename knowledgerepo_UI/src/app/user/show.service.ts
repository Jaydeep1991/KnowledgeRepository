import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { FileDetails } from '../user/fileDetails';
import { StorageService } from '../shared/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ShowService {

  eMail: string;
  tagName: string;
  baseUrl = environment.baseUrl;
  constructor(
    private http: HttpClient,
    private _storage: StorageService,
  ) { }

  //File Details Name
  getDocument(): Observable<any> {
    this.eMail = this._storage.getSession('eMail');
    return this.http.post<Array<FileDetails>>(this.baseUrl + '/api/dropbox/user/getFileList', this.eMail);
  }

  //get File Name based on Tags
  getFileTag(searchByTagData): Observable<any> {
    this.eMail = this._storage.getSession('eMail');
    var searchByTag: { 'eMail': string, 'searchByTag': string } = { 'eMail': this.eMail, 'searchByTag': this._storage.getSession('tagName') };
    return this.http.post<Array<FileDetails>>(this.baseUrl + '/api/dropbox/user/searchByTag', searchByTag
      , {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
  }

  //get File Name based on Types
  getFileType(searchByTypeData): Observable<any> {
    this.eMail = this._storage.getSession('eMail');
    var searchByType: { 'eMail': string, 'searchByType': string } = { 'eMail': this.eMail, 'searchByType': this._storage.getSession('typeName') };
    
    return this.http.post<Array<FileDetails>>(this.baseUrl + '/api/dropbox/user/searchByType', searchByType
      , {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
  }

  //Get Tag Names
  getTagName(): Observable<any> {
    return this.http.get(this.baseUrl + '/api/dropbox/admin/getTagName');
  }
  //File Details Name
  getUserDetails(): Observable<any> {
    this.eMail = this._storage.getSession('eMail');
    const formData=new FormData();
    console.log('-------------Email is ---------',this.eMail);
    formData.append('eMail',this.eMail);
    return this.http.post(this.baseUrl + '/api/dropbox/user/getUserDetails',formData);
  }

}
