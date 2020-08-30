import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagNameService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  //get Tag Data
  getTagData(): Observable<any> {
    return this.http.get(this.baseUrl + '/api/dropbox/admin/tagData');
  }

  //get Type Data
  getTypeData(): Observable<any> {
    return this.http.get(this.baseUrl + '/api/dropbox/admin/typeData');
  }

  //get Type Data Company
  getCompanyTagData(selectedCompany: string): Observable<any> {
    return this.http.get(this.baseUrl + '/api/dropbox/admin/chartCompany/' + selectedCompany);
  }

  //get Type Data Company
  getCompanyTypeData(selectedCompany: string): Observable<any> {
    return this.http.get(this.baseUrl + '/api/dropbox/admin/typeDataCompany/' + selectedCompany);
  }

  //get Tag Data Department And Company
  getDepartmentTag(selectedCompany: string, selected_Department: string): Observable<any> {
    return this.http.get(this.baseUrl + '/api/dropbox/admin/tagDepartment/' + selectedCompany + '/' + selected_Department)
  }

  //get Tag Data Department And Company
  getDepartmentType(selectedCompany: string, selected_Department: string): Observable<any> {
    return this.http.get(this.baseUrl + '/api/dropbox/admin/typeDepartment/' + selectedCompany + '/' + selected_Department)
  }

  //get Tag Data Project,Department And Company
  getProjectTag(selectedCompany: string, selected_Department: string, selectedProject: string): Observable<any> {
    return this.http.get(this.baseUrl + '/api/dropbox/admin/tagProject/' + selectedCompany + '/' + selected_Department + '/' + selectedProject)
  }

  //get Tag Data Department And Company
  getProjectType(selectedCompany: string, selected_Department: string, projectName: string): Observable<any> {
    return this.http.get(this.baseUrl + '/api/dropbox/admin/typeProject/' + selectedCompany + '/' + selected_Department + '/' + projectName)
  }

}
