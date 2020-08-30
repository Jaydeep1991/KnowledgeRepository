import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  uploadFile(file):Observable<any>{
    return this.http.post(this.baseUrl + '/uploadFile',file,{
      reportProgress: true,
      observe: 'events',responseType: 'text'  
    });
  }

  //Get Tag Names
  getTagName(): Observable<any> {
    return this.http.get(this.baseUrl + '/api/dropbox/admin/getTagName');
  }

  //Get Tag Names
  getUploadTo(): Observable<any> {
    return this.http.get(this.baseUrl + '/api/dropbox/admin/getTagName');
  }
}
