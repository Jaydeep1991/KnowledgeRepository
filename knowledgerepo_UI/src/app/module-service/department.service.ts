import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, from } from 'rxjs';
import { CompayName } from '../admin/admin_shared/CompanyNames';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  //Create Department
  createDepartment(createDepartmentData): Observable<any> {
    var create: { 'companyName': string ,'departmentName':string} = { 'companyName': createDepartmentData.companyName ,'departmentName':createDepartmentData.departmentName};
    return this.http.post(this.baseUrl + '/api/dropbox/admin/createDepartment', create
      , {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    );
  }

  getTopic():Observable<any>{
    return this.http.get(this.baseUrl+'/api/dropbox/showTopic',
    {
      headers:new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  //get Comapny Name
  getCompanyName(): Observable<any> {
    return this.http.get<Array<CompayName>>(this.baseUrl + '/api/dropbox/admin/getCompanyName');
  }
  //get Question List
  public getQuestionsList() : Observable<any> {
    return this.http.get(this.baseUrl + '/api/dropbox/admin/getAllQuestion');
  }
  //get Questions List Based on Client
  public getClientQuestionsList(clientId:number) : Observable<any>{
    return this.http.get(this.baseUrl + '/api/dropbox/admin/getQuestion/' +clientId)
  }
}
