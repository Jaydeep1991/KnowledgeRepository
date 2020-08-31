import { Component, OnInit } from '@angular/core';
import { StorageService } from '../shared/storage.service';
import { Router } from '@angular/router';
import { flatten } from '@angular/compiler';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [StorageService]
})

export class AdminComponent implements OnInit {

  private router: Router
  private loadCompanyComponent: boolean = false;
  private loadDepartmentCompnent: boolean = false;
  private loadProjectComponent: boolean = false;
  private loadTeamComponent: boolean = false;
  private loadUserComponent: boolean = false;
  private loadTagComponent: boolean = false;
  private loadgraphComponent: boolean = true;
  private viewUserdetails: boolean = false;
  private loadAssignTeamComponent: boolean = false;
  private loadQuestionsComponent: boolean = false;
  private userProfileComponent:boolean=false;

  constructor(private _storage: StorageService,private route:Router) { }
  userName: String;
  userRole: String;
  userCompany: string;
  userDepartment: string;
  userProject: string;
  userTeam: string;
  userAssignTeam: string;
  userQuestions: string;
  userQuestionsList: string;

  ngOnInit() {
    this.userName = this._storage.getSession("userName");
    this.userRole = this._storage.getSession("userRole");
    this.userCompany = this._storage.getSession('userCompany');
    this.userDepartment = this._storage.getSession('userDepartment');
    this.userProject = this._storage.getSession('userProject');
    this.userTeam = this._storage.getSession('userTeam');
    this.userAssignTeam = this._storage.getSession('userAssignTeam');
    this.userQuestions = this._storage.getSession('userQuestions');
    this.userQuestionsList = this._storage.getSession('userQuestionsList');
  }

  CompanyComponent() {
    this.loadDepartmentCompnent = false;
    this.loadProjectComponent = false;
    this.loadTeamComponent = false;
    this.loadUserComponent = false;
    this.loadTagComponent = false;
    this.loadgraphComponent = false;
    this.viewUserdetails = false;
    this.loadCompanyComponent = true;
    this.loadAssignTeamComponent = false;
    this.loadQuestionsComponent = false;
    this.userProfileComponent=false;
  }
  DepartmentComponent() {
    this.loadCompanyComponent = false;
    this.loadProjectComponent = false;
    this.loadTeamComponent = false;
    this.loadUserComponent = false;
    this.loadTagComponent = false;
    this.loadgraphComponent = false;
    this.viewUserdetails = false;
    this.loadAssignTeamComponent = false;
    this.loadDepartmentCompnent = true;
    this.loadQuestionsComponent = false;
    this.userProfileComponent=false;
  }
  ProjectComponent() {
    this.loadCompanyComponent = false;
    this.loadDepartmentCompnent = false;
    this.loadTeamComponent = false;
    this.loadUserComponent = false;
    this.loadTagComponent = false;
    this.loadgraphComponent = false;
    this.viewUserdetails = false;
    this.loadAssignTeamComponent = false;
    this.loadProjectComponent = true;
    this.loadQuestionsComponent = false;
    this.userProfileComponent=false;
  }
  TeamComponent() {
    this.loadCompanyComponent = false;
    this.loadDepartmentCompnent = false;
    this.loadProjectComponent = false;
    this.loadUserComponent = false;
    this.loadTagComponent = false;
    this.loadgraphComponent = false;
    this.viewUserdetails = false;
    this.loadAssignTeamComponent = false;
    this.loadTeamComponent = true;
    this.userProfileComponent=false;
  }
  UserComponent() {
    this.loadCompanyComponent = false;
    this.loadDepartmentCompnent = false;
    this.loadProjectComponent = false;
    this.loadTeamComponent = false;
    this.loadTagComponent = false;
    this.loadgraphComponent = false;
    this.viewUserdetails = false;
    this.loadAssignTeamComponent = false;
    this.loadUserComponent = true;
    this.loadQuestionsComponent = false;
    this.userProfileComponent=false;
  }
  TagComponent() {
    this.loadCompanyComponent = false;
    this.loadDepartmentCompnent = false;
    this.loadProjectComponent = false;
    this.loadTeamComponent = false;
    this.loadUserComponent = false;
    this.loadgraphComponent = false;
    this.loadTagComponent = true;
    this.viewUserdetails = false;
    this.loadAssignTeamComponent = false;
    this.loadQuestionsComponent = false;
    this.userProfileComponent=false;
  }
  dashBoardComponent() {
    this.loadCompanyComponent = false;
    this.loadDepartmentCompnent = false;
    this.loadProjectComponent = false;
    this.loadTeamComponent = false;
    this.loadUserComponent = false;
    this.loadTagComponent = false;
    this.loadgraphComponent = true;
    this.viewUserdetails = false;
    this.loadAssignTeamComponent = false;
    this.loadQuestionsComponent = false;
    this.userProfileComponent=false;
  }
  viewUser() {
    this.viewUserdetails = true;
    this.loadCompanyComponent = false;
    this.loadDepartmentCompnent = false;
    this.loadProjectComponent = false;
    this.loadTeamComponent = false;
    this.loadUserComponent = false;
    this.loadTagComponent = false;
    this.loadgraphComponent = false;
    this.loadAssignTeamComponent = false;
    this.loadQuestionsComponent = false;
    this.userProfileComponent=false;
  }
  viewProfile(){
    this.viewUserdetails = false;
    this.loadCompanyComponent = false;
    this.loadDepartmentCompnent = false;
    this.loadProjectComponent = false;
    this.loadTeamComponent = false;
    this.loadUserComponent = false;
    this.loadTagComponent = false;
    this.loadgraphComponent = false;
    this.loadAssignTeamComponent = false;
    this.loadQuestionsComponent = false;
    this.userProfileComponent=true;
  }
  backImage(){
    this.route.navigate(['/']);
  }
  AssignTeamComponent() {
    this.loadCompanyComponent = false;
    this.loadDepartmentCompnent = false;
    this.loadProjectComponent = false;
    this.loadUserComponent = false;
    this.loadTagComponent = false;
    this.loadgraphComponent = false;
    this.viewUserdetails = false;
    this.loadTeamComponent = false;
    this.loadAssignTeamComponent = true;
    this.loadQuestionsComponent = false;
    this.userProfileComponent=false;
  }
  questionsComponent() {
    this.loadCompanyComponent = false;
    this.loadDepartmentCompnent = false;
    this.loadProjectComponent = false;
    this.loadUserComponent = false;
    this.loadTagComponent = false;
    this.loadgraphComponent = false;
    this.viewUserdetails = false;
    this.loadTeamComponent = false;
    this.loadAssignTeamComponent = false;
    this.loadQuestionsComponent = true;
    this.userProfileComponent=false;
  }
   questionsListComponent() {
    this.loadCompanyComponent = false;
    this.loadDepartmentCompnent = false;
    this.loadProjectComponent = false;
    this.loadUserComponent = false;
    this.viewUserdetails = false;
    this.loadTagComponent = false;
    this.loadgraphComponent = false;
    this.loadTeamComponent = false;
    this.loadAssignTeamComponent = false;
    this.loadQuestionsComponent = false;
    this.userProfileComponent=false;
   }
  //Log Out
  logOut() {
    sessionStorage.clear();
  }
  SignUpComponent() {
    sessionStorage.clear();
  }
  LogInBodyComponent(){
    sessionStorage.clear();
  }
}

