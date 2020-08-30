import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { CompayName } from '../admin/admin_shared/CompanyNames';
import { DepartmentNames } from '../admin/admin_shared/DepartmentName';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  createProject(createProjectData): Observable<any> {
    var create: { 'companyName': string, 'departmentName': string, 'projectName' } = { 'companyName': createProjectData.companyName, 'departmentName': createProjectData.departmentName, 'projectName': createProjectData.projectName };
    return this.http.post(this.baseUrl + '/api/dropbox/admin/createProject', create
      , {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    );
  }

  //get Comapny Name
  getCompanyName(): Observable<any> {
    return this.http.get<Array<CompayName>>(this.baseUrl + '/api/dropbox/admin/getCompanyName');
  }

  //get Project Name based on Comapny Name
  getDepartmentName(selectedCompany:string): Observable<any> {
    console.log("selectedCompany",selectedCompany);
    return this.http.get<Array<DepartmentNames>>(this.baseUrl + '/api/dropbox/admin/getDepartment/'+selectedCompany);
  }
}
