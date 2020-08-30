import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }
  //Create Tag
  createTag(createTagData): Observable<any> {
    var createTag: { 'tagName': string } = { 'tagName': createTagData.tagName };
    return this.http.post(this.baseUrl + '/api/dropbox/admin/createTag', createTag
      , {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    );
  }
}
