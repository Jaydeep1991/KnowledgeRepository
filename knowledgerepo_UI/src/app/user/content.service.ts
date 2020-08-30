import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpEventType, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }
  downloadContent(contentId): Observable<any> {
    return this.http.get(this.baseUrl + '/downloadFile/', {
      responseType: 'arraybuffer',
      reportProgress: true,
      observe: 'events'
    });
  }
}
