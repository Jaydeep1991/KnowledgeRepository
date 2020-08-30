import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { CompayName } from '../admin/admin_shared/CompanyNames';
import { DepartmentNames } from '../admin/admin_shared/DepartmentName';
import { ProjectNames } from '../admin/admin_shared/ProjectName';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  createTeam(createTeamData): Observable<any> {
    var create: { 'companyName': string, 'departmentName': string, 'projectName': string, 'teamName': string } = { 'companyName': createTeamData.companyName, 'departmentName': createTeamData.departmentName, 'projectName': createTeamData.projectName, 'teamName': createTeamData.teamName };
    return this.http.post(this.baseUrl + '/api/dropbox/admin/createTeam', create
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
  //get Department Name based on Comapny Name
  getDepartmentName(selectedCompany: string): Observable<any> {
    return this.http.get<Array<DepartmentNames>>(this.baseUrl + '/api/dropbox/admin/getDepartment/' + selectedCompany);
  }

  //get Project Name based on Department Name and Comapny Name
  getProjectName(selectedCompany: string, selected_Department: string): Observable<any> {
    return this.http.get<Array<ProjectNames>>(this.baseUrl + '/api/dropbox/admin/getProject/' + selectedCompany + '/' + selected_Department);
  }
} 

